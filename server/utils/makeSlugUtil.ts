export default function makeSlug(title: string): string {
    if (!title) return ''

    return title
        .toLowerCase()                                  // Приводим к нижнему регистру
        .trim()                                         // Убираем пробелы в начале и конце
        .replace(/[^a-zа-яё0-9\s]/g, '')                // Удаляем спецсимволы, оставляем буквы, цифры и пробелы
        .replace(/\s+/g, '-')                           // Заменяем пробелы на дефисы
        .replace(/-+/g, '-')                             // Убираем повторяющиеся дефисы
        .replace(/^-|-$/g, '')                           // Удаляем дефисы в начале и конце
}
