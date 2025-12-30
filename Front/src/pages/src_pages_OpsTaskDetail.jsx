import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Tag,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/layout/Container";

export default function OpsTaskDetail() {
  // Replace with router params and real data
  const task = {
    id: "Q-1026",
    title: "Payout: BrightMart Supplies",
    type: "Payouts",
    owner: "J. Patel",
    status: "Pending approval",
    eta: "5m",
    amount: "$48,200",
    notes: "Verify beneficiary and settlement account before approval.",
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827]">
      <Container className="flex flex-col gap-8 py-10">
        <div className="flex items-center gap-3">
          <Link
            to="/ops"
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
          >
            <ArrowLeft size={16} />
            Back to queue
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#4B5563] border border-[#E5E7EB]">
            <Tag size={14} className="text-[#1F6FEB]" />
            {task.type}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md shadow-[#E0E7FF]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
                {task.id}
              </p>
              <h1 className="text-2xl font-semibold text-[#0F172A]">
                {task.title}
              </h1>
              <p className="text-sm text-[#4B5563] mt-1">{task.notes}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#4B5563]">
                <span className="inline-flex items-center gap-1">
                  <User size={14} className="text-[#1F6FEB]" />
                  Owner: {task.owner}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} className="text-[#1F6FEB]" />
                  ETA: {task.eta}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF3C7] px-2 py-1 font-semibold text-[#B45309]">
                  {task.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[#4B5563]">Amount</p>
              <p className="text-2xl font-semibold text-[#0F172A]">
                {task.amount}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 text-sm text-[#4B5563]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">
                Checks
              </p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#10B981]" />
                  Sanction screen: Passed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#10B981]" />
                  Balance check: OK
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#10B981]" />
                  Beneficiary match: Verified
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 text-sm text-[#4B5563]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0EA5E9]">
                Guardrails
              </p>
              <ul className="mt-2 space-y-2">
                <li>• Dual approval over $25k</li>
                <li>• Ops notes required before release</li>
                <li>• Auto-log to audit trail</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]">
              Add note
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1F6FEB33] transition hover:bg-[#195cc7]">
              Approve
              <ShieldCheck size={16} />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-semibold text-[#B91C1C] transition hover:border-[#FECACA]">
              Reject
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
