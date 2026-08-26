import { jsonResponse, sha256, verifyAdminToken } from "../_utils.js";

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestPut({ request, env }) {
  if (!verifyAdminToken(request)) {
    return jsonResponse({ error: "Akses tidak dibenarkan." }, 401);
  }

  const db = env.DB;
  if (!db) {
    return jsonResponse({ error: "Pangkalan data D1 tidak disambungkan." }, 500);
  }

  try {
    const payload = await request.json();
    const { username, full_name, current_password, new_password } = payload;

    // Get primary admin
    const admin = await db.prepare("SELECT * FROM admins ORDER BY id ASC LIMIT 1").first();
    if (!admin) {
      return jsonResponse({ error: "Akaun admin tidak dijumpai." }, 404);
    }

    let newPasswordHash = admin.password_hash;
    if (new_password && new_password.trim().length > 0) {
      if (!current_password) {
        return jsonResponse({ error: "Sila masukkan kata laluan semasa untuk menukar kata laluan." }, 400);
      }
      const hashedCurrent = await sha256(current_password);
      if (hashedCurrent !== admin.password_hash) {
        return jsonResponse({ error: "Kata laluan semasa tidak tepat." }, 400);
      }
      if (new_password.trim().length < 6) {
        return jsonResponse({ error: "Kata laluan baharu mestilah sekurang-kurangnya 6 aksara." }, 400);
      }
      newPasswordHash = await sha256(new_password.trim());
    }

    const updatedUsername = (username && username.trim().length > 0) ? username.toLowerCase().trim() : admin.username;
    const updatedFullName = (full_name && full_name.trim().length > 0) ? full_name.trim() : admin.full_name;

    await db.prepare(
      "UPDATE admins SET username = ?, full_name = ?, password_hash = ? WHERE id = ?"
    ).bind(
      updatedUsername,
      updatedFullName,
      newPasswordHash,
      admin.id
    ).run();

    return jsonResponse({
      success: true,
      message: "Profil dan keselamatan admin berjaya dikemaskini.",
      user: {
        id: admin.id,
        username: updatedUsername,
        full_name: updatedFullName,
        role: admin.role
      }
    });
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}
