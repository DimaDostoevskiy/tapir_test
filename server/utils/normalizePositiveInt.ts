export function normalizePositiveInt(value: unknown, fallback: number) {
    const parsed = Number(value)

    if (!Number.isFinite(parsed)) {
        return fallback
    }

    const normalized = Math.trunc(parsed)

    if (normalized < 0) {
        return fallback
    }

    return normalized
}
