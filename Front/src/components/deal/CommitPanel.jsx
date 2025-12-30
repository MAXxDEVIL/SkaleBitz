import { useState } from 'react';
import { ArrowRight, Banknote, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export default function CommitPanel() {
  const [amount, setAmount] = useState(25000);

  const tiers = [
    { label: 'Minimum', value: '$1,000' },
    { label: 'Suggested', value: '$25,000' },
    { label: 'Max per policy', value: '$150,000' },
  ];

  const stats = [
    { label: 'Target APY', value: '11.8%' },
    { label: 'Tenor', value: '12 months' },
    { label: 'Status', value: 'Active' },
  ];

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-xl shadow-[#E0E7FF]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
            <Sparkles size={18} />
          </div>
          Commit capital
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-[#4B5563] border border-[#E5E7EB]">
          <ShieldCheck size={14} className="text-[#10B981]" />
          Guardrails on
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[#4B5563]">Commit amount</p>
            <p className="text-3xl font-semibold text-[#0F172A]">${amount.toLocaleString()}</p>
            <p className="text-xs text-[#4B5563] mt-1">
              Diversification and policy limits enforced automatically.
            </p>
          </div>
          <div className="rounded-2xl bg-[#E6F0FF] px-3 py-2 text-xs font-semibold text-[#1F6FEB] inline-flex items-center gap-2">
            <TrendingUp size={14} />
            Yield optimized
          </div>
        </div>

        <input
          type="range"
          min={1000}
          max={150000}
          step={1000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-4 w-full accent-[#1F6FEB]"
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
          {tiers.map((tier) => (
            <div
              key={tier.label}
              className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 flex items-center justify-between"
            >
              <span className="text-[#4B5563]">{tier.label}</span>
              <span className="font-semibold text-[#0F172A]">{tier.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm shadow-[#E0E7FF]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">
              {stat.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-[#0F172A]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[#4B5563]">
          Funds held in escrow until allocation completes. Payouts follow deal cadence.
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1F6FEB] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1F6FEB33] transition hover:bg-[#195cc7]">
          Commit ${amount.toLocaleString()}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}