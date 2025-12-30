import { ShieldCheck, AlertTriangle, BarChart3, Sparkles } from 'lucide-react';
import Container from '../components/layout/Container';

export default function RiskReports() {
  const alerts = [
    { title: 'Exposure guardrail', detail: 'Retail bundle at 74% of limit', severity: 'medium' },
    { title: 'Payout velocity', detail: 'Payouts +12% vs baseline this week', severity: 'low' },
    { title: 'Fraud monitoring', detail: 'No new fraud flags in last 24h', severity: 'info' },
  ];

  const severityBadge = (s) => {
    switch (s) {
      case 'medium':
        return 'bg-[#FEF3C7] text-[#B45309]';
      case 'low':
        return 'bg-[#E6F0FF] text-[#1F6FEB]';
      default:
        return 'bg-[#F8FAFC] text-[#4B5563]';
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827]">
      <Container className="flex flex-col gap-8 py-10">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
              <Sparkles size={18} />
            </div>
            SkaleBitz · Risk Reports
          </div>
          <h1 className="text-3xl font-semibold text-[#0F172A]">Risk & Controls</h1>
          <p className="text-sm text-[#4B5563]">Guardrails, alerts, and portfolio risk posture.</p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Alerts</p>
                <h2 className="text-xl font-semibold text-[#0F172A]">Active guardrails</h2>
              </div>
              <AlertTriangle className="text-[#F59E0B]" size={20} />
            </div>
            <div className="mt-4 space-y-3">
              {alerts.map((a) => (
                <div
                  key={a.title}
                  className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{a.title}</p>
                    <p className="text-xs text-[#4B5563]">{a.detail}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityBadge(a.severity)}`}>
                    {a.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Posture</p>
                <h2 className="text-xl font-semibold text-[#0F172A]">Overview</h2>
              </div>
              <ShieldCheck className="text-[#10B981]" size={20} />
            </div>
            <ul className="mt-4 space-y-3 text-sm text-[#4B5563]">
              <li>• Diversification guardrails: On track</li>
              <li>• Delinquency: 0.4%</li>
              <li>• Sanction screening: Auto-enabled</li>
              <li>• Fraud flags: None in last 24h</li>
            </ul>
            <button className="mt-5 w-full rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
              Download report
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Metrics</p>
              <h2 className="text-xl font-semibold text-[#0F172A]">Risk KPIs</h2>
            </div>
            <BarChart3 className="text-[#1F6FEB]" size={20} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-4 text-sm">
            {[
              { label: 'DSO (days)', value: '38' },
              { label: 'Delinquency', value: '0.4%' },
              { label: 'Realized MOIC', value: '1.18x' },
              { label: 'Utilization', value: '74%' },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">{m.label}</p>
                <p className="mt-2 text-lg font-semibold text-[#0F172A]">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}