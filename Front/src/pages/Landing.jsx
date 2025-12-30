import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LineChart,
  ShieldCheck,
  Star,
  Globe2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { fetchOverviewStats } from "../services/statsService";
import { formatCurrency, formatPercent } from "../utils/formatters";
import { resolveRiskLabel, resolveTenorMonths } from "../utils/dealMeta";
import Container from "../components/layout/Container";
import useAuth from "../hooks/useAuth";

const defaultStats = {
  activeDeals: 0,
  averageYield: 0.0,
  liveVolume: 0,
  breakdown: {
    cardVolume: 0,
    bankVolume: 0,
    payoutVolume: 0,
  },
};

const parseYieldValue = (value) => {
  if (typeof value === "number") return value;
  if (!value) return 0;
  return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
};
const resolveYieldValue = (deal) =>
  parseYieldValue(deal?.targetYield ?? deal?.yieldPct);

const parseAmountValue = (value) => {
  if (typeof value === "number") return value;
  if (!value) return 0;
  return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
};

const getLocationLabel = (deal) =>
  deal.location || deal.country || "Location pending";
const DEFAULT_RISK_LABEL = "On track";
const DEALS_ROUTE = "/deals";

export default function Landing() {
  const [stats, setStats] = useState(defaultStats);
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [statsError, setStatsError] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchOverviewStats();
        if (data) {
          setStats({
            activeDeals: data.activeDeals ?? defaultStats.activeDeals,
            averageYield: data.averageYield ?? defaultStats.averageYield,
            liveVolume: data.liveVolume ?? defaultStats.liveVolume,
            breakdown: data.breakdown || defaultStats.breakdown,
          });
          setFeaturedDeals(
            Array.isArray(data.featuredDeals) ? data.featuredDeals : []
          );
        }
      } catch {
        setStatsError("Showing sample metrics while live data loads.");
      }
    };
    load();
  }, []);

  const baseBreakdown = stats.breakdown || defaultStats.breakdown;
  const featuredList = [...featuredDeals].sort(
    (a, b) => resolveYieldValue(b) - resolveYieldValue(a)
  );
  const displayStats = (() => {
    const base = {
      activeDeals: stats.activeDeals ?? 0,
      averageYield: stats.averageYield ?? 0,
      liveVolume: stats.liveVolume ?? 0,
      breakdown: baseBreakdown,
    };
    if (base.activeDeals === 0 && featuredList.length > 0) {
      const activeOnly = featuredList.filter(
        (d) => (d.status || "").toLowerCase() === "active"
      );
      const source = activeOnly.length > 0 ? activeOnly : featuredList;
      const totalUtilized = source.reduce(
        (sum, d) => sum + parseAmountValue(d.utilizedAmount ?? 0),
        0
      );
      const yieldValues = source
        .map(resolveYieldValue)
        .filter((v) => Number.isFinite(v) && v > 0);
      const avgYield =
        yieldValues.length > 0
          ? yieldValues.reduce((a, b) => a + b, 0) / yieldValues.length
          : base.averageYield;
      return {
        ...base,
        activeDeals: base.activeDeals || source.length,
        averageYield: base.averageYield || avgYield,
        liveVolume: base.liveVolume || totalUtilized,
      };
    }
    return base;
  })();
  const breakdown = displayStats.breakdown || baseBreakdown;

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827]">
      <Container as="main" className="pb-20">
        {/* Hero */}
        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div className="mt-10 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0EA5E9] ring-1 ring-[#E5E7EB]">
                Trusted MSME capital marketplace
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-[#0F172A] sm:text-5xl">
                Invest in vetted MSME deals with bank-grade controls.
              </h1>
              <p className="text-lg text-[#4B5563]">
                Discover diversified working-capital, inventory, and PO finance
                opportunities— with real-time risk, payouts, and compliance
                baked in.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm text-[#4B5563]">
              {[
                { value: displayStats.activeDeals ?? 0, label: "Active deals" },
                {
                  value: formatPercent(displayStats.averageYield || 0, 1),
                  label: "Avg. yield",
                },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-semibold text-[#0F172A]">
                    {s.value}
                  </p>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
            {statsError && (
              <p className="text-xs text-[#9CA3AF]">{statsError}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 blur-3xl">
              <div className="h-full rounded-3xl bg-linear-to-br from-[#DCEBFF] via-[#E6F7FF] to-[#F4F3FF]" />
            </div>
            <div className="relative space-y-4 rounded-3xl border border-[#E5E7EB] bg-white p-6 mt-7 shadow-2xl shadow-[#E0E7FF]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#4B5563]">Live volume</p>
                  <p className="text-3xl font-semibold text-[#0F172A]">
                    {formatCurrency(displayStats.liveVolume || 0)}
                  </p>
                </div>
                <div className="rounded-full bg-[#E6F0FF] px-3 py-1 text-xs font-semibold text-[#1F6FEB] inline-flex items-center gap-2">
                  <LineChart size={16} />
                  Real-time
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 text-xs text-[#4B5563]">
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {formatCurrency(breakdown.cardVolume || 0)}
                  </p>
                  <p>Card payments</p>
                </div>
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {formatCurrency(breakdown.bankVolume || 0)}
                  </p>
                  <p>Bank transfers</p>
                </div>
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {formatCurrency(breakdown.payoutVolume || 0)}
                  </p>
                  <p>Payouts</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 text-sm text-[#4B5563]">
                “We deployed and monitored diversified MSME capital in days, not
                months— with compliance built-in.”
                <p className="mt-3 text-xs text-[#0F172A] font-semibold">
                  Maya Chen · VP Product
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace strip */}
        <section id="market" className="mt-16 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
                Marketplace
              </p>
              <h2 className="text-2xl font-semibold text-[#0F172A]">
                Featured MSME opportunities
              </h2>
              <p className="text-sm text-[#4B5563]">
                Curated, risk-screened deals with live utilization.
              </p>
            </div>
            <Link
              className="hidden items-center gap-2 text-sm font-semibold text-[#1F6FEB] hover:underline md:inline-flex"
              to="/deals"
            >
              View all deals
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredList.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F8FAFC] p-6 text-sm text-[#4B5563] shadow-sm shadow-[#E0E7FF]">
                No live deals yet. Deals will appear here once they are
                published.
              </div>
            )}
            {featuredList.map((deal) => {
              const utilizedValue = parseAmountValue(deal.utilizedAmount ?? 0);
              const amountDisplay = formatCurrency(utilizedValue);
              const yieldDisplay = formatPercent(resolveYieldValue(deal), 1);
              const dealTag = deal.tag || deal.sector || "MSME";
              const tenorDisplay = `${resolveTenorMonths(deal)} months`;
              const dealHref = deal._id ? `/deals/${deal._id}` : DEALS_ROUTE;
              const locationLabel = getLocationLabel(deal);

              return (
                <div
                  key={deal.name}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-md shadow-[#E0E7FF]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#1F6FEB]">
                        {deal.status || "Pipeline"}
                      </p>
                      <h3 className="text-lg font-semibold text-[#0F172A]">
                        {deal.name}
                      </h3>
                      <p className="text-xs text-[#4B5563]">{dealTag}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">
                        Utilized Amount
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[#0F172A]">
                        {amountDisplay}
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">
                        Target APY
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[#0F172A]">
                        {yieldDisplay}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#4B5563]">
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck size={14} className="text-[#10B981]" />
                      {resolveRiskLabel(deal, DEFAULT_RISK_LABEL)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Globe2 size={14} className="text-[#1F6FEB]" />
                      {locationLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F8FAFC] px-2 py-1 text-[#0F172A] border border-[#E5E7EB]">
                      Tenor: {tenorDisplay}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link
                      className="inline-flex items-center gap-2 rounded-full bg-[#1F6FEB] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#1F6FEB33] transition hover:bg-[#195cc7]"
                      to={dealHref}
                    >
                      View deal
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust & security */}
        <section id="trust" className="mt-16 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF] lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
                  Trust
                </p>
                <h2 className="text-xl font-semibold text-[#0F172A]">
                  Security & compliance
                </h2>
              </div>
              <ShieldCheck className="text-[#10B981]" size={20} />
            </div>
            <ul className="mt-4 grid gap-3 text-sm text-[#4B5563] md:grid-cols-2">
              <li className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3 flex items-start gap-2">
                <ShieldCheck size={16} className="text-[#10B981] mt-0.5" />
                Bank-grade encryption, RBAC, and audit trails.
              </li>
              <li className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#10B981] mt-0.5" />
                KYC/KYB, AML, and sanction screening automated.
              </li>
              <li className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3 flex items-start gap-2">
                <LineChart size={16} className="text-[#1F6FEB] mt-0.5" />
                Real-time risk monitoring and payout controls.
              </li>
              <li className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3 flex items-start gap-2">
                <CreditCard size={16} className="text-[#1F6FEB] mt-0.5" />
                Segregated funds with dual-approval for disbursements.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
              Ratings
            </p>
            <h3 className="text-lg font-semibold text-[#0F172A]">
              Investors love the ops
            </h3>
            <div className="mt-4 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-[#F59E0B] text-[#F59E0B]"
                />
              ))}
              <span className="text-sm text-[#4B5563]">4.9/5</span>
            </div>
            <p className="mt-3 text-sm text-[#4B5563]">
              “Fast diligence, clear guardrails, and transparent cashflow data.
              Feels like a pro marketplace for MSME capital.”
            </p>
            <p className="mt-2 text-xs font-semibold text-[#0F172A]">
              A. Raman · Investor
            </p>
          </div>
        </section>

        {/* CTA */}
        {!isAuthenticated && (
          <section
            id="cta"
            className="mt-16 rounded-3xl bg-linear-to-r from-[#1F6FEB] via-[#0EA5E9] to-[#2563EB] p-px shadow-2xl shadow-[#CBD5F5]"
          >
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-white px-8 py-10 lg:flex-row lg:items-center">
              <div>
                <h3 className="text-2xl font-semibold text-[#0F172A]">
                  Start deploying capital with full visibility.
                </h3>
                <p className="mt-2 max-w-2xl text-[#4B5563]">
                  Join investors funding vetted MSMEs with real-time risk
                  controls and transparent cashflows.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  className="flex items-center gap-2 rounded-full bg-[#1F6FEB] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1F6FEB33] transition hover:bg-[#195cc7]"
                  to="/register"
                >
                  Create free account
                  <ArrowRight size={16} />
                </Link>
                <Link
                  className="rounded-full border border-[#E5E7EB] px-5 py-3 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
                  to="/contact"
                >
                  Talk to sales
                </Link>
              </div>
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
