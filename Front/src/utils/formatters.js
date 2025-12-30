export const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: value >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: value >= 1_000 ? 1 : 2,
  }).format(value);

export const formatPercent = (value = 0, digits = 1) =>
  `${Number(value || 0).toFixed(digits)}%`;

export const formatDateShort = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatMetricValue = (value, type = "text") => {
  if (value == null || value === "") return "—";
  if (type === "currency") {
    return formatCurrency(Number(value) || 0);
  }
  if (type === "percent") {
    return formatPercent(Number(value) || 0, 1);
  }
  if (type === "months") {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? `${numeric.toFixed(1)} mo` : "—";
  }
  if (type === "ratio") {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric.toFixed(2) : "—";
  }
  if (type === "number") {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric.toFixed(1) : "—";
  }
  return value;
};
