"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  ClipboardCheck,
  Info,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { scrollToElement, useScrollReveal } from "@/hooks/use-lumina";
import MagneticWrap from "@/components/lumina/MagneticWrap";
import { useI18n } from "@/i18n/context";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Toast {
  id: number;
  message: string;
  type: "error" | "success";
  exiting?: boolean;
}

const SERVICE_KEYS = [
  "booking.svc_implants",
  "booking.svc_veneers",
  "booking.svc_whitening",
  "booking.svc_rootcanal",
  "booking.svc_ortho",
  "booking.svc_makeover",
  "booking.svc_pediatric",
  "booking.svc_checkup",
  "booking.svc_other",
] as const;

const TIME_SLOTS_EN = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "4:00 PM",
] as const;

const TIME_SLOTS_24H = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "16:00",
] as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function phoneDigits(raw: string): string {
  return raw.replace(/\D/g, "");
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

let toastId = 0;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Booking() {
  const sectionRef = useScrollReveal();
  const { t, locale, dir } = useI18n();

  /* ---- translated services ---- */
  const bookingServices = SERVICE_KEYS.map((key) => ({
    key,
    label: t(key),
  }));

  /* ---- localized date formatter ---- */
  const formatDateNice = (iso: string): string => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(
      locale === "fa" ? "fa-IR" : locale === "ar" ? "ar-SA" : "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  /* ---- state ---- */
  const [currentStep, setCurrentStep] = useState(1);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [toasts, setToasts] = useState<Toast[]>([]);

  /* ---- toast helpers ---- */
  const addToast = useCallback(
    (message: string, type: "error" | "success") => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
        );
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 300);
      }, 4000);
    },
    []
  );

  /* ---- validation ---- */
  const validateStep1 = (): boolean => {
    let valid = true;
    if (fullName.trim().length < 2) {
      setNameError(t("booking.err_name"));
      valid = false;
    } else {
      setNameError("");
    }
    if (phoneDigits(phone).length < 7) {
      setPhoneError(t("booking.err_phone"));
      valid = false;
    } else {
      setPhoneError("");
    }
    if (!service) {
      setServiceError(t("booking.err_service"));
      valid = false;
    } else {
      setServiceError("");
    }
    return valid;
  };

  const validateStep2 = (): boolean => {
    let valid = true;
    if (!date) {
      setDateError(t("booking.err_date"));
      valid = false;
    } else {
      setDateError("");
    }
    if (!selectedTime) {
      setTimeError(t("booking.err_time"));
      valid = false;
    } else {
      setTimeError("");
    }
    return valid;
  };

  /* ---- navigation ---- */
  const goNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      addToast(t("booking.err_required"), "error");
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      addToast(t("booking.err_required"), "error");
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  /* ---- submit ---- */
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast(t("booking.toast_success"), "success");
    }, 2000);
  };

  /* ---- phone change ---- */
  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setPhone(formatPhone(digits));
  };

  /* ---- scroll on step change (skip initial mount) ---- */
  const stepChangeInit = useRef(false);
  useEffect(() => {
    if (!stepChangeInit.current) {
      stepChangeInit.current = true;
      return;
    }
    scrollToElement("#booking");
  }, [currentStep]);

  /* ---- derived ---- */
  const firstName = fullName.trim().split(" ")[0] || "there";

  /* ---- progress bar step colors (universal gold) ---- */
  const dotClass = (step: number) => {
    const inactiveBg = "bg-[#C5A059]/10 text-[#C5A059]/40";
    const activeClasses = "w-9 h-9 rounded-full bg-[#C5A059] text-[#1E1E1E] flex items-center justify-center text-xs font-bold shadow-md shadow-[#C5A059]/30 transition-all duration-500";
    
    if (step < currentStep) return activeClasses;
    if (step === currentStep) return activeClasses;
    return `w-9 h-9 rounded-full ${inactiveBg} flex items-center justify-center text-xs font-bold transition-all duration-500`;
  };
  const labelClass = (step: number) =>
    step <= currentStep
      ? "text-[11px] font-semibold text-[#C5A059] hidden sm:block"
      : "text-[11px] font-medium text-[#C5A059]/30 hidden sm:block";
  const lineClass = (step: number) =>
    step < currentStep
      ? "w-16 sm:w-24 h-[2px] bg-[#C5A059] mx-2 transition-colors duration-500"
      : "w-16 sm:w-24 h-[2px] bg-[#C5A059]/15 mx-2 transition-colors duration-500";

  /* Universal luxury solid gold CTA button classes */
  const ctaBtnClass = "btn-cta inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#C5A059] text-[#1E1E1E] hover:bg-[#D4AF37] hover:text-[#1E1E1E] font-bold text-[14px] shadow-lg shadow-[#C5A059]/40 hover:shadow-[#C5A059]/55";

  const ctaBtnLargeClass = "btn-cta inline-flex items-center gap-2.5 px-10 py-4.5 rounded-2xl bg-[#C5A059] text-[#1E1E1E] hover:bg-[#D4AF37] hover:text-[#1E1E1E] font-bold text-[15px] shadow-xl shadow-[#C5A059]/40 hover:shadow-[#C5A059]/55 disabled:opacity-70";

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */
  return (
    <section
      id="booking"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FAFAF7 0%, #F7F3EC 50%, #F5F0E8 100%)" }}
    >
      {/* Background blur blobs */}
      <div className="absolute top-[-20%] start-[-10%] w-[600px] h-[600px] bg-[#C5A059] rounded-full filter blur-[140px] opacity-[0.06]" />
      <div className="absolute bottom-[-20%] end-[-10%] w-[600px] h-[600px] bg-[#D4AF37] rounded-full filter blur-[140px] opacity-[0.05]" />

      {/* ---- Toast container ---- */}
      <div className="fixed top-24 end-4 z-[60] space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium max-w-sm ${
              toast.exiting ? "toast-exit" : "toast"
            } ${
              toast.type === "error"
                ? "bg-rose-500 text-white"
                : "bg-emerald-500 text-white"
            }`}
          >
            {toast.type === "error" ? (
              <Info className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ---- Heading ---- */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <span className="reveal inline-flex items-center gap-2.5 font-semibold text-[12px] mb-5 text-[#C5A059]">
            <span className="w-8 h-[2px] bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-full" />
            {t("booking.label")}
            <span className="w-8 h-[2px] bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-full" />
          </span>
          <h2
            className="reveal d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] mb-5"
            style={{ color: "#1E1E1E" }}
          >
            {t("booking.heading_l1")}
            <br />
            <span className="text-[#C5A059]">{t("booking.heading_l2")}</span>
          </h2>
          <p className="reveal d2 text-lg leading-[1.8] text-[#1E1E1E]/40">
            {t("booking.subtitle")}
          </p>
        </div>

        {/* ---- Booking Card ---- */}
        <div className="max-w-3xl mx-auto">
          <div className="reveal-scale booking-card">
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10"
              style={{ boxShadow: "0 12px 48px rgba(197,160,89,0.08), 0 4px 16px rgba(197,160,89,0.04)" }}
            >
              {/* ============ Progress Bar ============ */}
              {!isSubmitted && (
                <div
                  className="flex items-center justify-center mb-10"
                  id="progressBar"
                >
                  {([1, 2, 3] as const).map((step, idx) => {
                    const stepLabels = [
                      t("booking.step_details"),
                      t("booking.step_schedule"),
                      t("booking.step_confirm"),
                    ];
                    return (
                      <div key={step} className="flex items-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className={dotClass(step)}>
                            {step < currentStep ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              step
                            )}
                          </div>
                          <span className={labelClass(step)}>
                            {stepLabels[idx]}
                          </span>
                        </div>
                        {idx < 2 && <div className={lineClass(step)} />}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ============ STEP 1: Details ============ */}
              {currentStep === 1 && !isSubmitted && (
                <div className="step-panel space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <div className="float-group">
                        <User className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10 pointer-events-none text-[#C5A059]/40" />
                        <input
                          type="text"
                          className="form-input w-full ps-11 pe-4 py-4 rounded-xl text-gray-900 text-sm"
                          placeholder=" "
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (nameError) setNameError("");
                          }}
                        />
                        <label>{t("booking.lbl_name")}</label>
                      </div>
                      {nameError && (
                        <p className="text-[11px] text-rose-500 mt-1 ps-1">
                          {nameError}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="float-group">
                        <Phone className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10 pointer-events-none text-[#C5A059]/40" />
                        <input
                          type="tel"
                          className="form-input w-full ps-11 pe-4 py-4 rounded-xl text-gray-900 text-sm"
                          placeholder=" "
                          value={phone}
                          onChange={(e) => {
                            handlePhoneChange(e.target.value);
                            if (phoneError) setPhoneError("");
                          }}
                        />
                        <label>{t("booking.lbl_phone")}</label>
                      </div>
                      {phoneError && (
                        <p className="text-[11px] text-rose-500 mt-1 ps-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="float-group">
                    <Mail className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10 pointer-events-none text-[#C5A059]/40" />
                    <input
                      type="email"
                      className="form-input w-full ps-11 pe-4 py-4 rounded-xl text-gray-900 text-sm"
                      placeholder=" "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>{t("booking.lbl_email")}</label>
                  </div>

                  {/* Service */}
                  <div>
                    <div className="float-group relative">
                      <ClipboardCheck className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10 pointer-events-none text-[#C5A059]/40" />
                      <select
                        className="form-input w-full ps-11 pe-10 py-4 rounded-xl text-gray-900 text-sm appearance-none cursor-pointer"
                        value={service}
                        onChange={(e) => {
                          setService(e.target.value);
                          if (serviceError) setServiceError("");
                        }}
                      >
                        <option value="" disabled>
                          {t("booking.select_service")}
                        </option>
                        {bookingServices.map((svc) => (
                          <option key={svc.key} value={svc.key}>
                            {svc.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 w-3 h-3 text-[#C5A059]/40 pointer-events-none" />
                      <label>{t("booking.lbl_service")}</label>
                    </div>
                    {serviceError && (
                      <p className="text-[11px] text-rose-500 mt-1 ps-1">
                        {serviceError}
                      </p>
                    )}
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-end pt-3">
                    <MagneticWrap>
                      <button
                        onClick={goNext}
                        className={ctaBtnClass}
                      >
                        {t("booking.btn_next")}{" "}
                        <ArrowRight className="w-3 h-3 rtl:-scale-x-100" />
                      </button>
                    </MagneticWrap>
                  </div>
                </div>
              )}

              {/* ============ STEP 2: Schedule ============ */}
              {currentStep === 2 && !isSubmitted && (
                <div className="step-panel space-y-5">
                  {/* Date */}
                  <div>
                    <div className="float-group">
                      <Calendar className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10 pointer-events-none text-[#C5A059]/40" />
                      <input
                        type="date"
                        className="form-input w-full ps-11 pe-4 py-4 rounded-xl text-gray-900 text-sm"
                        min={todayISO()}
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                          if (dateError) setDateError("");
                        }}
                      />
                      <label
                        style={{
                          top: "-1px",
                          insetInlineStart: "12px",
                          transform: "none",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#C5A059",
                          background: "white",
                        }}
                      >
                        {t("booking.lbl_date")}
                      </label>
                    </div>
                    {dateError && (
                      <p className="text-[11px] text-rose-500 mt-1 ps-1">
                        {dateError}
                      </p>
                    )}
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-[12px] font-bold text-[#1E1E1E]/55 mb-3">
                      {t("booking.lbl_time")}
                    </label>
                    {timeError && (
                      <p className="text-[11px] text-rose-500 mb-1.5">
                        {timeError}
                      </p>
                    )}
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5" dir="ltr">
                      {(locale === "en" ? TIME_SLOTS_EN : TIME_SLOTS_24H).map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className={`time-slot px-3 py-3 rounded-xl border-2 border-[#C5A059]/20 text-sm font-medium text-[#C5A059]/60 text-center ${
                            selectedTime === slot ? "selected" : ""
                          }`}
                          onClick={() => {
                            setSelectedTime(slot);
                            if (timeError) setTimeError("");
                          }}
                        >
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="float-group">
                    <textarea
                      className="form-input w-full px-4 py-4 rounded-xl text-gray-900 text-sm resize-none"
                      rows={3}
                      placeholder=" "
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <label>{t("booking.lbl_notes")}</label>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between pt-3">
                    <button
                      onClick={goBack}
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-[#1E1E1E]/35 font-semibold text-[13px] hover:text-[#C5A059] hover:bg-[#C5A059]/5 transition-all"
                    >
                      <ArrowLeft className="w-3 h-3 rtl:scale-x-100" />{" "}
                      {t("booking.btn_back")}
                    </button>
                    <MagneticWrap>
                      <button
                        onClick={goNext}
                        className={ctaBtnClass}
                      >
                        {t("booking.btn_review")}{" "}
                        <ArrowRight className="w-3 h-3 rtl:-scale-x-100" />
                      </button>
                    </MagneticWrap>
                  </div>
                </div>
              )}

              {/* ============ STEP 3: Confirm ============ */}
              {currentStep === 3 && !isSubmitted && (
                <div className="step-panel space-y-5">
                  {/* Summary Card */}
                  <div className="bg-gradient-to-br from-[#C5A059]/5 via-white to-[#D4AF37]/5 rounded-2xl p-6 sm:p-8 border border-[#C5A059]/10 mb-6">
                    <h3 className="font-bold text-[#1E1E1E] text-base mb-5 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 flex items-center justify-center">
                        <ClipboardCheck className="w-4 h-4 text-[#C5A059]" />
                      </div>
                      {t("booking.summary_title")}
                    </h3>
                    <div className="space-y-0 divide-y divide-[#C5A059]/10">
                      <div className="flex justify-between py-3">
                        <span className="text-[13px] text-[#1E1E1E]/40">
                          {t("booking.summary_patient")}
                        </span>
                        <span className="text-[13px] font-semibold text-[#1E1E1E]">
                          {fullName}
                        </span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-[13px] text-[#1E1E1E]/40">
                          {t("booking.summary_phone")}
                        </span>
                        <span className="text-[13px] font-semibold text-[#1E1E1E]" dir="ltr">
                          {phone}
                        </span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-[13px] text-[#1E1E1E]/40">
                          {t("booking.summary_service")}
                        </span>
                        <span className="text-[13px] font-semibold text-[#1E1E1E]">
                          {service ? t(service) : ""}
                        </span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-[13px] text-[#1E1E1E]/40">
                          {t("booking.summary_date")}
                        </span>
                        <span className="text-[13px] font-semibold text-[#1E1E1E]">
                          {formatDateNice(date)}
                        </span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-[13px] text-[#1E1E1E]/40">
                          {t("booking.summary_time")}
                        </span>
                        <span className="text-[13px] font-semibold text-[#1E1E1E]">
                          {selectedTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info Callout */}
                  <div className="flex items-start gap-3 bg-[#C5A059]/5 border border-[#C5A059]/15 rounded-xl p-4 mb-6">
                    <Info className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <p className="text-[13px] text-[#1E1E1E]/60 leading-[1.8]">
                      {t("booking.info_callout")}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between pt-2">
                    <button
                      onClick={goBack}
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-[#1E1E1E]/35 font-semibold text-[13px] hover:text-[#C5A059] hover:bg-[#C5A059]/5 transition-all"
                    >
                      <ArrowLeft className="w-3 h-3 rtl:scale-x-100" />{" "}
                      {t("booking.btn_back")}
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={ctaBtnLargeClass}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          {t("booking.btn_processing")}
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />{" "}
                          {t("booking.btn_confirm")}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* ============ SUCCESS STATE ============ */}
              {isSubmitted && (
                <div className="text-center py-12">
                  <div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C5A059] to-[#D4AF37] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#C5A059]/30"
                    style={{
                      animation:
                        "charIn .5s cubic-bezier(.22,1,.36,1) both",
                    }}
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1E1E1E] mb-3">
                    {t("booking.success_title")}
                  </h3>
                  <p className="text-[#1E1E1E]/40 text-lg mb-2">
                    {t("booking.success_thankyou")}{" "}
                    <span className="font-semibold text-[#1E1E1E]">
                      {firstName}
                    </span>
                    !
                  </p>
                  <p className="text-[#1E1E1E]/40 text-sm mb-8 max-w-md mx-auto leading-[1.8]">
                    {t("booking.success_message")}
                  </p>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="inline-flex items-center gap-2 text-[#C5A059] font-semibold text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3 rtl:scale-x-100" />{" "}
                    {t("booking.success_home")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
