import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe2,
  MapPin,
  ShieldCheck,
  Sparkles,
  User,
  Building2,
  Phone,
  Mail,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { id: 1, title: 'Business profile' },
  { id: 2, title: 'Documents' },
  { id: 3, title: 'Review & submit' },
];

export default function MSMEWizard() {
  const [activeStep, setActiveStep] = useState(1);

  const next = () => setActiveStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setActiveStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        {/* Header */}
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
              FintechOS · MSME Wizard
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#4B5563] border border-[#E5E7EB]">
            <ShieldCheck size={14} className="text-[#10B981]" />
            Compliance-ready onboarding
          </div>
        </div>

        {/* Stepper */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-md shadow-[#E0E7FF]">
          <div className="grid grid-cols-3 gap-3">
            {steps.map((step, idx) => {
              const done = activeStep > step.id;
              const current = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                    current
                      ? 'border-[#1F6FEB] bg-[#E6F0FF]'
                      : 'border-[#E5E7EB] bg-[#F8FAFC]'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                      done
                        ? 'bg-[#10B981] text-white'
                        : current
                        ? 'bg-white text-[#1F6FEB] border border-[#1F6FEB]'
                        : 'bg-white text-[#4B5563] border border-[#E5E7EB]'
                    }`}
                  >
                    {done ? <CheckCircle2 size={18} /> : step.id}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#0EA5E9]">Step {step.id}</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{step.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
          {activeStep === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Profile</p>
                <h2 className="text-2xl font-semibold text-[#0F172A]">Business profile</h2>
                <p className="text-sm text-[#4B5563] mt-1">
                  Provide basic business details for KYB and underwriting.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">Legal business name</span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Building2 size={18} className="text-[#1F6FEB]" />
                    <input
                      type="text"
                      placeholder="BrightMart Supplies Pte Ltd"
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">Registered address</span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <MapPin size={18} className="text-[#1F6FEB]" />
                    <input
                      type="text"
                      placeholder="123 Orchard Rd, Singapore"
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">Contact person</span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <User size={18} className="text-[#1F6FEB]" />
                    <input
                      type="text"
                      placeholder="Alex Tan"
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">Work email</span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Mail size={18} className="text-[#1F6FEB]" />
                    <input
                      type="email"
                      placeholder="ops@brightmart.com"
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">Phone</span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Phone size={18} className="text-[#1F6FEB]" />
                    <input
                      type="tel"
                      placeholder="+65 5555 1234"
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">Website</span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Globe2 size={18} className="text-[#1F6FEB]" />
                    <input
                      type="url"
                      placeholder="https://brightmart.com"
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Documents</p>
                <h2 className="text-2xl font-semibold text-[#0F172A]">Upload KYB & financials</h2>
                <p className="text-sm text-[#4B5563] mt-1">
                  Provide registration docs, IDs, and recent financial statements.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {['Certificate of incorporation', 'Latest bank statements', 'Director ID (front/back)', 'Address proof'].map(
                  (doc) => (
                    <div
                      key={doc}
                      className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">{doc}</p>
                        <p className="text-xs text-[#4B5563]">PDF or image, max 10MB</p>
                      </div>
                      <button className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
                        Upload
                      </button>
                    </div>
                  )
                )}
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm shadow-[#E0E7FF]">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
                  <FileText size={16} />
                  Tips for faster review
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
                  <li>• Ensure names match your legal registration.</li>
                  <li>• Provide recent (≤3 months) bank statements.</li>
                  <li>• Make sure IDs are clear and unobstructed.</li>
                </ul>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Review</p>
                <h2 className="text-2xl font-semibold text-[#0F172A]">Confirm and submit</h2>
                <p className="text-sm text-[#4B5563] mt-1">
                  Double-check your details and documents before submitting for verification.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                <p className="text-sm font-semibold text-[#0F172A]">Summary</p>
                <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
                  <li>• Business: BrightMart Supplies Pte Ltd</li>
                  <li>• Contact: Alex Tan · ops@brightmart.com</li>
                  <li>• Location: Singapore</li>
                  <li>• Docs: Incorporation, bank statements, director ID, address proof</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm shadow-[#E0E7FF]">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#10B981]">
                  <CheckCircle2 size={16} />
                  Verification checklist
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
                  <li>• Names and registration numbers aligned</li>
                  <li>• Address and director identity verified</li>
                  <li>• Financials attached</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[#4B5563]">
            Step {activeStep} of {steps.length}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={prev}
              disabled={activeStep === 1}
              className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Back
            </button>
            {activeStep < steps.length ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1F6FEB33] transition hover:bg-[#195cc7]"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827]">
                Submit for review
                <ShieldCheck size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}