export type AnalyticsEvent =
  | "hero_catalog_click"
  | "hero_quote_click"
  | "product_view"
  | "category_view"
  | "product_quote_click"
  | "document_download"
  | "specification_upload"
  | "quote_form_start"
  | "quote_form_submit"
  | "quote_form_error"
  | "phone_click"
  | "email_click";

export function trackEvent(event: AnalyticsEvent, payload: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("liteyshchik:analytics", { detail: { event, payload } }));
}
