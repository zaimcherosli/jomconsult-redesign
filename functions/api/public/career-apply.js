import { jsonResponse } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

async function ensureCareerTable(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS career_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ref_no TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      ic_number TEXT NOT NULL,
      date_of_birth TEXT,
      marital_status TEXT,
      race TEXT,
      religion TEXT,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      address_line_1 TEXT,
      address_line_2 TEXT,
      address_postcode TEXT,
      address_city TEXT,
      address_state TEXT,
      bank_name TEXT,
      bank_account_name TEXT,
      bank_account_number TEXT,
      recruiter_name TEXT DEFAULT 'HQ JomConsult',
      photo_data TEXT,
      ic_front_data TEXT,
      ic_back_data TEXT,
      selfie_ic_data TEXT,
      status TEXT DEFAULT 'BARU',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

export async function onRequestPost({ request, env }) {
  try {
    const db = env.DB;
    if (!db) {
      return jsonResponse({ error: "Pangkalan data D1 tidak bersedia." }, 500);
    }

    await ensureCareerTable(db);

    const payload = await request.json();
    const {
      full_name,
      ic_number,
      date_of_birth,
      marital_status,
      race,
      religion,
      phone,
      email,
      address_line_1,
      address_line_2,
      address_postcode,
      address_city,
      address_state,
      bank_name,
      bank_account_name,
      bank_account_number,
      recruiter_name,
      photo_data,
      ic_front_data,
      ic_back_data,
      selfie_ic_data
    } = payload;

    if (!full_name || !phone || !ic_number) {
      return jsonResponse({ error: "Sila lengkapkan Nama Penuh, No. IC, dan No. Telefon." }, 400);
    }

    // Generate reference number: JC-REC-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ref_no = `JC-REC-${randomSuffix}`;

    const stmt = db.prepare(`
      INSERT INTO career_applications (
        ref_no, full_name, ic_number, date_of_birth, marital_status,
        race, religion, phone, email, address_line_1, address_line_2,
        address_postcode, address_city, address_state, bank_name,
        bank_account_name, bank_account_number, recruiter_name,
        photo_data, ic_front_data, ic_back_data, selfie_ic_data, status
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?, 'BARU'
      )
    `).bind(
      ref_no,
      full_name.trim().toUpperCase(),
      ic_number.trim(),
      date_of_birth || "",
      marital_status || "Bujang",
      race || "Melayu",
      religion || "Islam",
      phone.replace(/\D/g, ""),
      (email || "").trim().toLowerCase(),
      address_line_1 || "",
      address_line_2 || "",
      address_postcode || "",
      address_city || "",
      address_state || "Selangor",
      bank_name || "Maybank",
      (bank_account_name || full_name).trim().toUpperCase(),
      (bank_account_number || "").trim(),
      recruiter_name || "HQ JomConsult",
      photo_data || "",
      ic_front_data || "",
      ic_back_data || "",
      selfie_ic_data || ""
    );

    const res = await stmt.run();

    return jsonResponse({
      success: true,
      ref_no,
      id: res.meta.last_row_id,
      message: "Permohonan pendaftaran anda telah berjaya direkodkan dalam sistem JomConsult."
    });
  } catch (err) {
    return jsonResponse({ error: "Ralat memproses permohonan: " + err.message }, 500);
  }
}
