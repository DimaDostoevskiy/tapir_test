export default function makeSlug(title: string): string {
    if (!title) return ''

    const translitMap: { [key: string]: string } = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    return title
        .toLowerCase()
        .trim()
        .split('')                                       // Разбиваем на массив символов
        .map(char => translitMap[char] || char)         // Транслитерируем русские буквы
        .join('')
        .replace(/[^a-z0-9\s]/g, '')                     // Удаляем всё кроме букв, цифр и пробелов
        .replace(/\s+/g, '-')                            // Заменяем пробелы на дефисы
        .replace(/-+/g, '-')                             // Убираем повторяющиеся дефисы
        .replace(/^-|-$/g, '');                          // Удаляем дефисы в начале и конце
}
