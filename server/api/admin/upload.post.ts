import {createError} from 'h3'
import {writeFileSync, mkdirSync, existsSync} from 'node:fs'
import {join} from 'node:path'
import {randomUUID} from 'node:crypto'

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

function getExt(filename: string, mimeType?: string): string {
    const lower = filename?.toLowerCase() || ''
    for (const ext of ALLOWED_EXT) {
        if (lower.endsWith(ext)) return ext
    }
    if (mimeType === 'image/jpeg') return '.jpg'
    if (mimeType === 'image/png') return '.png'
    if (mimeType === 'image/webp') return '.webp'
    if (mimeType === 'image/gif') return '.gif'
    return '.jpg'
}

export default defineEventHandler(async (event) => {
    const form = await readMultipartFormData(event)
    if (!form?.length) {
        throw createError({statusCode: 400, statusMessage: 'No file in request'})
    }

    const filePart = form.find((p) => p.name === 'file' || p.name === 'image')
    if (!filePart) {
        throw createError({statusCode: 400, statusMessage: 'Missing or invalid file field'})
    }
    if (!filePart.data || !(filePart.data instanceof Buffer)) {
        throw createError({statusCode: 400, statusMessage: 'Missing or invalid file field'})
    }

    const size = filePart.data.length
    if (size > MAX_SIZE) {
        throw createError({statusCode: 400, statusMessage: 'File too large (max 5 MB)'})
    }

    const mime = ((filePart.type || '').toLowerCase().split(';')[0] ?? '').trim()
    const isAllowedType = ALLOWED_TYPES.some((t) => mime === t)
    if (!isAllowedType) {
        throw createError({statusCode: 400, statusMessage: 'Invalid file type. Use JPEG, PNG, WebP or GIF'})
    }

    const ext = getExt(filePart.filename || '', mime)
    const filename = `${randomUUID()}${ext}`
    const uploadDir = join(process.cwd(), 'uploads')
    if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, {recursive: true})
    }
    const filePath = join(uploadDir, filename)
    writeFileSync(filePath, filePart.data)

    return {path: `/api/uploads/${filename}`}
})
