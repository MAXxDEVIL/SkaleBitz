import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Filter,
  Loader2,
  ShieldCheck,
  Sparkles,
  Tag,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const filters = ['All', 'KYC/KYB', 'Docs', 'Payouts', 'Risk'];
const queue = [
  { id: 'Q-1024', title: 'KYC: Nova Parts Co', type: 'KYC/KYB', owner: 'A. Reyes', status: 'In review', eta: '15m' },
  { id: 'Q-1025', title: 'Docs: AgroLink MSME', type: 'Docs', owner: 'M. Chen', status: 'Waiting docs', eta: '—' },
  { id: 'Q-1026', title: 'Payout: BrightMart Supplies', type: 'Payouts', owner: 'J. Patel', status: 'Pending approval', eta: '5m' },
  { id: 'Q-1027', title: 'Risk alert: Retail bundle', type: 'Risk', owner: 'Ops Bot', status: 'Flagged', eta: '—' },
];

const statusBadge = (status) => {
  switch (status) {
    case 'In review':
      return 'bg-[#E6F0FF] text-[#1F6FEB]';
    case 'Pending approval':
      return 'bg-[#FEF3C7] text-[#B45309]';
    case 'Flagged':
      return 'bg-[#FEE2E2] text-[#B91C1C]';
    case 'Waiting docs':
    default:
      return 'bg-[#F8FAFC] text-[#4B5563]';
  }
};

export default function OpsQueue() {
  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              FintechOS · Ops Queue
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
              Export queue
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1F6FEB33] transition hover:bg-[#195cc7]">
              New task
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-md shadow-[#E0E7FF] flex-wrap">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#4B5563] border border-[#E5E7EB]">
            <Filter size={14} />
            Filters
          </div>
          {filters.map((f) => (
            <button
              key={f}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition border ${
                f === 'All'
                  ? 'bg-[#1F6FEB] text-white border-[#1F6FEB]'
                  : 'bg-white text-[#1F2937] border-[#E5E7EB] hover:border-[#CBD5E1]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Queue list */}
          <div className="lg:col-span-2 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Tasks</p>
                <h2 className="text-xl font-semibold text-[#0F172A]">Ops queue</h2>
              </div>
              <Clock className="text-[#1F6FEB]" size={18} />
            </div>

            <div className="mt-4 divide-y divide-[#E5E7EB]">
              {queue.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#0F172A]">{item.title}</span>
                      <span className={`text-xs font-semibold rounded-full px-2 py-1 ${statusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#4B5563]">
                      <span className="inline-flex items-center gap-1">
                        <Tag size={14} className="text-[#1F6FEB]" />
                        {item.type}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <User size={14} className="text-[#1F6FEB]" />
                        {item.owner}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={14} className="text-[#1F6FEB]" />
                        ETA: {item.eta}
                      </span>
                    </div>
                  </div>
                  <Link className="text-sm font-semibold text-[#1F6FEB] hover:underline" to={`/ops/tasks/${item.id}`}>
                     Open
                   </Link>
                </div>
              ))}
            </div>

            <button className="mt-5 w-full rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
              View all tasks
            </button>
          </div>

          {/* Detail / Side card */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Now handling</p>
                  <h3 className="text-lg font-semibold text-[#0F172A]">Payout: BrightMart Supplies</h3>
                  <p className="text-sm text-[#4B5563]">Verify beneficiary and approve settlement</p>
                </div>
                <ShieldCheck className="text-[#10B981]" size={18} />
              </div>

              <div className="mt-4 grid gap-3 text-sm text-[#4B5563]">
                <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
                  <span>Beneficiary verification</span>
                  <Loader2 className="animate-spin text-[#1F6FEB]" size={16} />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
                  <span>Amount</span>
                  <span className="font-semibold text-[#0F172A]">$48,200</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
                  <span>Next action</span>
                  <span className="font-semibold text-[#1F6FEB]">Approve</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
                  Notes
                </button>
                <button className="inline-flex items-center gap-2 rounded-full bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1F6FEB33] transition hover:bg-[#195cc7]">
                  Approve payout
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-md shadow-[#E0E7FF]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
                <ShieldCheck size={16} className="text-[#10B981]" />
                Ops guardrails
              </div>
              <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
                <li>• Dual approval for payouts over $25k</li>
                <li>• Automated sanction screening</li>
                <li>• Daily reconciliation checks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}