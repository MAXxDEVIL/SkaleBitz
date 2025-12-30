import { ArrowLeft, Calendar, LineChart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CashflowHistory() {
  const flows = [
    { cycle: 'Cycle 12', date: 'Mar 18, 2025', principal: '$15,000', yield: '$3,400', status: 'Settled' },
    { cycle: 'Cycle 11', date: 'Feb 18, 2025', principal: '$15,000', yield: '$3,380', status: 'Settled' },
    { cycle: 'Cycle 10', date: 'Jan 18, 2025', principal: '$15,000', yield: '$3,360', status: 'Settled' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex items-center gap-3">
          <Link
            to="/deals/brightmart" // adjust to your deal detail route
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
          >
            <ArrowLeft size={16} />
            Back to deal
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
              <Sparkles size={18} />
            </div>
            FintechOS · Cashflow History
          </div>
        </div>

        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-[#0F172A]">Cashflows</h1>
          <p className="text-sm text-[#4B5563]">Principal + yield by cycle. Replace with live ledger data when ready.</p>
        </header>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">History</p>
              <h2 className="text-xl font-semibold text-[#0F172A]">Payouts</h2>
            </div>
            <LineChart className="text-[#1F6FEB]" size={20} />
          </div>

          <div className="mt-4 divide-y divide-[#E5E7EB]">
            {flows.map((f) => (
              <div key={f.cycle} className="grid grid-cols-5 items-center py-3 text-sm">
                <div className="col-span-2">
                  <p className="font-semibold text-[#0F172A]">{f.cycle}</p>
                  <p className="text-xs text-[#4B5563] inline-flex items-center gap-1">
                    <Calendar size={14} className="text-[#1F6FEB]" />
                    {f.date}
                  </p>
                </div>
                <p className="text-[#0F172A]">{f.principal}</p>
                <p className="text-[#0F172A]">{f.yield}</p>
                <p className={`text-xs font-semibold ${f.status === 'Settled' ? 'text-[#10B981]' : 'text-[#1F6FEB]'}`}>
                  {f.status}
                </p>
              </div>
            ))}
          </div>

          <button className="mt-5 w-full rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}