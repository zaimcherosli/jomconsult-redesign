import { jsonResponse, verifyAdminToken } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestGet({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  // Ensure photo_url column exists
  try {
    await db.prepare("ALTER TABLE agents ADD COLUMN photo_url TEXT").run();
  } catch (e) {}

  const { results } = await db.prepare("SELECT * FROM agents ORDER BY id ASC").all();
  return jsonResponse({ agents: results });
}

export async function onRequestPost({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  try {
    await db.prepare("ALTER TABLE agents ADD COLUMN photo_url TEXT").run();
  } catch (e) {}

  const payload = await request.json();
  const { staff_id, name, role, phone, branch, zone, status, rating, specialty, avatar_bg, photo_url } = payload;

  if (!staff_id || !name || !phone) {
    return jsonResponse({ error: "Staff ID, nama dan nombor telefon diperlukan." }, 400);
  }

  // Calculate initials
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const phoneDisplay = phone.replace(/^60/, "0").replace(/(\d{3})(\d{4})(\d{3,4})/, "$1-$2 $3");

  try {
    const res = await db.prepare(
      `INSERT INTO agents (staff_id, name, role, phone, phone_display, branch, zone, status, rating, initials, specialty, avatar_bg, photo_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      staff_id.trim().toUpperCase(),
      name.trim(),
      role || "Perunding Pinjaman Bertauliah",
      phone.replace(/\D/g, ""),
      phoneDisplay,
      branch || "Ibu Pejabat (Radia Bukit Jelutong)",
      zone || "Selangor & KL",
      status || "AKTIF & BERDAFTAR",
      rating || "5.0 / 5.0",
      initials || "JC",
      specialty || "Penyatuan Hutang & Analisis DSR",
      avatar_bg || "bg-emerald-700",
      photo_url || null
    ).run();

    return jsonResponse({ success: true, message: "Ejen berjaya didaftarkan.", agent_id: res.meta.last_row_id });
  } catch (err) {
    return jsonResponse({ error: err.message.includes("UNIQUE") ? "Staff ID ini telah wujud." : err.message }, 400);
  }
}

export async function onRequestPut({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  try {
    await db.prepare("ALTER TABLE agents ADD COLUMN photo_url TEXT").run();
  } catch (e) {}

  const payload = await request.json();
  const { id, staff_id, name, role, phone, branch, zone, status, rating, specialty, avatar_bg, photo_url } = payload;

  if (!id) {
    return jsonResponse({ error: "ID ejen diperlukan." }, 400);
  }

  const phoneDisplay = phone ? phone.replace(/^60/, "0").replace(/(\d{3})(\d{4})(\d{3,4})/, "$1-$2 $3") : undefined;

  await db.prepare(
    `UPDATE agents SET 
      staff_id = COALESCE(?, staff_id),
      name = COALESCE(?, name),
      role = COALESCE(?, role),
      phone = COALESCE(?, phone),
      phone_display = COALESCE(?, phone_display),
      branch = COALESCE(?, branch),
      zone = COALESCE(?, zone),
      status = COALESCE(?, status),
      rating = COALESCE(?, rating),
      specialty = COALESCE(?, specialty),
      avatar_bg = COALESCE(?, avatar_bg),
      photo_url = CASE WHEN ? = '__CLEAR__' THEN NULL WHEN ? IS NOT NULL THEN ? ELSE photo_url END,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`
  ).bind(
    staff_id || null,
    name || null,
    role || null,
    phone ? phone.replace(/\D/g, "") : null,
    phoneDisplay || null,
    branch || null,
    zone || null,
    status || null,
    rating || null,
    specialty || null,
    avatar_bg || null,
    photo_url || null,
    photo_url || null,
    photo_url || null,
    id
  ).run();

  return jsonResponse({ success: true, message: "Maklumat ejen dikemaskini." });
}

export async function onRequestDelete({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return jsonResponse({ error: "ID diperlukan." }, 400);
  }

  await db.prepare("DELETE FROM agents WHERE id = ?").bind(id).run();
  return jsonResponse({ success: true, message: "Ejen berjaya dipadam." });
}
