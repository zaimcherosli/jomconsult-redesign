import { jsonResponse, verifyAdminToken } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestGet({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  const { results } = await db.prepare("SELECT key, value, description FROM site_settings").all();
  return jsonResponse({ settings: results });
}

export async function onRequestPost({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  const settingsObj = await request.json();

  for (const [key, value] of Object.entries(settingsObj)) {
    await db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)"
    ).bind(key, String(value)).run();
  }

  return jsonResponse({ success: true, message: "Tetapan laman web berjaya disimpan." });
}
