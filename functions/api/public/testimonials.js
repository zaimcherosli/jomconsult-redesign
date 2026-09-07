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

    return jsonResponse({
      testimonials: results || []
    });
  } catch (err) {
    return jsonResponse({ error: err.message, testimonials: [] }, 500);
  }
}
