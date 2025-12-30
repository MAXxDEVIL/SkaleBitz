import { Clock, ListTree, Sparkles } from 'lucide-react';

export default function Logs() {
  const logs = [
    { title: 'Payout processed', detail: 'Cycle #12 · BrightMart Supplies', time: '2h ago' },
    { title: 'Allocation change', detail: '$50k → Inventory finance', time: '6h ago' },
    { title: 'Deal status', detail: 'Nova Parts Co moved to Pending review', time: 'Yesterday' },
    { title: 'Risk scan', detail: 'Sanction check batch complete (0 flags)', time: 'Yesterday' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
              <Sparkles size={18} />
            </div>
            FintechOS · Activity Logs
          </div>
          <h1 className="text-3xl font-semibold text-[#0F172A]">Logs & Events</h1>
          <p className="text-sm text-[#4B5563]">Audit-friendly activity stream for ops and investors.</p>
        </header>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Timeline</p>
              <h2 className="text-xl font-semibold text-[#0F172A]">Recent activity</h2>
            </div>
            <ListTree className="text-[#1F6FEB]" size={20} />
          </div>

          <div className="mt-4 space-y-3">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{log.title}</p>
                  <p className="text-xs text-[#4B5563]">{log.detail}</p>
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-[#0EA5E9]">
                  <Clock size={14} />
                  {log.time}
                </div>
              </div>
            ))}
          </div>

          <button className="mt-5 w-full rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}