import { Headset, LifeBuoy, Sparkles } from 'lucide-react';

export default function Support() {
  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] flex items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 blur-3xl">
          <div className="h-full rounded-3xl bg-linear-to-br from-[#DCEBFF] via-[#E6F7FF] to-[#F4F3FF]" />
        </div>

        <div className="relative rounded-3xl border border-[#E5E7EB] bg-white p-10 shadow-2xl shadow-[#E0E7FF] space-y-5">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#1F6FEB]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
              <Sparkles size={20} />
            </div>
            FintechOS · Support
          </div>

          <h1 className="text-3xl font-semibold text-[#0F172A]">How can we help?</h1>
          <p className="text-sm text-[#4B5563]">
            Get answers on onboarding, investor access, payouts, or risk controls. Reach us any time.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 flex items-center gap-3">
              <Headset className="text-[#1F6FEB]" size={20} />
              <div>
                <p className="font-semibold text-[#0F172A]">Live support</p>
                <p className="text-[#4B5563]">Chat with our ops team</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 flex items-center gap-3">
              <LifeBuoy className="text-[#10B981]" size={20} />
              <div>
                <p className="font-semibold text-[#0F172A]">Knowledge base</p>
                <p className="text-[#4B5563]">Guides and playbooks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}