"use client";

/**
 * ContactForm — componente cliente (T17, RF9).
 *
 * PRG: en éxito el Server Action emite redirect(/thank-you); no hay estado ok:true.
 * Sin JS: el <form> hace POST nativo → el Server Action redirige con 303.
 * Con JS: useActionState maneja estado de error sin recargar página.
 *
 * Accesibilidad:
 * - aria-live="polite" en área de estado (RF9.12, SC 4.1.3).
 * - aria-invalid + aria-describedby por campo (SC 1.3.1, 3.3.1).
 * - Foco programático al primer error (SC 2.4.3).
 */

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";
import {
  submitContact,
  type ContactActionState,
} from "@/actions/submit-contact";

export function ContactForm() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState<ContactActionState, FormData>(
    submitContact,
    null,
  );
  // Referencia al primer campo con error para enfocar (SC 2.4.3)
  const firstErrorRef = useRef<HTMLElement | null>(null);
  // Sella el timestamp de apertura en cliente (evita mismatch de hidratación:
  // el tiempo de SSR ≠ tiempo de mount). Sin JS queda vacío → check omitido.
  const startTimeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startTimeRef.current) startTimeRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state && !state.ok && firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [state]);

  const fieldError = (field: "name" | "email" | "message") =>
    state && !state.ok ? state.fieldErrors?.[field] : undefined;

  return (
    <form action={formAction} noValidate className="mt-8 space-y-5">
      {/* Honeypot: oculto visualmente; accesible para asistentes solo como "no leer" */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {/* Locale: para el asunto del correo y el redirect PRG localizado */}
      <input type="hidden" name="locale" value={locale} />

      {/* Timestamp de apertura (se sella en cliente vía effect; vacío sin JS) */}
      <input ref={startTimeRef} type="hidden" name="_startTime" defaultValue="" />

      {/* Área de estado global (aria-live, SC 4.1.3) */}
      <div role="status" aria-live="polite" aria-atomic="true">
        {state && !state.ok && (
          <p
            ref={(el) => {
              if (el && state.error !== "validation") firstErrorRef.current = el;
            }}
            tabIndex={-1}
            className="rounded-lg border border-alert/40 bg-alert/5 px-4 py-3 text-sm text-alert"
          >
            {state.error === "rate_limit" ? (
              t("errorRateLimited")
            ) : state.error === "send_failed" ? (
              <>
                {t("errorGeneric")}{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="underline underline-offset-2 hover:opacity-80"
                >
                  {siteConfig.email}
                </a>
              </>
            ) : null}
          </p>
        )}
      </div>

      {/* Nombre */}
      <div className="space-y-1.5">
        <label htmlFor="cf-name" className="block text-sm font-medium text-fg">
          {t("name")}
          <span aria-hidden="true" className="ml-0.5 text-alert">
            *
          </span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          aria-required="true"
          aria-invalid={fieldError("name") ? "true" : undefined}
          aria-describedby={fieldError("name") ? "cf-name-err" : undefined}
          ref={(el) => {
            if (el && fieldError("name")) firstErrorRef.current = el;
          }}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-fg placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-50"
        />
        {fieldError("name") && (
          <p id="cf-name-err" role="alert" className="text-xs text-alert">
            {t("errorName")}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="cf-email" className="block text-sm font-medium text-fg">
          {t("email")}
          <span aria-hidden="true" className="ml-0.5 text-alert">
            *
          </span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={fieldError("email") ? "true" : undefined}
          aria-describedby={fieldError("email") ? "cf-email-err" : undefined}
          ref={(el) => {
            if (el && fieldError("email") && !fieldError("name"))
              firstErrorRef.current = el;
          }}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-fg placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-50"
        />
        {fieldError("email") && (
          <p id="cf-email-err" role="alert" className="text-xs text-alert">
            {t("errorEmail")}
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div className="space-y-1.5">
        <label
          htmlFor="cf-message"
          className="block text-sm font-medium text-fg"
        >
          {t("message")}
          <span aria-hidden="true" className="ml-0.5 text-alert">
            *
          </span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={2000}
          aria-required="true"
          aria-invalid={fieldError("message") ? "true" : undefined}
          aria-describedby={fieldError("message") ? "cf-message-err" : undefined}
          ref={(el) => {
            if (
              el &&
              fieldError("message") &&
              !fieldError("name") &&
              !fieldError("email")
            )
              firstErrorRef.current = el;
          }}
          className="w-full resize-y rounded-lg border border-border bg-surface px-4 py-2.5 text-fg placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-50"
        />
        {fieldError("message") && (
          <p id="cf-message-err" role="alert" className="text-xs text-alert">
            {t("errorMessage")}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? t("sending") : t("send")}
      </button>
    </form>
  );
}
