import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DealCard from "../components/deal/DealCard";
import { fetchDeals } from "../services/dealService";
import { formatCurrency, formatPercent } from "../utils/formatters";
import {
  deriveLocation,
  getStatusMeta,
  normalizeStatus,
  resolveTenorMonths,
} from "../utils/dealMeta";
import Container from "../components/layout/Container";

const statusOptions = ["All", "Active", "Pending", "Review", "Offline"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "yield-desc", label: "Yield ↓" },
  { value: "yield-asc", label: "Yield ↑" },
  { value: "tenor-asc", label: "Tenor ↑" },
  { value: "tenor-desc", label: "Tenor ↓" },
  { value: "utilized-desc", label: "Utilized ↓" },
  { value: "utilized-asc", label: "Utilized ↑" },
];

function parseMoney(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
}
function parseYield(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
}
const getYieldValue = (deal) => parseYield(deal.targetYield ?? deal.yieldPct);
const getTenorValue = (deal) => resolveTenorMonths(deal);
const getUtilizedValue = (deal) => parseMoney(deal.utilizedAmount ?? 0);

export default function Deals() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [status, setStatus] = useState("All");
  const [region, setRegion] = useState("All");
  const [minYield, setMinYield] = useState("");
  const [maxTenor, setMaxTenor] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const regionOptions = useMemo(() => {
    const regions = new Set(["All"]);
    deals.forEach((deal) => regions.add(deriveLocation(deal)));
    return Array.from(regions);
  }, [deals]);
  const regionSet = useMemo(() => new Set(regionOptions), [regionOptions]);

  useEffect(() => {
    const param = searchParams.get("q") || "";
    setSearch(param);
  }, [searchParams]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDeals();
        setDeals(data || []);
      } catch {
        setLoadError("Unable to load deals right now.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (region !== "All" && !regionSet.has(region)) {
      setRegion("All");
    }
  }, [regionSet, region]);

  const filteredDeals = useMemo(() => {
    let list = [...deals];

    if (status !== "All") {
      const statusFilter = normalizeStatus(status);
      list = list.filter((d) => normalizeStatus(d.status) === statusFilter);
    }
    if (region !== "All") {
      const regionFilter = region.toLowerCase();
      list = list.filter(
        (d) => deriveLocation(d).toLowerCase() === regionFilter
      );
    }
    if (minYield) {
      const minY = Number(minYield);
      list = list.filter((d) => getYieldValue(d) >= minY);
    }
    if (maxTenor) {
      const maxT = Number(maxTenor);
      list = list.filter((d) => getTenorValue(d) <= maxT);
    }
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      const q = trimmedSearch.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          (d.sector || "").toLowerCase().includes(q) ||
          deriveLocation(d).toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "yield-desc":
        list.sort((a, b) => getYieldValue(b) - getYieldValue(a));
        break;
      case "yield-asc":
        list.sort((a, b) => getYieldValue(a) - getYieldValue(b));
        break;
      case "tenor-asc":
        list.sort((a, b) => getTenorValue(a) - getTenorValue(b));
        break;
      case "tenor-desc":
        list.sort((a, b) => getTenorValue(b) - getTenorValue(a));
        break;
      case "utilized-desc":
        list.sort((a, b) => getUtilizedValue(b) - getUtilizedValue(a));
        break;
      case "utilized-asc":
        list.sort((a, b) => getUtilizedValue(a) - getUtilizedValue(b));
        break;
      default:
        break;
    }

    return list.map((deal) => {
      const tenorValue = getTenorValue(deal);
      const statusMeta = getStatusMeta(deal.status);
      const location = deriveLocation(deal);
      return {
        ...deal,
        amountDisplay: formatCurrency(getUtilizedValue(deal)),
        yieldDisplay: formatPercent(getYieldValue(deal), 1),
        tenorDisplay: tenorValue ? `${tenorValue} months` : "",
        status: statusMeta.label,
        risk: deal.risk || "On track",
        location,
        href: deal.href || (deal._id ? `/deals/${deal._id}` : "/deals"),
      };
    });
  }, [status, region, minYield, maxTenor, search, sortBy, deals]);

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827]">
      <Container className="flex flex-col gap-8 py-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-[#0F172A]">Deals</h1>
          <p className="text-sm text-[#4B5563]">
            Browse active, pending, and pipeline MSME deals.
          </p>
        </header>

        {loadError && (
          <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] p-3 text-sm text-[#B91C1C] shadow-sm shadow-[#FEE2E2]">
            {loadError}
          </div>
        )}

        {/* Filters */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm shadow-[#E0E7FF] flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#4B5563]">
                Status:
              </span>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setStatus(opt)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                      status === opt
                        ? "bg-[#1F6FEB] text-white border-[#1F6FEB]"
                        : "bg-white text-[#1F2937] border-[#E5E7EB] hover:border-[#CBD5E1]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#4B5563]">
                Region:
              </span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#1F2937] focus:outline-none"
              >
                {regionOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#4B5563]">
                Min yield (%):
              </span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={minYield}
                onChange={(e) => setMinYield(e.target.value)}
                className="w-20 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs text-[#1F2937] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#4B5563]">
                Max tenor (mo):
              </span>
              <input
                type="number"
                min="0"
                step="1"
                value={maxTenor}
                onChange={(e) => setMaxTenor(e.target.value)}
                className="w-20 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs text-[#1F2937] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#4B5563]">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#1F2937] focus:outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setStatus("All");
                  setRegion("All");
                  setMinYield("");
                  setMaxTenor("");
                  setSearch("");
                  setSortBy("featured");
                  const next = new URLSearchParams(searchParams);
                  next.delete("q");
                  setSearchParams(next);
                }}
                className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {loading && (
            <div className="col-span-full rounded-2xl border border-[#E5E7EB] bg-white p-6 text-sm text-[#4B5563] shadow-sm shadow-[#E0E7FF]">
              Loading deals...
            </div>
          )}
          {!loading &&
            filteredDeals.map((deal, index) => (
              <DealCard
                key={deal._id || index}
                name={deal.name}
                sector={deal.sector}
                amount={deal.amountDisplay}
                yieldPct={deal.yieldDisplay}
                status={deal.status}
                location={deal.location}
                tenor={deal.tenorDisplay}
                risk={deal.risk}
                href={deal.href}
              />
            ))}
          {!loading && filteredDeals.length === 0 && (
            <div className="col-span-full rounded-2xl border border-[#E5E7EB] bg-white p-6 text-sm text-[#4B5563] shadow-sm shadow-[#E0E7FF]">
              No deals match your filters. Try adjusting filters or reset.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
