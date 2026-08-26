import { jsonResponse, sha256 } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestPost({ request, env }) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return jsonResponse({ error: "Sila masukkan nama pengguna dan kata laluan." }, 400);
    }

    const db = env.DB;
    if (!db) {
      return jsonResponse({ error: "Pangkalan data D1 tidak disambungkan." }, 500);
    }

    const hashedInput = await sha256(password);

    // Check admin in DB
    const admin = await db.prepare("SELECT id, username, password_hash, full_name, role FROM admins WHERE username = ?")
      .bind(username.toLowerCase().trim())
      .first();

    // Strictly verify password with SHA-256 hash stored in DB
    if (!admin || admin.password_hash !== hashedInput) {
      return jsonResponse({ error: "Nama pengguna atau kata laluan tidak sah." }, 401);
    }

    // Generate token
    const token = "jc_admin_" + btoa(`${admin.username}:${Date.now()}`);

    return jsonResponse({
      success: true,
      message: "Log masuk berjaya.",
      token,
      user: {
        id: admin.id,
        username: admin.username,
        full_name: admin.full_name,
        role: admin.role
      }
    });
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}
