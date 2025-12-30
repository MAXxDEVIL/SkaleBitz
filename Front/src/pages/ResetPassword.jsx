import { ArrowLeft, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] flex items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-3xl">
        <div className="absolute inset-0 blur-3xl">
          <div className="h-full rounded-3xl bg-linear-to-br from-[#DCEBFF] via-[#E6F7FF] to-[#F4F3FF]" />
        </div>

        <div className="relative rounded-3xl border border-[#E5E7EB] bg-white p-10 shadow-2xl shadow-[#E0E7FF] space-y-6">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#1F6FEB]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
              <Sparkles size={20} />
            </div>
            FintechOS · Reset password
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-[#0F172A]">Send reset link</h1>
            <p className="text-[#4B5563]">
              Enter the email you use for FintechOS. We’ll email a secure reset link.
            </p>
          </div>

          <form className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-[#0F172A]">Work email</span>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                <Mail size={18} className="text-[#1F6FEB]" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                />
              </div>
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1F6FEB] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1F6FEB33] transition hover:bg-[#195cc7]"
            >
              Send link
              <ShieldCheck size={18} />
            </button>
          </form>

          <div className="flex flex-wrap gap-3 text-sm text-[#4B5563]">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
            >
              <ArrowLeft size={16} />
              Back to login
            </Link>
            <Link to="/support" className="font-semibold text-[#1F6FEB] hover:underline">
              Need more help?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}