import { ArrowRight, CreditCard, LineChart, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Bank-grade security',
    description: 'Every transaction is encrypted and monitored 24/7 so you can operate with confidence.',
  },
  {
    icon: LineChart,
    title: 'Real-time insights',
    description: 'Live dashboards keep your team aligned on cash flow, growth, and customer health.',
  },
  {
    icon: CreditCard,
    title: 'Unified payments',
    description: 'Accept cards, transfers, and payouts from a single control center built for scale.',
  },
];

const steps = [
  {
    title: 'Create your workspace',
    description: 'Spin up a secure account tailored to your team, roles, and approval flows.',
  },
  {
    title: 'Connect your data',
    description: 'Plug in banking, accounting, and product data with guided, zero-downtime setup.',
  },
  {
    title: 'Launch in days',
    description: 'Go live with automated onboarding, KYC, and risk controls without extra engineering lift.',
  },
];

const stats = [
  { value: '24/7', label: 'Fraud monitoring' },
  { value: '120+', label: 'Global banking partners' },
  { value: '99.99%', label: 'Platform uptime' },
];

const testimonial = {
  quote:
    'We launched new revenue streams in weeks instead of quarters. FintechOS let us stay focused on customers while keeping compliance tight.',
  author: 'Maya Chen',
  role: 'VP Product',
};

function Landing() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300">
            <Sparkles size={22} />
          </div>
          FintechOS
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-200/80 sm:flex">
          <a className="transition hover:text-white" href="#features">Features</a>
          <a className="transition hover:text-white" href="#journey">How it works</a>
          <a className="transition hover:text-white" href="#cta">Get started</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-200/90 transition hover:text-white sm:inline-block">
            Sign in
          </button>
          <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">
            Book a demo
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-8 lg:px-8">
        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sky-200/90 ring-1 ring-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live financial infrastructure
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Build and launch modern fintech experiences—without the heavy lift.
              </h1>
              <p className="text-lg text-slate-200/90">
                FintechOS brings payments, onboarding, and risk controls together so teams can ship
                compliant financial products in days, not months.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="flex items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">
                Start building
                <ArrowRight size={18} />
              </button>
              <button className="rounded-full border border-slate-700 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-slate-500">
                Talk to sales
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm text-slate-200/80">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 blur-3xl">
              <div className="h-full rounded-3xl bg-linear-to-br from-sky-500/40 via-cyan-400/20 to-purple-500/30" />
            </div>
            <div className="relative rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-sky-900/30 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Total volume</p>
                  <p className="text-3xl font-semibold text-white">$8.4M</p>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                  +18% MoM
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-200/80">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-sm font-semibold text-white">$2.1M</p>
                  <p>Card payments</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-sm font-semibold text-white">$4.3M</p>
                  <p>Bank transfers</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-sm font-semibold text-white">$1.9M</p>
                  <p>Payouts</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-linear-to-r from-sky-500/10 via-cyan-500/10 to-purple-500/10 p-4 text-sm text-slate-100">
                “{testimonial.quote}”
                <p className="mt-3 text-xs text-slate-300">
                  — {testimonial.author}, {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-200/80">Platform</p>
              <h2 className="text-3xl font-semibold text-white">Everything you need to build fintech fast</h2>
              <p className="mt-2 text-slate-200/80">
                Ship secure, resilient experiences with pre-built building blocks and API-first design.
              </p>
            </div>
            <button className="hidden items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-white transition hover:border-slate-500 md:inline-flex">
              View docs
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 shadow-xl shadow-sky-950/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200/80">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="journey" className="mt-20 rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-2xl shadow-sky-950/20">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-200/80">Go live faster</p>
              <h2 className="text-3xl font-semibold text-white">A clear path from idea to launch</h2>
              <p className="text-slate-200/80">
                Guided onboarding, sandbox environments, and proactive compliance reviews help your teams ship with confidence.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-100">
              Explore sandbox
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map(({ title, description }, index) => (
              <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/15 text-sm font-semibold text-sky-200">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-200/80">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="mt-20 rounded-3xl bg-linear-to-r from-sky-600 via-cyan-500 to-blue-600 p-px shadow-2xl shadow-sky-900/40">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-slate-950/90 px-8 py-10 lg:flex-row lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white">Ready to launch your next fintech product?</h3>
              <p className="mt-2 max-w-2xl text-slate-200/85">
                Join modern teams shipping payments, banking, and lending experiences with FintechOS.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Create free account
              </button>
              <button className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Schedule demo
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;