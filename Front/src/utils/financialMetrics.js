const toNumber = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

const toNullableNumber = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const round = (value, digits = 1) => {
  if (value == null || Number.isNaN(value)) return null;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

export const computeFinancialMetrics = (deal = {}) => {
  const revenueValue = toNumber(deal.revenue);
  const expensesValue = toNumber(deal.expenses);
  const burnRateMonthly = toNumber(deal.burn_rate);
  const cash = toNumber(deal.cash);
  const customers = toNumber(deal.customers);
  const churnRate = toNullableNumber(deal.churn_rate);
  const acquisitionCost = toNullableNumber(deal.acquisition_cost);
  const lifetimeValue = toNullableNumber(deal.lifetime_value);

  const netProfitLoss = revenueValue - expensesValue;

  const profitMargin =
    revenueValue > 0 ? round((netProfitLoss / revenueValue) * 100, 1) : null;
  const expenseRatio =
    revenueValue > 0 ? round((expensesValue / revenueValue) * 100, 1) : null;

  const runwayMonths =
    burnRateMonthly > 0 ? round(cash / burnRateMonthly, 1) : null;
  const survivalProbability =
    runwayMonths == null
      ? null
      : runwayMonths >= 18
      ? 85
      : runwayMonths >= 12
      ? 70
      : runwayMonths >= 6
      ? 50
      : runwayMonths >= 3
      ? 30
      : 15;

  const profitabilityHealth =
    profitMargin == null
      ? "Not enough data"
      : profitMargin > 20
      ? "Excellent"
      : profitMargin > 10
      ? "Good"
      : profitMargin > 0
      ? "Break-even"
      : "Loss-making";

  const ltvCacRatio =
    acquisitionCost && acquisitionCost > 0 && lifetimeValue != null
      ? round(lifetimeValue / acquisitionCost, 2)
      : null;

  const marketingEfficiency =
    ltvCacRatio == null
      ? "Not enough data"
      : ltvCacRatio >= 3
      ? "Excellent - Scale up marketing"
      : ltvCacRatio >= 2
      ? "Good - Room for growth"
      : ltvCacRatio >= 1
      ? "Break-even - Optimize campaigns"
      : "Poor - Reduce acquisition costs";

  const initialCustomersRaw = toNullableNumber(deal.initial_customers);
  const initialCustomers =
    initialCustomersRaw != null ? initialCustomersRaw : null;
  const customerGrowthRate =
    initialCustomers != null && initialCustomers > 0
      ? round(((customers - initialCustomers) / initialCustomers) * 100, 1)
      : null;

  const growthStatus =
    customerGrowthRate == null
      ? "Not enough data"
      : customerGrowthRate > 20
      ? "High growth - Strong market fit"
      : customerGrowthRate > 10
      ? "Moderate growth"
      : customerGrowthRate > 0
      ? "Slow growth"
      : "Declining - Urgent action needed";

  const avgChurnRate = churnRate != null ? round(churnRate, 1) : null;
  const retentionHealth =
    avgChurnRate == null
      ? "Not enough data"
      : avgChurnRate < 5
      ? "Excellent retention"
      : avgChurnRate < 10
      ? "Good retention"
      : avgChurnRate < 15
      ? "Needs improvement"
      : "Critical - Focus on retention";

  return {
    total_revenue: revenueValue,
    total_expenses: expensesValue,
    net_profit_loss: netProfitLoss,
    profit_margin: profitMargin,
    expense_ratio: expenseRatio,
    avg_monthly_revenue: revenueValue,
    avg_monthly_expenses: expensesValue,
    runway_months: runwayMonths,
    survival_probability: survivalProbability,
    profitability_health: profitabilityHealth,
    ltv_cac_ratio: ltvCacRatio,
    marketing_efficiency: marketingEfficiency,
    customer_growth_rate: customerGrowthRate,
    growth_status: growthStatus,
    avg_churn_rate: avgChurnRate,
    retention_health: retentionHealth,
  };
};
