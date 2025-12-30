import { formatCurrency, formatPercent } from "./formatters";

const isValidDate = (value) => {
  if (!value) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

const formatDateLabel = (value) => {
  if (!isValidDate(value)) return "—";
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatMoic = (value) => {
  if (typeof value === "number" && Number.isFinite(value))
    return `${value.toFixed(2)}x`;
  const numeric = Number(value);
  if (Number.isFinite(numeric)) return `${numeric.toFixed(2)}x`;
  return "—";
};

export const normalizeStatus = (status) =>
  status ? String(status).trim().toLowerCase() : "";

export const getStatusMeta = (status) => {
  const normalized = normalizeStatus(status);
  if (normalized === "active") {
    return { label: "Active", className: "bg-[#E6F0FF] text-[#1F6FEB]" };
  }
  if (normalized === "pending" || normalized === "review") {
    return { label: "Pending", className: "bg-[#FEF3C7] text-[#B45309]" };
  }
  if (normalized === "offline") {
    return { label: "Offline", className: "bg-[#FEE2E2] text-[#B91C1C]" };
  }
  const label = normalized
    ? `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`
    : "Offline";
  return { label, className: "bg-[#E5E7EB] text-[#374151]" };
};

export const deriveLocation = (deal = {}) =>
  deal.location || deal.country || deal.registeredAddress || "Location pending";

// Support legacy `tenor` alongside canonical `tenorMonths`; both are expected to represent months.
export const resolveTenorMonths = (deal = {}, fallback = 6) => {
  const raw = deal.tenorMonths ?? deal.tenor;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : fallback;
};

export const resolveRiskLabel = (deal = {}, fallback = "On track") =>
  deal.risk || fallback;

export const buildDealProfile = (deal = {}) => {
  const facilitySizeValue = Number(deal.facilitySize ?? 10000);
  const utilizedValue = Number(deal.utilizedAmount ?? 0);
  const remainingCapacityValue = Math.max(0, facilitySizeValue - utilizedValue);
  const tenorMonths = resolveTenorMonths(deal);
  const deriveUtilizationPct = () => {
    if (deal.performance?.utilizationPct != null)
      return deal.performance.utilizationPct;
    if (!facilitySizeValue) return null;
    return Math.min(
      100,
      Math.round(((utilizedValue || 0) / facilitySizeValue) * 100)
    );
  };
  const utilizationPct = deriveUtilizationPct();

  const formattedCashflows = Array.isArray(deal.cashflows)
    ? deal.cashflows
        .filter((entry) => entry != null)
        .map((entry, idx) => {
          return {
            cycle: entry.cycle || `Cycle ${idx + 1}`,
            // Prefer dueDate then recorded repayment date, then createdAt for legacy records
            date: formatDateLabel(
              entry.dueDate || entry.date || entry.createdAt
            ),
            amount:
              typeof entry.amount === "number"
                ? formatCurrency(entry.amount)
                : entry.amount || "—",
            status: entry.status || "Settled",
          };
        })
    : [];

  const dsoValue = deal.performance?.dsoDays ?? deal.dso;
  const delinquencyValue =
    deal.performance?.delinquencyRate ?? deal.delinquency;
  const moicValue = deal.performance?.moic ?? deal.realizedMoic;

  return {
    name: deal.name || "MSME Deal",
    sector: deal.sector || "Working capital",
    location: deriveLocation(deal),
    statusMeta: getStatusMeta(deal.status),
    riskLabel: resolveRiskLabel(deal),
    facilitySizeValue,
    facilitySize: formatCurrency(facilitySizeValue),
    utilizedValue,
    utilizedLabel: utilizedValue ? formatCurrency(utilizedValue) : null,
    remainingCapacityValue,
    remainingCapacityLabel: formatCurrency(remainingCapacityValue),
    targetYield: formatPercent(deal.targetYield ?? deal.yieldPct ?? 0, 1),
    repaymentCadence: deal.repaymentCadence || "Monthly",
    tenorMonths,
    tenorDisplay: `${tenorMonths} months`,
    performance: {
      dso: typeof dsoValue === "number" ? dsoValue.toFixed(1) : dsoValue || "—",
      delinquency:
        typeof delinquencyValue === "number"
          ? formatPercent(delinquencyValue, 1)
          : delinquencyValue || "—",
      realizedMoic: formatMoic(moicValue),
      utilization: utilizationPct != null ? `${utilizationPct}%` : "—",
      tenor: `${tenorMonths} months`,
    },
    cashflows: formattedCashflows,
    riskControls: {
      kyc: deal.kycVerified ?? true,
      payoutMonitoring: deal.payoutMonitoring ?? true,
      diversification: deal.diversificationGuardrails ?? true,
    },
  };
};
