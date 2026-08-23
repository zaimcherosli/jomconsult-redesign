import { jsonResponse } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestPost({ request, env }) {
  try {
    const db = env.DB;
    if (!db) {
      return jsonResponse({ error: "Pangkalan data D1 tidak bersedia." }, 500);
    }

    const payload = await request.json();
    const { applicant_name, phone, sector, salary, commitment, loan_purpose, credit_issues } = payload;

    if (!phone) {
      return jsonResponse({ error: "Sila berikan nombor telefon WhatsApp anda." }, 400);
    }

    const res = await db.prepare(
      `INSERT INTO leads (applicant_name, phone, sector, salary, commitment, loan_purpose, credit_issues, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'BARU')`
    ).bind(
      applicant_name || "Pemohon Laman Web",
      phone,
      sector || "Swasta / MNC",
      salary || "RM 3,000 - RM 5,000",
      commitment || "Tiada maklumat",
      loan_purpose || "Penyatuan Hutang",
      credit_issues || "Tiada rekod tunggakan"
    ).run();

    return jsonResponse({
      success: true,
      message: "Permohonan anda telah berjaya dihantar ke sistem analisis JomConsult.",
      lead_id: res.meta.last_row_id
    });
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}
