import {
  ArrowUpRight,
  BarChart3,
  Banknote,
  LineChart,
  PieChart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const summary = [
  { label: 'Total invested', value: '$2.4M', delta: '+3.2% MoM', icon: Banknote },
  { label: 'Active deals', value: '18', delta: '+2 this week', icon: LineChart },
  { label: 'Avg. yield', value: '11.4%', delta: '+0.4 pts', icon: BarChart3 },
];

const allocation = [
  { name: 'Working capital', percent: 42 },
  { name: 'Inventory finance', percent: 27 },
  { name: 'Purchase orders', percent: 19 },
  { name: 'Revenue share', percent: 12 },
];

const recentDeals = [
  { name: 'BrightMart Supplies', sector: 'Retail ops', amount: '$120k', status: 'Active' },
  { name: 'AgroLink MSME', sector: 'Agri inputs', amount: '$85k', status: 'Active' },
  { name: 'Nova Parts Co', sector: 'Manufacturing', amount: '$140k', status: 'Pending' },
];

const activity = [
  { title: 'Payout processed', desc: 'Cycle #12 for BrightMart Supplies', time: '2h ago' },
  { title: 'New allocation', desc: '$50k moved to Inventory finance', time: '6h ago' },
  { title: 'Deal update', desc: 'Nova Parts Co moved to Pending review', time: 'Yesterday' },
];

export default function InvestorDashboard() {
  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#1F6FEB]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
              <Sparkles size={20} />
            </div>
            FintechOS · Investor
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
              Export report
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1F6FEB33] transition hover:bg-[#195cc7]">
              New investment
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {summary.map(({ label, value, delta, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-md shadow-[#E0E7FF]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#4B5563]">{label}</p>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F0FF] text-[#1F6FEB]">
                  <Icon size={18} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-[#0F172A]">{value}</p>
              <p className="mt-1 text-sm font-medium text-[#10B981]">{delta}</p>
            </div>
          ))}
        </div>

        {/* Portfolio & Risk */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF] lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Portfolio</p>
                <h2 className="text-xl font-semibold text-[#0F172A]">Allocation by strategy</h2>
              </div>
              <PieChart className="text-[#1F6FEB]" size={20} />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {allocation.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#0F172A]">{item.name}</p>
                    <span className="text-sm font-semibold text-[#1F6FEB]">{item.percent}%</span>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-[#E5E7EB]">
                    <div
                      className="h-2 rounded-full bg-[#1F6FEB]"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Risk</p>
                <h2 className="text-xl font-semibold text-[#0F172A]">Controls</h2>
              </div>
              <ShieldCheck className="text-[#10B981]" size={20} />
            </div>
            <ul className="mt-4 space-y-3 text-sm text-[#4B5563]">
              <li>• KYC/KYB verified counterparties</li>
              <li>• Daily liquidity checks</li>
              <li>• Automated payout monitoring</li>
              <li>• Diversification guardrails</li>
            </ul>
            <button className="mt-5 w-full rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
              View risk report
            </button>
          </div>
        </div>

        {/* Recent deals & Activity */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Pipeline</p>
                <h2 className="text-xl font-semibold text-[#0F172A]">Recent deals</h2>
              </div>
              <LineChart className="text-[#1F6FEB]" size={20} />
            </div>
            <div className="mt-4 divide-y divide-[#E5E7EB]">
              {recentDeals.map((deal) => (
                <div key={deal.name} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{deal.name}</p>
                    <p className="text-xs text-[#4B5563]">{deal.sector}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0F172A]">{deal.amount}</p>
                    <p className="text-xs text-[#1F6FEB]">{deal.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
              View all deals
            </button>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Ops</p>
                <h2 className="text-xl font-semibold text-[#0F172A]">Activity</h2>
              </div>
              <BarChart3 className="text-[#1F6FEB]" size={20} />
            </div>
            <div className="mt-4 space-y-4">
              {activity.map((item) => (
                <div key={item.title} className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                  <p className="text-sm font-semibold text-[#0F172A]">{item.title}</p>
                  <p className="text-sm text-[#4B5563]">{item.desc}</p>
                  <p className="text-xs text-[#0EA5E9] mt-1">{item.time}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
              View logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}