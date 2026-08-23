import { jsonResponse, verifyAdminToken } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestGet({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const search = url.searchParams.get("search");

  let query = `
    SELECT l.*, a.name as assigned_agent_name, a.staff_id as assigned_agent_staff_id 
    FROM leads l 
    LEFT JOIN agents a ON l.assigned_agent_id = a.id 
    WHERE 1=1
  `;
  const params = [];

  if (status && status !== "ALL") {
    query += " AND l.status = ?";
    params.push(status);
  }

  if (search) {
    query += " AND (l.applicant_name LIKE ? OR l.phone LIKE ? OR l.sector LIKE ?)";
    const s = `%${search}%`;
    params.push(s, s, s);
  }

  query += " ORDER BY l.id DESC LIMIT 200";

  const stmt = params.length > 0 ? db.prepare(query).bind(...params) : db.prepare(query);
  const { results } = await stmt.all();

  // Summary counts
  const statsRes = await db.prepare(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'BARU' THEN 1 ELSE 0 END) as baru,
      SUM(CASE WHEN status = 'DALAM SEMAKAN' THEN 1 ELSE 0 END) as semakan,
      SUM(CASE WHEN status = 'LULUS' THEN 1 ELSE 0 END) as lulus,
      SUM(CASE WHEN status = 'DITOLAK' THEN 1 ELSE 0 END) as ditolak
    FROM leads
  `).first();

  return jsonResponse({ leads: results, stats: statsRes });
}

export async function onRequestPatch({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  const payload = await request.json();
  const { id, status, notes, assigned_agent_id } = payload;

  if (!id) {
    return jsonResponse({ error: "ID permohonan diperlukan." }, 400);
  }

  await db.prepare(
    "UPDATE leads SET status = COALESCE(?, status), notes = COALESCE(?, notes), assigned_agent_id = COALESCE(?, assigned_agent_id), updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).bind(status || null, notes !== undefined ? notes : null, assigned_agent_id !== undefined ? assigned_agent_id : null, id).run();

  return jsonResponse({ success: true, message: "Status permohonan dikemaskini." });
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

  await db.prepare("DELETE FROM leads WHERE id = ?").bind(id).run();
  return jsonResponse({ success: true, message: "Permohonan dipadamkan." });
}
