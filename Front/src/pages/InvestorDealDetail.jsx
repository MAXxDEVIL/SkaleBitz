import {
  ArrowLeft,
  ArrowUpRight,
  Banknote,
  BarChart3,
  Calendar,
  CheckCircle2,
  FileText,
  LineChart,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const repaymentSchedule = [
  { cycle: 'Cycle 12', date: 'Mar 18, 2025', amount: '$18,400', status: 'Settled' },
  { cycle: 'Cycle 13', date: 'Apr 18, 2025', amount: '$18,400', status: 'Scheduled' },
  { cycle: 'Cycle 14', date: 'May 18, 2025', amount: '$18,400', status: 'Scheduled' },
];

const documents = [
  { name: 'Investment memo.pdf', status: 'Signed' },
  { name: 'KYB verification.pdf', status: 'Verified' },
  { name: 'Facility agreement.pdf', status: 'Signed' },
];

const highlights = [
  'Diversified merchant base with stable MOIC trajectory.',
  'Inventory-backed with rolling 60-day repayment cadence.',
  'Proactive fraud/risk monitoring with automated holds.',
];

export default function InvestorDealDetail() {
  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Breadcrumb / Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
            >
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
                <Sparkles size={18} />
              </div>
              FintechOS · Deal detail
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
              Export
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1F6FEB33] transition hover:bg-[#195cc7]">
              Adjust allocation
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Deal summary */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">MSME Deal</p>
                <h1 className="text-2xl font-semibold text-[#0F172A]">BrightMart Supplies</h1>
                <p className="text-sm text-[#4B5563] mt-1">Working capital · Retail ops</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  <span className="rounded-full bg-[#E6F0FF] px-3 py-1 font-semibold text-[#1F6FEB]">Active</span>
                  <span className="rounded-full bg-[#ECFDF3] px-3 py-1 font-semibold text-[#15803D]">On track</span>
                  <span className="rounded-full bg-[#F8FAFC] px-3 py-1 text-[#4B5563]">Cycle 12 / 18</span>
                </div>
              </div>
              <div className="text-right text-sm text-[#4B5563]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-3 py-1 border border-[#E5E7EB]">
                  <ShieldCheck size={16} className="text-[#10B981]" />
                  Risk controls enabled
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                <p className="text-sm font-semibold text-[#0F172A]">Facility size</p>
                <p className="text-2xl font-semibold text-[#0F172A] mt-1">$420,000</p>
                <p className="text-sm text-[#4B5563] mt-1">Utilized: $310,000</p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                <p className="text-sm font-semibold text-[#0F172A]">Target yield</p>
                <p className="text-2xl font-semibold text-[#0F172A] mt-1">11.8%</p>
                <p className="text-sm text-[#10B981] mt-1">+0.3 pts vs plan</p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                <p className="text-sm font-semibold text-[#0F172A]">Repayment cadence</p>
                <p className="text-2xl font-semibold text-[#0F172A] mt-1">Monthly</p>
                <p className="text-sm text-[#4B5563] mt-1 flex items-center gap-2">
                  <Calendar size={14} className="text-[#1F6FEB]" />
                  Next: Apr 18, 2025
                </p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                <p className="text-sm font-semibold text-[#0F172A]">Location</p>
                <p className="text-2xl font-semibold text-[#0F172A] mt-1">Singapore</p>
                <p className="text-sm text-[#4B5563] mt-1 flex items-center gap-2">
                  <MapPin size={14} className="text-[#1F6FEB]" />
                  Regional diversification enabled
                </p>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Performance</p>
                <BarChart3 className="text-[#1F6FEB]" size={18} />
              </div>
              <div className="mt-4 space-y-3 text-sm text-[#4B5563]">
                <div className="flex justify-between">
                  <span>DSO (days)</span>
                  <span className="font-semibold text-[#0F172A]">38</span>
                </div>
                <div className="flex justify-between">
                  <span>Delinquency</span>
                  <span className="font-semibold text-[#10B981]">0.4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Realized MOIC</span>
                  <span className="font-semibold text-[#0F172A]">1.18x</span>
                </div>
                <div className="flex justify-between">
                  <span>Utilization</span>
                  <span className="font-semibold text-[#1F6FEB]">74%</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Risk</p>
                <ShieldCheck className="text-[#10B981]" size={18} />
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[#4B5563]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#10B981]" />
                  KYC/KYB verified
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#10B981]" />
                  Payout monitoring active
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#10B981]" />
                  Diversification guardrails met
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Repayment & Documents */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Cashflows</p>
                <h2 className="text-xl font-semibold text-[#0F172A]">Repayment schedule</h2>
              </div>
              <LineChart className="text-[#1F6FEB]" size={18} />
            </div>
            <div className="mt-4 divide-y divide-[#E5E7EB]">
              {repaymentSchedule.map((r) => (
                <div key={r.cycle} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{r.cycle}</p>
                    <p className="text-xs text-[#4B5563]">{r.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0F172A]">{r.amount}</p>
                    <p
                      className={`text-xs ${
                        r.status === 'Settled' ? 'text-[#10B981]' : 'text-[#1F6FEB]'
                      }`}
                    >
                      {r.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/deals/brightmart/cashflows"
              className="mt-4 flex w-full items-center justify-center rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
            >     
            View cashflow history
            </Link>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Docs</p>
                <h2 className="text-xl font-semibold text-[#0F172A]">Agreements</h2>
              </div>
              <FileText className="text-[#1F6FEB]" size={18} />
            </div>
            <div className="mt-4 space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{doc.name}</p>
                    <p className="text-xs text-[#4B5563]">{doc.status}</p>
                  </div>
                  <button className="text-sm font-semibold text-[#1F6FEB] hover:underline">View</button>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
              Upload document
            </button>
          </div>
        </div>

        {/* Highlights */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Notes</p>
              <h2 className="text-xl font-semibold text-[#0F172A]">Highlights</h2>
            </div>
            <Banknote className="text-[#1F6FEB]" size={18} />
          </div>
          <div className="mt-4 space-y-3 text-sm text-[#4B5563]">
            {highlights.map((h, idx) => (
              <div key={idx} className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}