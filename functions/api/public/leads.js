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
    const {
      applicant_name,
      ic_number,
      phone,
      location_state,
      sector,
      employer_name,
      employment_status,
      salary,
      professional_cert,
      credit_issues,
      social_channel,
      source
    } = payload;

    if (!phone) {
      return jsonResponse({ error: "Sila berikan nombor telefon WhatsApp anda." }, 400);
    }

    const res = await db.prepare(
      `INSERT INTO leads (
        applicant_name, ic_number, phone, location_state, 
        sector, employer_name, employment_status, salary, 
        professional_cert, credit_issues, social_channel, source, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'BARU')`
    ).bind(
      applicant_name || "Pemohon Laman Web",
      ic_number || "-",
      phone.replace(/\D/g, ""),
      location_state || "Selangor",
      sector || "Swasta",
      employer_name || "-",
      employment_status || "Tetap (> 1 tahun)",
      salary || "RM 3,001 - RM 4,000",
      professional_cert || "TIADA",
      Array.isArray(credit_issues) ? credit_issues.join(", ") : (credit_issues || "Tiada Masalah"),
      social_channel || "Website",
      source || "Borang Semak Kelayakan V3"
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
