import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../services/authService';
import { clearAuthToken, setAuthToken } from '../services/api';

const MSME_ROUTE = '/onboarding/msme';
const DASHBOARD_ROUTE = '/dashboard';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    clearAuthToken();
    try {
      setLoading(true);
      const data = await signin({
        email: form.email.trim(),
        password: form.password,
      });
      setAuthToken(data.token);
      const destination = data.user?.accountType === 'msme' ? MSME_ROUTE : DASHBOARD_ROUTE;
      navigate(destination, { replace: true });
    } catch (err) {
      const apiError = err.response?.data?.error || err.response?.data?.message;
      setError(apiError || 'Unable to sign you in right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827] flex items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 blur-3xl">
          <div className="h-full rounded-3xl bg-linear-to-br from-[#DCEBFF] via-[#E6F7FF] to-[#F4F3FF]" />
        </div>

        <div className="relative grid gap-10 rounded-3xl border border-[#E5E7EB] bg-white p-10 shadow-2xl shadow-[#E0E7FF] lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#1F6FEB]">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
                <Sparkles size={20} />
              </div>
              FintechOS
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Welcome back</p>
              <h1 className="text-3xl font-semibold text-[#0F172A]">Securely access your workspace</h1>
              <p className="text-[#4B5563]">
                Manage payments, onboarding, and risk controls with bank-grade security and real-time visibility.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 text-sm text-[#4B5563]">
              <p className="text-[#0F172A] font-semibold">Need an account?</p>
              <p className="mt-1">
                <Link to="/register" className="text-[#1F6FEB] font-semibold hover:underline">Create one here</Link> to start building compliant fintech flows.
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-[#0F172A]">Work email</span>
                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                  <Mail size={18} className="text-[#1F6FEB]" />
                  <input
                    value={form.email}
                    onChange={handleChange('email')}
                    type="email"
                    placeholder="you@company.com"
                    className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[#0F172A]">Password</span>
                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                  <Lock size={18} className="text-[#1F6FEB]" />
                  <input
                    value={form.password}
                    onChange={handleChange('password')}
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="text-[#4B5563] hover:text-[#1F6FEB]"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between text-sm text-[#4B5563]">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-[#CBD5E1] text-[#1F6FEB] focus:ring-[#1F6FEB]" />
                  <span>Remember me</span>
                </label>
                <Link to="/reset" className="text-[#1F6FEB] font-semibold hover:underline">Forgot password?</Link>
              </div>

              {error && <p className="text-sm font-semibold text-[#DC2626]">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1F6FEB] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1F6FEB33] transition hover:bg-[#195cc7] disabled:cursor-not-allowed disabled:opacity-80"
              >
              {loading ? 'Signing in...' : 'Sign in'}
              <ArrowRight size={18} />
            </button>

            <p className="text-center text-sm text-[#4B5563]">
              New to FintechOS?{' '}
              <Link to="/register" className="text-[#1F6FEB] font-semibold hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}