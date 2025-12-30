import { Lock, Shield, Sparkles } from 'lucide-react';
import Container from '../components/layout/Container';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827]">
      <Container className="flex items-center justify-center py-16">
        <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 blur-3xl">
          <div className="h-full rounded-3xl bg-linear-to-br from-[#DCEBFF] via-[#E6F7FF] to-[#F4F3FF]" />
        </div>

        <div className="relative rounded-3xl border border-[#E5E7EB] bg-white p-10 shadow-2xl shadow-[#E0E7FF] space-y-4">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#1F6FEB]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
              <Sparkles size={20} />
            </div>
            SkaleBitz · Privacy
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-[#4B5563]">
            <Shield className="text-[#10B981]" size={18} />
            We prioritize security and confidentiality.
          </div>

          <p className="text-[#4B5563] text-sm leading-relaxed">
            This placeholder summarizes how we protect customer data. Replace with your formal privacy policy to cover
            data collection, processing, and retention.
          </p>

          <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 text-sm text-[#4B5563] space-y-2">
            <div className="flex items-center gap-2 text-[#0F172A] font-semibold">
              <Lock className="text-[#1F6FEB]" size={18} />
              Key practices
            </div>
            <ul className="space-y-1">
              <li>• Data encrypted in transit (TLS) and at rest.</li>
              <li>• Least-privilege access for staff and services.</li>
              <li>• Audit logging for sensitive actions.</li>
            </ul>
          </div>
        </div>
      </div>
      </Container>
    </div>
  );
}
