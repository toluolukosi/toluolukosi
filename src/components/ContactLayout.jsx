// src/components/ContactLayout.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* =========================
   EDIT FONT SIZES HERE
   ========================= */
const UI_PANEL_TITLE = "text-[clamp(12px,4vw,22px)]";
const UI_NOTE_LABEL = "text-[14px]";
const UI_NOTE_TEXT = "text-[14px]";
const UI_FIELD_LABEL = "text-[13px]";
const UI_INPUT_TEXT = "text-[13px]";
const UI_CATEGORIES_TITLE = "text-[14px]";
const UI_CATEGORY_LABEL = "text-[14px]";
const UI_OPTION_TEXT = "text-[13px]";
const UI_ERROR_TEXT = "text-[12px]";
const UI_STATUS_TEXT = "text-[13px]";
const UI_BUTTON_TEXT = "text-[11px] md:text-[12px]";

/* =========================
   OPTIONS
   ========================= */
const STILL_OPTIONS = [
  "Logo Design",
  "Digital / Print Design",
  "Packaging Design",
  "Photography",
  "Product Photography",
  "Photo Editing / Retouching",
];

const LIVE_OPTIONS = [
  "Motion Graphics Design",
  "2D Animation",
  "Logo Animation / Idents",
  "Animated Social Media Assets",
  "Kinetic Typography",
  "Video Editing",
  "Reels / TikTok / YouTube Edits",
  "Rotoscoping / Masking",
];

const SOUND_OPTIONS = [
  "Music Production",
  "Sound Design",
  "Mixing / Mastering",
  "Sonic Branding / Jingles",
  "Audio Editing",
  "Original Score / Soundtrack",
];

const DEV_OPTIONS = [
  "Portfolio Website",
  "Business Website",
  "Landing Page",
  "Website Redesign",
  "Website Maintenance",
  "Custom Web Features",
];

const MULTI_OPTIONS = [
  "Brand Identity Design",
  "Creative Direction",
  "Art Direction",
  "Campaign Direction",
  "Custom Project",
];

const CUSTOM_PROJECT_VALUE = "Custom Project";

function formatList(values) {
  return Array.isArray(values) && values.length ? values.join(", ") : "";
}

function validate(form) {
  const errors = {};

  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";

  const email = form.email.trim();
  if (!email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Email looks invalid.";

  const phone = form.phone.trim();
  if (!phone) errors.phone = "Phone number is required.";

  const hasAnyCategory =
    form.stills.length ||
    form.live.length ||
    form.sound.length ||
    form.dev.length ||
    form.multi.length;

  if (!hasAnyCategory) errors.categories = "Select at least one category.";

  if (form.multi.includes(CUSTOM_PROJECT_VALUE) && !form.customProjectDescription.trim()) {
    errors.customProjectDescription = "Tell me about the custom project.";
  }

  return errors;
}

/**
 * Sends via EmailJS REST if env vars exist; otherwise falls back to mailto.
 * Vite env:
 *  - VITE_EMAILJS_SERVICE_ID
 *  - VITE_EMAILJS_TEMPLATE_ID
 *  - VITE_EMAILJS_PUBLIC_KEY
 */
async function sendContact({ toEmail, payload }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (serviceId && templateId && publicKey) {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: payload,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Email send failed (${res.status}). ${text}`.trim());
    }
    return;
  }

  const subject = encodeURIComponent("New project inquiry");
  const lines = [
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    "",
    "Selections:",
    `Stills: ${payload.stills || "-"}`,
    `Live: ${payload.live || "-"}`,
    `Sound: ${payload.sound || "-"}`,
    `Dev: ${payload.dev || "-"}`,
    `Multi-service: ${payload.multi || "-"}`,
    "",
    payload.customProjectDescription
      ? `Custom Project Description:\n${payload.customProjectDescription}`
      : "Custom Project Description: -",
  ];

  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:${encodeURIComponent(toEmail)}?subject=${subject}&body=${body}`;
}

function buildSelectedServices(form) {
  const pairs = [
    ["Stills", formatList(form.stills)],
    ["Live", formatList(form.live)],
    ["Sound", formatList(form.sound)],
    ["Dev", formatList(form.dev)],
    ["Multi-service", formatList(form.multi)],
  ];

  return pairs
    .filter(([, v]) => !!v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" | ");
}

function toggleValue(list, v) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

export default function ContactLayout({ email, phone, homePath = "/" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [slideClass, setSlideClass] = useState(
    location.state?.from === "left" ? "-translate-x-full opacity-0" : "translate-x-full opacity-0"
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    stills: [],
    live: [],
    sound: [],
    dev: [],
    multi: [],
    customProjectDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const selectMeta = useMemo(
    () => [
      { key: "stills", label: "Stills", options: STILL_OPTIONS },
      { key: "live", label: "Live", options: LIVE_OPTIONS },
      { key: "sound", label: "Sound", options: SOUND_OPTIONS },
      { key: "dev", label: "Dev", options: DEV_OPTIONS },
      { key: "multi", label: "Looking for a multi-service project?", options: MULTI_OPTIONS },
    ],
    []
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => setSlideClass("translate-x-0 opacity-100"));
    return () => cancelAnimationFrame(id);
  }, []);

  const animateThenNavigate = (path, from = "right") => {
    setSlideClass("translate-x-full opacity-0");
    setTimeout(() => navigate(path, { state: { from } }), 450);
  };

  const handleClose = () => animateThenNavigate(homePath, "left");

  const handleChange = (key) => (e) => {
    setStatus({ state: "idle", message: "" });
    setErrors((prev) => ({ ...prev, [key]: undefined, categories: undefined }));
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleToggleOption = (key, opt) => {
    setStatus({ state: "idle", message: "" });
    setErrors((prev) => ({ ...prev, categories: undefined, customProjectDescription: undefined }));

    setForm((prev) => {
      const nextArr = toggleValue(prev[key], opt);
      const customRemoved =
        key === "multi" &&
        prev.multi.includes(CUSTOM_PROJECT_VALUE) &&
        !nextArr.includes(CUSTOM_PROJECT_VALUE);

      return {
        ...prev,
        [key]: nextArr,
        customProjectDescription: customRemoved ? "" : prev.customProjectDescription,
      };
    });
  };

  const handleClearCategory = (key) => {
    setStatus({ state: "idle", message: "" });
    setErrors((prev) => ({ ...prev, categories: undefined, customProjectDescription: undefined }));
    setForm((prev) => ({
      ...prev,
      [key]: [],
      customProjectDescription: key === "multi" ? "" : prev.customProjectDescription,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ state: "error", message: "Fix the highlighted fields." });
      return;
    }

    setStatus({ state: "sending", message: "" });

    try {
      const selectedServices = buildSelectedServices(form);

      await sendContact({
        toEmail: email,
        payload: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          stills: formatList(form.stills),
          live: formatList(form.live),
          sound: formatList(form.sound),
          dev: formatList(form.dev),
          multi: formatList(form.multi),
          selectedServices,
          customProjectDescription: form.customProjectDescription.trim(),
        },
      });

      setStatus({ state: "success", message: "Sent. I’ll get back to you shortly." });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        stills: [],
        live: [],
        sound: [],
        dev: [],
        multi: [],
        customProjectDescription: "",
      });
      setErrors({});
    } catch (err) {
      setStatus({ state: "error", message: err?.message || "Failed to send. Try again." });
    }
  };

  const inputBase = `w-full rounded-[10px] border bg-[#0E1016] px-3 sm:px-4 py-2.5 ${UI_INPUT_TEXT} text-gray-200 placeholder:text-gray-500 outline-none transition`;
  const borderOk = "border-white/10 focus:border-white/25";
  const borderBad = "border-red-400/60 focus:border-red-300/70";

  const wantsCustomProject = form.multi.includes(CUSTOM_PROJECT_VALUE);

  return (
    <section
      className={`
        fixed inset-0 z-[60]
        bg-[#050609]
        flex justify-center
        items-start lg:items-center
        px-4 md:px-6 lg:px-10
        py-6 lg:py-10
        overflow-y-auto lg:overflow-y-hidden
        transition-transform transition-opacity duration-500
        ease-[cubic-bezier(0.22,0.61,0.36,1)]
        ${slideClass}
      `}
      style={{ fontFamily: "var(--project-font, system-ui, sans-serif)" }}
    >
      <div className="w-full mx-auto">
        <div
          className="
            w-full
            grid gap-6 lg:gap-4
            lg:grid-cols-2
            items-stretch
            lg:h-[90vh]
          "
        >
          {/* LEFT – centered block, left-aligned text */}
          <aside
            className="
              relative
              rounded-[10px]
              overflow-hidden
              h-[360px]
              sm:h-[420px]
              md:h-[480px]
              lg:h-full
              flex items-center justify-center
            "
          >
            <div className="w-full max-w-[460px] px-6 sm:px-8 text-left">
              <h1 className="font-thedus-condensed uppercase text-[clamp(22px,4vw,44px)] leading-[1.05] text-white">
                Get in touch
              </h1>

              <div className="mt-4 space-y-6">
                <div>
                  <div className="text-[13px] uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-0">
                    Email
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="text-[14px] tracking-[0.08em] font-thedus-condensed text-gray-200 hover:text-white no-underline hover:underline visited:text-gray-200 transition"
                  >
                    {email}
                  </a>
                </div>

                <div>
                  <div className="text-[13px] uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-0">
                    Phone
                  </div>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="text-[14px] tracking-[0.08em] font-thedus-condensed text-gray-200 hover:text-white no-underline hover:underline visited:text-gray-200 transition"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT – FORM PANEL */}
          <article
            className="
              bg-[#050609]
              rounded-[10px]
              border border-white/7
              shadow-[0_26px_80px_rgba(0,0,0,0.85)]
              flex flex-col
              overflow-hidden
              lg:h-full
            "
          >
            <header className="px-4 md:px-6 pt-4 md:pt-5">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex-1
                    rounded-[10px]
                    border border-white/10
                    bg-[#111217]
                    px-3 sm:px-4 md:px-5
                    py-2 sm:py-2.5
                  "
                >
                  <div
                    className={`font-thedus-condensed uppercase ${UI_PANEL_TITLE} leading-tight text-white text-center sm:text-left`}
                  >
                    LETS GET STARTED!
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="
                    hidden sm:flex
                    flex-shrink-0
                    w-9 h-9 md:w-10 md:h-10
                    rounded-[10px]
                    border border-white/10
                    bg-[#171821]
                    items-center justify-center
                    text-sm text-gray-300
                    hover:bg-[#1F2937] hover:text-white
                    transition
                  "
                  aria-label="Close contact"
                >
                  ×
                </button>
              </div>
            </header>

            <div className="px-4 md:px-6 pt-3 pb-2">
              <div className="rounded-[10px] border border-white/10 bg-transparent px-4 py-3.5">
                <div
                  className={`${UI_NOTE_LABEL} uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-1`}
                >
                  Note
                </div>
                <div className={`${UI_NOTE_TEXT} font-thedus-condensed leading-relaxed text-gray-300`}>
                  Select multiple options per category. If you pick “Custom Project”, describe it.
                </div>
              </div>
            </div>

            <div className="px-4 md:px-6 pb-4 md:pb-6 flex-1 min-h-0 flex flex-col gap-3">
              <div className="flex-1 min-h-0">
                <form
                  onSubmit={handleSubmit}
                  className="
                    h-full
                    rounded-[10px]
                    border border-white/8
                    bg-transparent
                    px-4 md:px-5 py-4 md:py-5
                    flex flex-col
                    min-h-0
                  "
                >
                  {/* scrollable body */}
                  <div className="flex-1 min-h-0 overflow-y-auto project-panel-scroll pr-1 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <Field
                        label="Firstname"
                        value={form.firstName}
                        onChange={handleChange("firstName")}
                        placeholder="Firstname"
                        error={errors.firstName}
                        autoComplete="given-name"
                        inputBase={inputBase}
                        borderOk={borderOk}
                        borderBad={borderBad}
                      />
                      <Field
                        label="Lastname"
                        value={form.lastName}
                        onChange={handleChange("lastName")}
                        placeholder="Lastname"
                        error={errors.lastName}
                        autoComplete="family-name"
                        inputBase={inputBase}
                        borderOk={borderOk}
                        borderBad={borderBad}
                      />
                      <Field
                        label="Email"
                        value={form.email}
                        onChange={handleChange("email")}
                        placeholder="you@domain.com"
                        error={errors.email}
                        type="email"
                        autoComplete="email"
                        inputBase={inputBase}
                        borderOk={borderOk}
                        borderBad={borderBad}
                      />
                      <Field
                        label="Phonenumber"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        placeholder="+30 ..."
                        error={errors.phone}
                        autoComplete="tel"
                        inputBase={inputBase}
                        borderOk={borderOk}
                        borderBad={borderBad}
                      />
                    </div>

                    {/* categories */}
                    <div>
                      <div
                        className={`${UI_CATEGORIES_TITLE} uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-3`}
                      >
                        Categories
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {selectMeta.map((meta) => {
                          const fullRow = meta.key === "multi";
                          return (
                            <div key={meta.key} className={fullRow ? "sm:col-span-2" : ""}>
                              <div
                                className={`${UI_CATEGORY_LABEL} uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-2`}
                              >
                                {meta.label}
                              </div>

                              <MultiSelectDetails
                                value={form[meta.key]}
                                options={meta.options}
                                onToggle={(opt) => handleToggleOption(meta.key, opt)}
                                onClear={() => handleClearCategory(meta.key)}
                                error={!!errors.categories}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {errors.categories && (
                        <div className={`mt-3 ${UI_ERROR_TEXT} text-red-300/90`}>
                          {errors.categories}
                        </div>
                      )}
                    </div>

                    {/* custom project textarea */}
                    {wantsCustomProject && (
                      <div>
                        <div
                          className={`${UI_FIELD_LABEL} uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-2`}
                        >
                          Describe your custom project
                        </div>
                        <textarea
                          value={form.customProjectDescription}
                          onChange={handleChange("customProjectDescription")}
                          rows={5}
                          placeholder="Timeline, deliverables, references, budget range, links..."
                          className={`${inputBase} resize-none ${
                            errors.customProjectDescription ? borderBad : borderOk
                          }`}
                        />
                        {errors.customProjectDescription && (
                          <div className={`mt-2 ${UI_ERROR_TEXT} text-red-300/90`}>
                            {errors.customProjectDescription}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* footer pinned */}
                  <div className="pt-5">
                    {status.message && (
                      <div
                        className={`mb-3 ${UI_STATUS_TEXT} ${
                          status.state === "success"
                            ? "text-emerald-300/90"
                            : status.state === "error"
                            ? "text-red-300/90"
                            : "text-gray-300"
                        }`}
                      >
                        {status.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status.state === "sending"}
                      className={`
                        w-full
                        rounded-[10px]
                        border border-white/10
                        bg-[#171821]
                        px-4 md:px-5
                        py-2.5
                        text-center
                        ${UI_BUTTON_TEXT}
                        tracking-[0.22em]
                        uppercase
                        font-thedus-condensed
                        text-gray-100
                        hover:bg-white hover:text-black
                        transition
                        disabled:opacity-60 disabled:cursor-not-allowed
                      `}
                    >
                      {status.state === "sending" ? "Sending…" : "Send"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  autoComplete,
  inputBase,
  borderOk,
  borderBad,
}) {
  return (
    <div>
      <div className={`${UI_FIELD_LABEL} uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-2`}>
        {label}
      </div>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        className={`${inputBase} ${error ? borderBad : borderOk}`}
      />
      {error && <div className={`mt-2 ${UI_ERROR_TEXT} text-red-300/90`}>{error}</div>}
    </div>
  );
}

/**
 * Uses <details>/<summary> so the dropdown expands inside the scroll area (no clipping)
 * and checkbox selection works reliably.
 */
function MultiSelectDetails({ value, options, onToggle, onClear, error }) {
  const summaryText = value.length ? `${value.length} selected` : "Select…";

  return (
    <details
      className={`
        rounded-[10px]
        border
        ${error ? "border-red-400/60" : "border-white/10"}
        bg-[#0E1016]
      `}
    >
      <summary
        className={`
          w-full
          rounded-[10px]
          px-3 sm:px-4
          py-2.5
          ${UI_INPUT_TEXT}
          text-gray-200
          cursor-pointer
          flex items-center justify-between gap-3
          list-none
          [&::-webkit-details-marker]:hidden
        `}
      >
        <span className="min-w-0 truncate">{summaryText}</span>
        <span className="text-[11px] text-gray-400">▼</span>
      </summary>

      <div className="px-3 sm:px-4 pb-3">
        <div className="max-h-[220px] overflow-y-auto project-panel-scroll pr-1 pt-2 space-y-1">
          {options.map((opt) => {
            const checked = value.includes(opt);
            return (
              <label
                key={opt}
                className="flex items-start gap-3 px-2.5 py-2 rounded-[10px] hover:bg-white/5 transition cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(opt)}
                  className="mt-[3px]"
                />
                <span className={`${UI_OPTION_TEXT} text-gray-100`}>{opt}</span>
              </label>
            );
          })}
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-white/10 mt-2">
          <span className={`text-[12px] text-gray-400`}>
            {value.length ? `${value.length} selected` : "None selected"}
          </span>

          <button
            type="button"
            onClick={onClear}
            disabled={!value.length}
            className="
              rounded-[10px]
              border border-white/10
              bg-[#111217]
              px-3 py-1.5
              text-[11px]
              tracking-[0.18em]
              uppercase
              font-thedus-condensed
              text-gray-200
              hover:bg-white hover:text-black
              transition
              disabled:opacity-60
            "
          >
            Clear
          </button>
        </div>

        {value.length > 0 && (
          <div className="pt-3 flex flex-wrap gap-2">
            {value.map((v) => (
              <span
                key={v}
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-white/10
                  bg-white/5
                  px-3 py-1
                  text-[12px]
                  text-gray-200
                "
              >
                <span className="truncate">{v}</span>
                <button type="button" onClick={() => onToggle(v)} className="hover:text-white">
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}