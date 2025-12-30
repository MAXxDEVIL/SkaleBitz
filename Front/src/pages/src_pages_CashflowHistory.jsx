import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Calendar, LineChart, Sparkles } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchDealCashflows } from '../services/dealService';
import { formatCurrency, formatDateShort } from '../utils/formatters';
import Container from '../components/layout/Container';

export default function CashflowHistory() {
  const { dealId } = useParams();
  const navigate = useNavigate();
  const [payouts, setPayouts] = useState([]);
  const [totals, setTotals] = useState({ principal: 0, yield: 0 });
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [csvNotice, setCsvNotice] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setError('');
      setLoading(true);
      if (!dealId) {
        setError('No deal selected.');
        setLoading(false);
        return;
      }
      try {
        const data = await fetchDealCashflows(dealId);
        setDeal(data?.deal || null);
        setPayouts(data?.payouts || []);
        setTotals({
          principal: data?.totals?.principal || 0,
          yield: data?.totals?.yield || 0,
        });
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('Failed to load cashflows', err);
        }
        setError('Unable to load cashflow history right now.');
        setPayouts([]);
        setTotals({ principal: 0, yield: 0 });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [dealId]);

  const formattedTotals = useMemo(
    () => ({
      principal: formatCurrency(totals.principal || 0),
      yield: formatCurrency(totals.yield || 0),
    }),
    [totals.principal, totals.yield]
  );

  const backHref = dealId ? `/deals/${dealId}` : '/deals';
  const dealName = deal?.name || 'Deal';

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827]">
      <Container className="flex flex-col gap-8 py-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(backHref)}
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
          >
            <ArrowLeft size={16} />
            Back to deal
          </button>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
              <Sparkles size={18} />
            </div>
            {dealName} · Cashflow History
          </div>
        </div>

        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-[#0F172A]">Cashflows</h1>
          <p className="text-sm text-[#4B5563]">
            Principal and yield calculated from repayment transactions for this deal.
          </p>
        </header>

        {error && (
          <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] p-4 text-sm text-[#B91C1C] shadow-sm shadow-[#FEE2E2]">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">History</p>
              <h2 className="text-xl font-semibold text-[#0F172A]">Payouts</h2>
            </div>
            <LineChart className="text-[#1F6FEB]" size={20} />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">Total principal</p>
              <p className="mt-2 text-lg font-semibold text-[#0F172A]">{formattedTotals.principal}</p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">Total yield</p>
              <p className="mt-2 text-lg font-semibold text-[#0F172A]">{formattedTotals.yield}</p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">Payout count</p>
              <p className="mt-2 text-lg font-semibold text-[#0F172A]">{payouts.length}</p>
            </div>
          </div>

          <div className="mt-4 divide-y divide-[#E5E7EB]">
            {loading && <div className="py-3 text-sm text-[#4B5563]">Loading cashflows...</div>}
            {!loading && payouts.length === 0 && (
              <div className="py-3 text-sm text-[#4B5563]">No repayment transactions recorded yet.</div>
            )}
            {!loading &&
              payouts.map((f) => (
                <div key={f.id || f.cycle} className="grid grid-cols-5 items-center py-3 text-sm">
                  <div className="col-span-2">
                    <p className="font-semibold text-[#0F172A]">{f.cycle}</p>
                    <p className="text-xs text-[#4B5563] inline-flex items-center gap-1">
                      <Calendar size={14} className="text-[#1F6FEB]" />
                      {formatDateShort(f.date)}
                    </p>
                  </div>
                  <p className="text-[#0F172A]">{formatCurrency(f.principal || 0)}</p>
                  <p className="text-[#0F172A]">{formatCurrency(f.yield || 0)}</p>
                  <p
                    className={`text-xs font-semibold ${f.status === 'Settled' ? 'text-[#10B981]' : 'text-[#1F6FEB]'}`}
                  >
                    {f.status || 'Settled'}
                  </p>
                </div>
              ))}
          </div>

          <div className="mt-5 space-y-2">
            <button
              type="button"
              onClick={() => setCsvNotice(true)}
              className="w-full rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
            >
              Export CSV
            </button>
            {csvNotice && (
              <p className="text-xs font-semibold text-[#1F2937]">No CSV available</p>
            )}
          </div>
        </div>

        <Link
          to={backHref}
          className="mx-auto text-center text-sm font-semibold text-[#1F6FEB] hover:underline"
        >
          Return to deal overview
        </Link>
      </Container>
    </div>
  );
}
