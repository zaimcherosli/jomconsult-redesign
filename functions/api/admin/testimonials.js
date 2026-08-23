import { jsonResponse, verifyAdminToken } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestGet({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  const { results } = await db.prepare("SELECT * FROM testimonials ORDER BY display_order ASC, id DESC").all();
  return jsonResponse({ testimonials: results });
}

export async function onRequestPost({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  const payload = await request.json();
  const { client_name, profession, original_issue, loan_approved, monthly_savings, story, is_featured } = payload;

  if (!client_name || !profession || !loan_approved) {
    return jsonResponse({ error: "Nama, pekerjaan dan jumlah lulus diperlukan." }, 400);
  }

  const res = await db.prepare(
    `INSERT INTO testimonials (client_name, profession, original_issue, loan_approved, monthly_savings, story, is_featured)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    client_name,
    profession,
    original_issue || "Penyatuan Hutang",
    loan_approved,
    monthly_savings || "-",
    story || "",
    is_featured !== undefined ? is_featured : 1
  ).run();

  return jsonResponse({ success: true, message: "Testimoni berjaya ditambah.", id: res.meta.last_row_id });
}

export async function onRequestPut({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  const payload = await request.json();
  const { id, client_name, profession, original_issue, loan_approved, monthly_savings, story, is_featured, display_order } = payload;

  if (!id) {
    return jsonResponse({ error: "ID testimoni diperlukan." }, 400);
  }

  await db.prepare(
    `UPDATE testimonials SET
      client_name = COALESCE(?, client_name),
      profession = COALESCE(?, profession),
      original_issue = COALESCE(?, original_issue),
      loan_approved = COALESCE(?, loan_approved),
      monthly_savings = COALESCE(?, monthly_savings),
      story = COALESCE(?, story),
      is_featured = COALESCE(?, is_featured),
      display_order = COALESCE(?, display_order)
    WHERE id = ?`
  ).bind(
    client_name || null,
    profession || null,
    original_issue || null,
    loan_approved || null,
    monthly_savings || null,
    story || null,
    is_featured !== undefined ? is_featured : null,
    display_order !== undefined ? display_order : null,
    id
  ).run();

  return jsonResponse({ success: true, message: "Testimoni dikemaskini." });
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

  await db.prepare("DELETE FROM testimonials WHERE id = ?").bind(id).run();
  return jsonResponse({ success: true, message: "Testimoni dipadam." });
}
