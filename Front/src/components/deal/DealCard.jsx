import { ArrowUpRight, Banknote, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DealCard({
  name = 'BrightMart Supplies',
  sector = 'Retail ops · Working capital',
  amount = '$120,000',
  yieldPct = '11.8%',
  status = 'Active',
  location = 'Singapore',
  tenor = '12 months',
  risk = 'On track',
  ctaLabel = 'View deal',
  href = '#',
}) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-md shadow-[#E0E7FF] hover:shadow-lg hover:shadow-[#E0E7FF]/80 transition">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F0FF] px-3 py-1 text-xs font-semibold text-[#1F6FEB]">
            <Sparkles size={14} />
            {status}
          </div>
          <h3 className="text-lg font-semibold text-[#0F172A]">{name}</h3>
          <p className="text-sm text-[#4B5563]">{sector}</p>
        </div>
        <div className="text-right text-sm text-[#4B5563]">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-3 py-1 border border-[#E5E7EB]">
            <ShieldCheck size={14} className="text-[#10B981]" />
            {risk}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
        <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">Amount</p>
          <p className="mt-2 text-lg font-semibold text-[#0F172A]">{amount}</p>
        </div>
        <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">Target APY</p>
          <p className="mt-2 text-lg font-semibold text-[#0F172A]">{yieldPct}</p>
        </div>
        <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">Tenor</p>
          <p className="mt-2 text-lg font-semibold text-[#0F172A]">{tenor}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#4B5563]">
        <span className="inline-flex items-center gap-1">
          <MapPin size={14} className="text-[#1F6FEB]" />
          {location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Banknote size={14} className="text-[#1F6FEB]" />
          Policy limits enforced
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to={href}
          className="inline-flex items-center gap-2 rounded-full bg-[#1F6FEB] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#1F6FEB33] transition hover:bg-[#195cc7]"
        >
          {ctaLabel}
          <ArrowUpRight size={16} />
        </Link>
        <button className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
          View memo
        </button>
      </div>
    </div>
  );
}