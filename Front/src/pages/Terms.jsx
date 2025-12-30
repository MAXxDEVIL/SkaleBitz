import { FileText, ShieldCheck, Sparkles } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] flex items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 blur-3xl">
          <div className="h-full rounded-3xl bg-linear-to-br from-[#DCEBFF] via-[#E6F7FF] to-[#F4F3FF]" />
        </div>

        <div className="relative rounded-3xl border border-[#E5E7EB] bg-white p-10 shadow-2xl shadow-[#E0E7FF] space-y-4">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#1F6FEB]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
              <Sparkles size={20} />
            </div>
            FintechOS · Terms
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-[#4B5563]">
            <FileText className="text-[#1F6FEB]" size={18} />
            Last updated: Mar 2025
          </div>

          <p className="text-[#4B5563] text-sm leading-relaxed">
            These Terms govern access to the FintechOS platform. By using the product you agree to our acceptable
            use, security, and privacy practices. Replace this copy with your legal language when ready.
          </p>

          <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 text-sm text-[#4B5563] space-y-2">
            <div className="flex items-center gap-2 text-[#0F172A] font-semibold">
              <ShieldCheck className="text-[#10B981]" size={18} />
              Highlights
            </div>
            <ul className="space-y-1">
              <li>• Role-based access controls and audit logging.</li>
              <li>• Data encrypted in transit and at rest.</li>
              <li>• Support for compliance exports upon request.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}