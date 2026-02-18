export function formatCurrency(
  amount: number,
  options?: { compact?: boolean; decimals?: number }
): string {
  const { compact = true, decimals = 1 } = options ?? {};
  if (compact) {
    if (amount >= 1_000_000_000)
      return `$${(amount / 1_000_000_000).toFixed(decimals)}B`;
    if (amount >= 1_000_000)
      return `$${(amount / 1_000_000).toFixed(decimals)}M`;
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
    return `$${amount.toFixed(0)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}
