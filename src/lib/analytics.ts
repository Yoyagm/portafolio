"use client";

import { track } from "@vercel/analytics";

// Eventos del KPI de conversión (RF16), sin cookies ni PII.
export type AnalyticsEvent = "contact_submit" | "cv_download" | "outbound_click";

export function trackEvent(
  name: AnalyticsEvent,
  props?: Record<string, string | number | boolean>,
): void {
  try {
    track(name, props);
  } catch {
    // La analítica nunca debe romper la UX.
  }
}
