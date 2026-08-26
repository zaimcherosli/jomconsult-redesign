import { jsonResponse, verifyAdminToken } from "../_utils.js";

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

export async function onRequestGet({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  if (!db) {
    return jsonResponse({ error: "Pangkalan data D1 tidak bersedia." }, 500);
  }

  await ensureCareerTable(db);

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const search = url.searchParams.get("search");

  let query = "SELECT * FROM career_applications WHERE 1=1";
  const params = [];

  if (status && status !== "ALL") {
    query += " AND status = ?";
    params.push(status);
  }

  if (search) {
    query += " AND (full_name LIKE ? OR phone LIKE ? OR ic_number LIKE ? OR ref_no LIKE ? OR email LIKE ?)";
    const s = `%${search}%`;
    params.push(s, s, s, s, s);
  }

  query += " ORDER BY id DESC LIMIT 200";

  const stmt = params.length > 0 ? db.prepare(query).bind(...params) : db.prepare(query);
  const { results } = await stmt.all();

  // Summary counts
  const statsRes = await db.prepare(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'BARU' THEN 1 ELSE 0 END) as baru,
      SUM(CASE WHEN status = 'TEMUDUGA' THEN 1 ELSE 0 END) as temuduga,
      SUM(CASE WHEN status = 'LULUS' THEN 1 ELSE 0 END) as lulus,
      SUM(CASE WHEN status = 'DITOLAK' THEN 1 ELSE 0 END) as ditolak
    FROM career_applications
  `).first();

  return jsonResponse({ applications: results, stats: statsRes });
}

export async function onRequestPatch({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  if (!db) {
    return jsonResponse({ error: "Pangkalan data D1 tidak bersedia." }, 500);
  }

  await ensureCareerTable(db);

  const payload = await request.json();
  const { id, status, notes } = payload;

  if (!id) {
    return jsonResponse({ error: "ID permohonan diperlukan." }, 400);
  }

  await db.prepare(
    "UPDATE career_applications SET status = COALESCE(?, status), notes = COALESCE(?, notes), updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).bind(status, notes, id).run();

  return jsonResponse({ success: true, message: "Status permohonan berjaya dikemaskini." });
}

export async function onRequestDelete({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  if (!db) {
    return jsonResponse({ error: "Pangkalan data D1 tidak bersedia." }, 500);
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return jsonResponse({ error: "ID permohonan diperlukan." }, 400);
  }

  await db.prepare("DELETE FROM career_applications WHERE id = ?").bind(id).run();

  return jsonResponse({ success: true, message: "Permohonan berjaya dipadamkan." });
}
