import { useEffect, useState } from 'react';
import { Clock, ListTree, Sparkles } from 'lucide-react';
import { fetchInvestorLogs } from '../services/statsService';
import { formatCurrency, formatDateShort } from '../utils/formatters';
import useAuth from '../hooks/useAuth';
import Container from '../components/layout/Container';

export default function Logs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setError('');
      setLoading(true);
      if (!user?.id) {
        setLogs([]);
        setLoading(false);
        return;
      }
      try {
        const data = await fetchInvestorLogs();
        setLogs(data || []);
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('Failed to load activity logs', err);
        }
        setError('Unable to load activity right now.');
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.id]);

  const formatTitle = (log) => {
    if (log.type === 'repayment') return 'Payout processed';
    if (log.type === 'refund') return 'Allocation refunded';
    return 'Allocation placed';
  };

  const formatDetail = (log) => `${log.dealName || 'Deal'} · ${formatCurrency(log.amount || 0)}`;

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827]">
      <Container className="flex flex-col gap-8 py-10">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
              <Sparkles size={18} />
            </div>
            {user?.name || 'Investor'} · Activity Logs
          </div>
          <h1 className="text-3xl font-semibold text-[#0F172A]">Logs & Events</h1>
          <p className="text-sm text-[#4B5563]">Live stream of your transactions across all deals.</p>
        </header>

        {error && (
          <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] p-4 text-sm text-[#B91C1C] shadow-sm shadow-[#FEE2E2]">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Timeline</p>
              <h2 className="text-xl font-semibold text-[#0F172A]">Recent activity</h2>
            </div>
            <ListTree className="text-[#1F6FEB]" size={20} />
          </div>

          <div className="mt-4 space-y-3">
            {loading && (
              <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-sm text-[#4B5563]">
                Loading activity...
              </div>
            )}
            {!loading && logs.length === 0 && (
              <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-sm text-[#4B5563]">
                No transactions found for your account yet.
              </div>
            )}
            {!loading &&
              logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{formatTitle(log)}</p>
                    <p className="text-xs text-[#4B5563]">{formatDetail(log)}</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 text-xs text-[#0EA5E9]">
                      <Clock size={14} />
                      {formatDateShort(log.createdAt)}
                    </div>
                    <p className="text-xs font-semibold text-[#4B5563]">
                      {log.direction === 'outgoing' ? 'Debit' : 'Credit'}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
