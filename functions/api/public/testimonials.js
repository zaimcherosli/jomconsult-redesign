import { jsonResponse } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestGet({ env }) {
  try {
    const db = env.DB;
    if (!db) {
      return jsonResponse({ testimonials: [] });
    }

    const { results } = await db.prepare(
      "SELECT id, client_name, profession, original_issue, loan_approved, monthly_savings, story, case_note, is_featured, display_order FROM testimonials WHERE is_featured = 1 ORDER BY display_order ASC, id ASC"
    ).all();

    let layoutDesktop = "grid";
    let layoutMobile = "grid";

    try {
      const layoutRows = await db.prepare(
        "SELECT key, value FROM site_settings WHERE key IN ('testimonial_layout_desktop', 'testimonial_layout_mobile')"
      ).all();
      if (layoutRows && layoutRows.results) {
        for (const row of layoutRows.results) {
          if (row.key === "testimonial_layout_desktop") layoutDesktop = row.value || "grid";
          if (row.key === "testimonial_layout_mobile") layoutMobile = row.value || "grid";
        }
      }
    } catch (e) {
      // fallback to grid
    }

    return jsonResponse({
      testimonials: results || [],
      layout: {
        desktop: layoutDesktop,
        mobile: layoutMobile
      }
    });
  } catch (err) {
    return jsonResponse({ error: err.message, testimonials: [] }, 500);
  }
}
