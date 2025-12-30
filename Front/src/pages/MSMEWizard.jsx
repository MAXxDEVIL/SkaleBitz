import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe2,
  MapPin,
  LineChart,
  Banknote,
  ShieldCheck,
  Sparkles,
  User,
  Building2,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { submitMsmeDeal } from "../services/dealService";
import Container from "../components/layout/Container";

const steps = [
  { id: 1, title: "Business profile" },
  { id: 2, title: "Financial info" },
  { id: 3, title: "Documents" },
  { id: 4, title: "Review & submit" },
];

const FINANCIAL_FIELDS = [
  "revenue",
  "expenses",
  "burn_rate",
  "cash",
  "customers",
  "churn_rate",
  "acquisition_cost",
  "lifetime_value",
];

const FINANCIAL_FIELD_LABELS = {
  revenue: "revenue",
  expenses: "expenses",
  burn_rate: "burn rate",
  cash: "cash",
  customers: "customers",
  churn_rate: "churn rate",
  acquisition_cost: "acquisition cost",
  lifetime_value: "lifetime value",
};

export default function MSMEWizard() {
  const [activeStep, setActiveStep] = useState(1);
  const { user, updateUser, refreshUser } = useAuth();
  const [form, setForm] = useState({
    businessName: "",
    registeredAddress: "",
    contactName: "",
    contactEmail: user?.email || "",
    contactPhone: "",
    website: "https://",
    country: "",
    repaymentCadence: "Monthly",
    targetYield: "",
    tenorMonths: "",
    facilitySize: "",
    revenue: "",
    expenses: "",
    burn_rate: "",
    cash: "",
    customers: "",
    churn_rate: "",
    acquisition_cost: "",
    lifetime_value: "",
    doc1: "",
    doc2: "",
    doc3DirectorId: "",
    doc3AddressProof: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasExistingDeal, setHasExistingDeal] = useState(Boolean(user?.dealId));
  const docFields = [
    {
      label: "Certificate of incorporation",
      field: "doc1",
      placeholder: "Upload reference or URL (doc1)",
      saveAs: "doc1",
    },
    {
      label: "Latest bank statements",
      field: "doc2",
      placeholder: "Upload reference or URL (doc2)",
      saveAs: "doc2",
    },
    {
      label: "Director ID (front/back)",
      field: "doc3DirectorId",
      placeholder: "Upload reference or URL (doc3)",
      saveAs: "doc3 (director ID)",
    },
    {
      label: "Address proof",
      field: "doc3AddressProof",
      placeholder: "Upload reference or URL (doc3)",
      saveAs: "doc3 (address proof)",
    },
  ];
  const docSummary =
    [
      form.doc1 && "Incorporation",
      form.doc2 && "Bank statements",
      form.doc3DirectorId && "Director ID",
      form.doc3AddressProof && "Address proof",
    ]
      .filter(Boolean)
      .join(", ") || "Docs pending";
  const locationSummary =
    form.country || form.registeredAddress || "Not provided";
  const contactSummary = [form.contactName, form.contactEmail]
    .filter(Boolean)
    .join(" · ");

  useEffect(() => {
    setHasExistingDeal(Boolean(user?.dealId));
  }, [user?.dealId]);

  const next = () => setActiveStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setActiveStep((s) => Math.max(s - 1, 1));

  const isStep2Valid = () => {
    return FINANCIAL_FIELDS.every((field) => {
      const value = Number(form[field]);
      return form[field] !== "" && Number.isFinite(value) && value >= 0;
    });
  };

  const isNextDisabled = activeStep === 2 && !isStep2Valid();

  const updateField = (field) => (e) => {
    const value = e.target.value;
    setSubmitSuccess(false);
    setSubmitError("");
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    if (hasExistingDeal) {
      setSubmitSuccess(false);
      setSubmitError(
        "You already listed a deal. Please manage it from your dashboard."
      );
      return;
    }
    const yieldValue = Number(form.targetYield);
    const tenorValue = Number(form.tenorMonths);
    const facilityValue = Number(form.facilitySize);
    if (!Number.isFinite(yieldValue) || yieldValue <= 0) {
      setSubmitSuccess(false);
      setSubmitError("Please enter your target yield (percentage).");
      return;
    }
    if (!Number.isFinite(tenorValue) || tenorValue <= 0) {
      setSubmitSuccess(false);
      setSubmitError("Please enter tenor in months (positive number).");
      return;
    }
    if (!Number.isFinite(facilityValue) || facilityValue <= 0) {
      setSubmitSuccess(false);
      setSubmitError("Please enter your facility size.");
      return;
    }
    // Validate financial fields
    const financialFields = FINANCIAL_FIELDS.reduce((acc, field) => {
      acc[field] = Number(form[field]);
      return acc;
    }, {});
    for (const [fieldName, value] of Object.entries(financialFields)) {
      if (!Number.isFinite(value) || value < 0) {
        setSubmitSuccess(false);
        setSubmitError(
          `Please enter a valid ${FINANCIAL_FIELD_LABELS[fieldName]} (must be ≥ 0).`
        );
        return;
      }
    }
    setSubmitError("");
    setSubmitting(true);
    try {
      const createdDeal = await submitMsmeDeal({
        businessName: form.businessName,
        registeredAddress: form.registeredAddress,
        contactName: form.contactName,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        website: form.website,
        country: form.country,
        repaymentCadence: form.repaymentCadence,
        targetYield: yieldValue,
        tenorMonths: tenorValue,
        facilitySize: facilityValue,
        ...financialFields,
        doc1: form.doc1,
        doc2: form.doc2,
        doc3DirectorId: form.doc3DirectorId,
        doc3AddressProof: form.doc3AddressProof,
      });
      setSubmitSuccess(true);
      setHasExistingDeal(true);
      if (createdDeal?._id && user) {
        try {
          await refreshUser();
        } catch (refreshErr) {
          updateUser({ ...user, dealId: createdDeal._id });
          setSubmitError(
            "Deal created, but we could not refresh your profile. Please reload this page or open your dashboard to refresh."
          );
          if (import.meta.env.DEV) {
            console.warn(
              "Failed to refresh user after submitting deal",
              refreshErr
            );
          }
        }
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Submit for review failed", error);
      }
      setSubmitError("Unable to submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#111827]">
      <Container className="flex flex-col gap-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/msme/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1]"
            >
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
                <Sparkles size={18} />
              </div>
              SkaleBitz · MSME Wizard
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#4B5563] border border-[#E5E7EB]">
            <ShieldCheck size={14} className="text-[#10B981]" />
            Compliance-ready onboarding
          </div>
        </div>

        {hasExistingDeal && (
          <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF3] p-4 text-sm text-[#065F46] shadow-sm shadow-[#D1FAE5]">
            You already submitted a deal for review. You can view it from your{" "}
            <Link
              to="/msme/dashboard"
              className="font-semibold text-[#0F172A] underline"
            >
              dashboard
            </Link>
            .
          </div>
        )}

        {/* Stepper */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-md shadow-[#E0E7FF]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {steps.map((step) => {
              const done = activeStep > step.id;
              const current = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                    current
                      ? "border-[#1F6FEB] bg-[#E6F0FF]"
                      : "border-[#E5E7EB] bg-[#F8FAFC]"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                      done
                        ? "bg-[#10B981] text-white"
                        : current
                        ? "bg-white text-[#1F6FEB] border border-[#1F6FEB]"
                        : "bg-white text-[#4B5563] border border-[#E5E7EB]"
                    }`}
                  >
                    {done ? <CheckCircle2 size={18} /> : step.id}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#0EA5E9]">
                      Step {step.id}
                    </p>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      {step.title}
                    </p>
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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
                  Profile
                </p>
                <h2 className="text-2xl font-semibold text-[#0F172A]">
                  Business profile
                </h2>
                <p className="text-sm text-[#4B5563] mt-1">
                  Provide basic business details for KYB and underwriting.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Legal business name
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Building2 size={18} className="text-[#1F6FEB]" />
                    <input
                      type="text"
                      placeholder="BrightMart Supplies Pte Ltd"
                      value={form.businessName}
                      onChange={updateField("businessName")}
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Registered address
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <MapPin size={18} className="text-[#1F6FEB]" />
                    <input
                      type="text"
                      placeholder="123 Orchard Rd, Singapore"
                      value={form.registeredAddress}
                      onChange={updateField("registeredAddress")}
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Contact person
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <User size={18} className="text-[#1F6FEB]" />
                    <input
                      type="text"
                      placeholder="Alex Tan"
                      value={form.contactName}
                      onChange={updateField("contactName")}
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Work email
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Mail size={18} className="text-[#1F6FEB]" />
                    <input
                      type="email"
                      placeholder="ops@brightmart.com"
                      value={form.contactEmail}
                      onChange={updateField("contactEmail")}
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Phone
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Phone size={18} className="text-[#1F6FEB]" />
                    <input
                      type="tel"
                      placeholder="+65 5555 1234"
                      value={form.contactPhone}
                      onChange={updateField("contactPhone")}
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Website
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Globe2 size={18} className="text-[#1F6FEB]" />
                    <input
                      type="url"
                      placeholder="https://brightmart.com"
                      value={form.website}
                      onChange={updateField("website")}
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Country
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Globe2 size={18} className="text-[#1F6FEB]" />
                    <input
                      type="text"
                      placeholder="Singapore"
                      value={form.country}
                      onChange={updateField("country")}
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Repayment cadence
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Calendar size={18} className="text-[#1F6FEB]" />
                    <select
                      className="w-full bg-transparent text-sm text-[#111827] focus:outline-none"
                      value={form.repaymentCadence}
                      onChange={updateField("repaymentCadence")}
                    >
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Semi-annual</option>
                      <option>Annual</option>
                    </select>
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Target yield (%)
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <LineChart size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="12.0"
                      value={form.targetYield}
                      onChange={updateField("targetYield")}
                      required
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Tenor (months)
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Calendar size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="6"
                      value={form.tenorMonths}
                      onChange={updateField("tenorMonths")}
                      required
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Facility size
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Banknote size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="10000"
                      value={form.facilitySize}
                      onChange={updateField("facilitySize")}
                      required
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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
                  Financials
                </p>
                <h2 className="text-2xl font-semibold text-[#0F172A]">
                  Financial info
                </h2>
                <p className="text-sm text-[#4B5563] mt-1">
                  Provide key financial metrics for underwriting assessment.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Revenue *
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Banknote size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="50000"
                      value={form.revenue}
                      onChange={updateField("revenue")}
                      required
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Expenses *
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Banknote size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="30000"
                      value={form.expenses}
                      onChange={updateField("expenses")}
                      required
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Burn rate *
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <LineChart size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="5000"
                      value={form.burn_rate}
                      onChange={updateField("burn_rate")}
                      required
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Cash *
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Banknote size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="20000"
                      value={form.cash}
                      onChange={updateField("cash")}
                      required
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Customers *
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <User size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="100"
                      value={form.customers}
                      onChange={updateField("customers")}
                      required
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Churn rate *
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <LineChart size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="5.5"
                      value={form.churn_rate}
                      onChange={updateField("churn_rate")}
                      required
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Acquisition cost *
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Banknote size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="200"
                      value={form.acquisition_cost}
                      onChange={updateField("acquisition_cost")}
                      required
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Lifetime value *
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-[#1F6FEB] focus-within:ring-2 focus-within:ring-[#1F6FEB33]">
                    <Banknote size={18} className="text-[#1F6FEB]" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="1000"
                      value={form.lifetime_value}
                      onChange={updateField("lifetime_value")}
                      required
                      className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />
                  </div>
                </label>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm shadow-[#E0E7FF]">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1F6FEB]">
                  <LineChart size={16} />
                  Financial metrics guide
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
                  <li>• All fields are required and must be ≥ 0.</li>
                  <li>
                    • Revenue & expenses: Enter monthly or annual amounts in
                    your local currency.
                  </li>
                  <li>• Burn rate: Monthly cash consumption rate.</li>
                  <li>
                    • Churn rate: Customer attrition percentage (e.g., 5.5 for
                    5.5%).
                  </li>
                  <li>
                    • Acquisition cost & lifetime value: Per-customer amounts.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
                  Documents
                </p>
                <h2 className="text-2xl font-semibold text-[#0F172A]">
                  Upload KYB & financials
                </h2>
                <p className="text-sm text-[#4B5563] mt-1">
                  Provide registration docs, IDs, and recent financial
                  statements.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {docFields.map((doc) => (
                  <div
                    key={doc.field}
                    className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">
                          {doc.label}
                        </p>
                        <p className="text-xs text-[#4B5563]">
                          PDF or image, max 10MB · Save as {doc.saveAs}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#1F2937] border border-[#E5E7EB]">
                        {doc.saveAs}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={form[doc.field]}
                      onChange={updateField(doc.field)}
                      placeholder={doc.placeholder}
                      className="w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1F6FEB] focus:ring-2 focus:ring-[#1F6FEB33]"
                    />
                  </div>
                ))}
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

          {activeStep === 4 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
                  Review
                </p>
                <h2 className="text-2xl font-semibold text-[#0F172A]">
                  Confirm and submit
                </h2>
                <p className="text-sm text-[#4B5563] mt-1">
                  Double-check your details and documents before submitting for
                  verification.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                <p className="text-sm font-semibold text-[#0F172A]">Summary</p>
                <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
                  <li>• Business: {form.businessName || "Not provided"}</li>
                  <li>• Contact: {contactSummary || "Not provided"}</li>
                  <li>• Location: {locationSummary}</li>
                  <li>
                    • Target yield:{" "}
                    {form.targetYield ? `${form.targetYield}%` : "Not provided"}
                  </li>
                  <li>
                    • Tenor:{" "}
                    {form.tenorMonths
                      ? `${form.tenorMonths} months`
                      : "Not provided"}
                  </li>
                  <li>
                    • Facility size: {form.facilitySize || "Not provided"}
                  </li>
                  <li>• Revenue: {form.revenue || "Not provided"}</li>
                  <li>• Expenses: {form.expenses || "Not provided"}</li>
                  <li>• Burn rate: {form.burn_rate || "Not provided"}</li>
                  <li>• Cash: {form.cash || "Not provided"}</li>
                  <li>• Customers: {form.customers || "Not provided"}</li>
                  <li>• Churn rate: {form.churn_rate || "Not provided"}</li>
                  <li>
                    • Acquisition cost:{" "}
                    {form.acquisition_cost || "Not provided"}
                  </li>
                  <li>
                    • Lifetime value: {form.lifetime_value || "Not provided"}
                  </li>
                  <li>• Docs: {docSummary}</li>
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
              {submitError && (
                <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] p-3 text-sm text-[#B91C1C] shadow-sm shadow-[#FEE2E2]">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF3] p-3 text-sm text-[#065F46] shadow-sm shadow-[#D1FAE5]">
                  Documents submitted and verified instantly. Your deal is now
                  visible to investors.
                </div>
              )}
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
                disabled={isNextDisabled}
                className="inline-flex items-center gap-2 rounded-full bg-[#1F6FEB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1F6FEB33] transition hover:bg-[#195cc7] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting || hasExistingDeal}
                className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {hasExistingDeal
                  ? "Deal already submitted"
                  : submitting
                  ? "Submitting..."
                  : "Submit for review"}
                <ShieldCheck size={16} />
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
