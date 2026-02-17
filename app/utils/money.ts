export function formatRubles(value: number): string {
  const formatted = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value)
  return `${formatted} ₽`
}

/**
 * Требование: цена «x2» рассчитывается как <цена товара> / 2,
 * округлить до целого в большую сторону.
 */
export function calcX2Price(price: number): number {
  return Math.ceil(price / 2)
}

