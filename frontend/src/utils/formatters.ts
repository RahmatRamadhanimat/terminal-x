/**
 * Safe numeric formatter that prevents runtime crashes like
 * "Cannot read properties of undefined (reading 'toFixed')"
 */
export function safeToFixed(value: unknown, decimals: number = 2, fallback: string = '0.00'): string {
  if (value === null || value === undefined) return fallback;
  const num = typeof value === 'number' ? value : Number(value);
  if (isNaN(num)) return fallback;
  return num.toFixed(decimals);
}

export function formatPrice(price: unknown, symbol: string = ''): string {
  const decimals = symbol.includes('JPY') ? 3 : symbol === 'EURUSD' || symbol === 'GBPUSD' ? 4 : 2;
  return safeToFixed(price, decimals, '---');
}

export function formatPercent(percent: unknown): string {
  const val = typeof percent === 'number' ? percent : Number(percent);
  if (isNaN(val)) return '0.00%';
  const prefix = val > 0 ? '+' : '';
  return `${prefix}${val.toFixed(2)}%`;
}
