export const DEFAULT_TENOR_MONTHS = 6;

export const ensureTenorMonths = (deal, fallback = DEFAULT_TENOR_MONTHS) => {
  if (!deal) return deal;
  const base = typeof deal.toObject === 'function' ? deal.toObject() : deal;
  const rawTenor = base.tenorMonths ?? base.tenor;
  const parsed = Number(rawTenor);
  const hasValidTenor = Number.isFinite(parsed) && parsed > 0;
  if (hasValidTenor) {
    if (base.tenorMonths != null && Number(base.tenorMonths) === parsed) {
      return base;
    }
    return { ...base, tenorMonths: parsed };
  }
  // If an invalid or non-positive tenor is provided, fall back to the default.
  return { ...base, tenorMonths: fallback };
};