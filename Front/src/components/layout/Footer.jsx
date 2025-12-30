import { ShieldCheck, Sparkles } from 'lucide-react';

const sections = [
  {
    title: 'Product',
    links: ['Marketplace (MVP)', 'Risk & Controls (beta)', 'Payouts (beta)', 'API (coming soon)', 'Status'],
  },
  {
    title: 'Company',
    links: ['About', 'Hackathon Story', 'Careers (future)', 'Press', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy (draft)', 'Terms (MVP)', 'AML/KYC Policy', 'Compliance Notes', 'Cookies'],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F8FAFC] text-[#0F172A]">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            <div className="inline-flex items-center gap-2 text-lg font-semibold">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
                <Sparkles size={20} />
              </div>
              FintechOS (MVP)
            </div>
            <p className="text-sm text-[#4B5563]">
              Hackathon build for a trust-first MSME capital marketplace. We’re iterating fast and plan to open-source the platform—follow along and contribute.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-[#4B5563]">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 border border-[#E5E7EB]">
                <ShieldCheck size={14} className="text-[#10B981]" />
                Guardrails (MVP)
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 border border-[#E5E7EB]">
                🚀 Hackathon sprint
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 border border-[#E5E7EB]">
                🤝 Open source soon
              </span>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0EA5E9]">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                {section.links.map((link) => (
                  <li key={link}>
                    <a className="hover:text-[#1F6FEB]" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#E5E7EB] pt-4 text-sm text-[#4B5563] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            <a className="hover:text-[#1F6FEB]" href="#">Privacy (draft)</a>
            <a className="hover:text-[#1F6FEB]" href="#">Terms (MVP)</a>
            <a className="hover:text-[#1F6FEB]" href="#">Cookies</a>
            <a className="hover:text-[#1F6FEB]" href="#">Status</a>
            <a className="hover:text-[#1F6FEB]" href="#">Open Source Roadmap</a>
          </div>
          <div className="text-[#4B5563]">© {new Date().getFullYear()} FintechOS · Hackathon MVP · Open source soon</div>
        </div>
      </div>
    </footer>
  );
}