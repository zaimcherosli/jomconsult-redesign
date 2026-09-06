import { jsonResponse } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestGet({ request, env }) {
  try {
    const db = env.DB;
    const url = new URL(request.url);
    const query = (url.searchParams.get("q") || "").trim();

    if (!db) {
      return jsonResponse({ agents: [] });
    }

    if (query) {
      const cleanQ = `%${query}%`;
      const numMatch = query.replace(/\D/g, '');
      const paddedId = numMatch ? `JCS${numMatch.padStart(4, '0')}` : '';

      const { results } = await db.prepare(
        "SELECT id, staff_id, name, role, phone, phone_display, branch, zone, status, rating, initials, specialty, avatar_bg, photo_url, verification_count FROM agents WHERE (staff_id LIKE ? OR staff_id = ? OR phone LIKE ? OR name LIKE ?) ORDER BY staff_id ASC"
      ).bind(cleanQ, paddedId, cleanQ, cleanQ).all();

      // If exact match found, increment verification count
      if (results.length > 0) {
        const matched = results[0];
        await db.prepare("UPDATE agents SET verification_count = verification_count + 1 WHERE id = ?").bind(matched.id).run();
      }

      return jsonResponse({ agents: results, total: results.length });
    } else {
      const { results } = await db.prepare(
        "SELECT id, staff_id, name, role, phone, phone_display, branch, zone, status, rating, initials, specialty, avatar_bg, photo_url FROM agents WHERE status LIKE '%AKTIF%' ORDER BY staff_id ASC"
      ).all();

      return jsonResponse({ agents: results, total: results.length });
    }
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}
