import { jsonResponse } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestGet({ env }) {
  try {
    const db = env.DB;
    if (!db) {
      // Fallback if DB not ready
      return jsonResponse({
        whatsapp_number: "601171191179",
        phone_display: "011-7119 1179",
        office_phone: "03-7832 4539",
        email: "hello@jomconsult.com.my",
        address: "22-2, Jalan Opera G U2/G, Taman TTDI Jaya, 40150 Shah Alam, Selangor",
        office_hours: "Isnin - Jumaat: 10:00 AM - 6:00 PM",
        announcement_text: "Semakan Kelayakan Pembiayaan Percuma",
        announcement_active: "1"
      });
    }

    const { results } = await db.prepare("SELECT key, value FROM site_settings").all();
    const config = {};
    for (const r of results) {
      config[r.key] = r.value;
    }

    return jsonResponse(config);
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}
