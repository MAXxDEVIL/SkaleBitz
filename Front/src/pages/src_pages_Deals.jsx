import { useMemo, useState } from 'react';
import DealCard from '../components/deal/DealCard';

const deals = [
  { name: 'BrightMart Supplies', sector: 'Retail ops · Working capital', amount: '$120,000', yieldPct: '11.8%', status: 'Active', location: 'Singapore', tenor: '12 months', risk: 'On track', href: '/deals/brightmart' },
  { name: 'AgroLink MSME', sector: 'Agri inputs · Inventory', amount: '$85,000', yieldPct: '10.9%', status: 'Active', location: 'Malaysia', tenor: '10 months', risk: 'On track', href: '/deals/agrolink' },
  { name: 'Nova Parts Co', sector: 'Manufacturing · PO finance', amount: '$140,000', yieldPct: '11.2%', status: 'Pending', location: 'Vietnam', tenor: '9 months', risk: 'Review', href: '/deals/nova' },
];

const statusOptions = ['All', 'Active', 'Pending', 'Review'];
const regionOptions = ['All', 'Singapore', 'Malaysia', 'Vietnam'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'yield-desc', label: 'Yield ↓' },
  { value: 'yield-asc', label: 'Yield ↑' },
  { value: 'tenor-asc', label: 'Tenor ↑' },
  { value: 'tenor-desc', label: 'Tenor ↓' },
  { value: 'amount-desc', label: 'Amount ↓' },
  { value: 'amount-asc', label: 'Amount ↑' },
];

function parseMoney(str) {
  // expects like "$120,000"
  return Number(str.replace(/[^0-9.]/g, '')) || 0;
}
function parseYield(str) {
  // expects like "11.8%"
  return Number(str.replace(/[^0-9.]/g, '')) || 0;
}
function parseTenor(str) {
  // expects like "12 months"
  return Number(str.replace(/[^0-9.]/g, '')) || 0;
}

export default function Deals() {
    const [status, setStatus] = useState('All');
  const [region, setRegion] = useState('All');
  const [minYield, setMinYield] = useState('');
  const [maxTenor, setMaxTenor] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredDeals = useMemo(() => {
    let list = [...deals];

    if (status !== 'All') {
      list = list.filter((d) => d.status === status);
    }
    if (region !== 'All') {
      list = list.filter((d) => d.location === region);
    }
    if (minYield) {
      const minY = Number(minYield);
      list = list.filter((d) => parseYield(d.yieldPct) >= minY);
    }
    if (maxTenor) {
      const maxT = Number(maxTenor);
      list = list.filter((d) => parseTenor(d.tenor) <= maxT);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.sector.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'yield-desc':
        list.sort((a, b) => parseYield(b.yieldPct) - parseYield(a.yieldPct));
        break;
      case 'yield-asc':
        list.sort((a, b) => parseYield(a.yieldPct) - parseYield(b.yieldPct));
        break;
      case 'tenor-asc':
        list.sort((a, b) => parseTenor(a.tenor) - parseTenor(b.tenor));
        break;
      case 'tenor-desc':
        list.sort((a, b) => parseTenor(b.tenor) - parseTenor(a.tenor));
        break;
      case 'amount-desc':
        list.sort((a, b) => parseMoney(b.amount) - parseMoney(a.amount));
        break;
      case 'amount-asc':
        list.sort((a, b) => parseMoney(a.amount) - parseMoney(b.amount));
        break;
      default:
        break;
    }

    return list;
  }, [status, region, minYield, maxTenor, search, sortBy]);

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-[#0F172A]">Deals</h1>
          <p className="text-sm text-[#4B5563]">Browse active, pending, and pipeline MSME deals.</p>
        </header>

        {/* Filters */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm shadow-[#E0E7FF] flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#4B5563]">Status:</span>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setStatus(opt)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                      status === opt
                        ? 'bg-[#1F6FEB] text-white border-[#1F6FEB]'
                        : 'bg-white text-[#1F2937] border-[#E5E7EB] hover:border-[#CBD5E1]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#4B5563]">Region:</span>
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
              <span className="text-xs font-semibold text-[#4B5563]">Min yield (%):</span>
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
              <span className="text-xs font-semibold text-[#4B5563]">Max tenor (mo):</span>
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
              <span className="text-xs font-semibold text-[#4B5563]">Sort:</span>
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
          </div>

          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, sector, or region"
              className="w-full rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
            />
            <button
              onClick={() => {
                setStatus('All');
                setRegion('All');
                setMinYield('');
                setMaxTenor('');
                setSearch('');
                setSortBy('featured');
              }}
              className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredDeals.map((deal) => (
            <DealCard key={deal.name} {...deal} />
          ))}
          {filteredDeals.length === 0 && (
            <div className="col-span-full rounded-2xl border border-[#E5E7EB] bg-white p-6 text-sm text-[#4B5563] shadow-sm shadow-[#E0E7FF]">
              No deals match your filters. Try adjusting filters or reset.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}