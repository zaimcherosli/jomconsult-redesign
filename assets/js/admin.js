/**
 * JomConsult Admin CMS Interactive Controller
 * Handles Auth, Leads CRM, Agents CRUD, Testimonials & Settings
 */

const API_BASE = '/api';
let authToken = localStorage.getItem('jc_admin_token') || '';
let currentUser = JSON.parse(localStorage.getItem('jc_admin_user') || 'null');
let currentLeads = [];
let currentAgents = [];

document.addEventListener('DOMContentLoaded', () => {
  initAuthFlow();
  initTabs();
  initLeadsListeners();
  initSettingsListeners();
});

// ================= 1. AUTHENTICATION =================
function initAuthFlow() {
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');
  const loginForm = document.getElementById('login-form');
  const logoutBtn = document.getElementById('logout-btn');

  if (authToken && currentUser) {
    showDashboard();
  } else {
    showLogin();
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value.trim();
      const alertBox = document.getElementById('login-alert');
      const btn = document.getElementById('login-btn');

      btn.disabled = true;
      btn.innerHTML = '<span>Sedang log masuk...</span>';
      alertBox.classList.add('hidden');

      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (res.ok && data.success) {
          authToken = data.token;
          currentUser = data.user;
          localStorage.setItem('jc_admin_token', authToken);
          localStorage.setItem('jc_admin_user', JSON.stringify(currentUser));
          showDashboard();
        } else {
          alertBox.textContent = data.error || 'Gagal log masuk.';
          alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30';
          alertBox.classList.remove('hidden');
        }
      } catch (err) {
        alertBox.textContent = 'Ralat sambungan ke pelayan.';
        alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30';
        alertBox.classList.remove('hidden');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>Log Masuk Panel</span>';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('jc_admin_token');
      localStorage.removeItem('jc_admin_user');
      authToken = '';
      currentUser = null;
      showLogin();
    });
  }
}

function showLogin() {
  document.getElementById('login-view').classList.remove('hidden');
  document.getElementById('dashboard-view').classList.add('hidden');
}

function showDashboard() {
  document.getElementById('login-view').classList.add('hidden');
  document.getElementById('dashboard-view').classList.remove('hidden');
  if (currentUser) {
    document.getElementById('user-display').textContent = currentUser.full_name || currentUser.username;
  }
  loadLeads();
  loadAgents();
  loadTestimonials();
  loadSettings();
}

function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  };
}

// ================= 2. TABS SWITCHING =================
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('tab-active');
        t.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-slate-800');
      });
      tab.classList.add('tab-active');
      tab.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-slate-800');

      const targetId = tab.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.remove('hidden');
    });
  });
}

// ================= 3. LEADS CRM =================
function initLeadsListeners() {
  const filterStatus = document.getElementById('filter-lead-status');
  const searchInput = document.getElementById('search-lead');
  const refreshBtn = document.getElementById('btn-refresh-leads');
  const exportBtn = document.getElementById('btn-export-csv');

  if (filterStatus) filterStatus.addEventListener('change', () => loadLeads());
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => loadLeads(), 300);
    });
  }
  if (refreshBtn) refreshBtn.addEventListener('click', () => loadLeads());
  if (exportBtn) exportBtn.addEventListener('click', () => exportLeadsCSV());
}

async function loadLeads() {
  const status = document.getElementById('filter-lead-status')?.value || 'ALL';
  const search = document.getElementById('search-lead')?.value || '';
  const tbody = document.getElementById('leads-table-body');

  try {
    const res = await fetch(`${API_BASE}/admin/leads?status=${encodeURIComponent(status)}&search=${encodeURIComponent(search)}`, {
      headers: getAuthHeaders()
    });
    if (res.status === 401) return showLogin();
    const data = await res.json();
    currentLeads = data.leads || [];

    // Update stats
    if (data.stats) {
      document.getElementById('stat-total-leads').textContent = data.stats.total || 0;
      document.getElementById('stat-baru-leads').textContent = data.stats.baru || 0;
      document.getElementById('stat-semakan-leads').textContent = data.stats.semakan || 0;
      document.getElementById('stat-lulus-leads').textContent = data.stats.lulus || 0;
      document.getElementById('badge-leads-count').textContent = data.stats.total || 0;
    }

    renderLeadsTable(currentLeads);
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-rose-400">Gagal memuatkan data leads.</td></tr>`;
  }
}

function renderLeadsTable(leads) {
  const tbody = document.getElementById('leads-table-body');
  if (!leads || leads.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-10 text-slate-500">Tiada permohonan dijumpai.</td></tr>`;
    return;
  }

  tbody.innerHTML = leads.map(l => {
    const cleanPhone = l.phone.replace(/\D/g, '');
    const waUrl = `https://wa.me/${cleanPhone.startsWith('60') ? cleanPhone : '60' + cleanPhone.replace(/^0/, '')}?text=${encodeURIComponent(`Salam ${l.applicant_name}, saya perunding pinjaman dari JomConsult mengenai permohonan semakan kelayakan anda.`)}`;
    
    let statusClass = 'bg-slate-800 text-slate-300 border-slate-700';
    if (l.status === 'BARU') statusClass = 'bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold';
    if (l.status === 'DALAM SEMAKAN') statusClass = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    if (l.status === 'LULUS') statusClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold';
    if (l.status === 'DITOLAK') statusClass = 'bg-rose-500/20 text-rose-300 border-rose-500/30';

    return `
      <tr class="hover:bg-slate-850/50 transition">
        <td class="py-3.5 px-4 font-mono text-[11px]">
          <span class="font-bold text-white block">#${l.id}</span>
          <span class="text-slate-400 text-[10px]">${l.created_at || '-'}</span>
        </td>
        <td class="py-3.5 px-4">
          <span class="font-bold text-white block">${l.applicant_name}</span>
          <a href="${waUrl}" target="_blank" class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 mt-0.5">
            <span>💬 ${l.phone}</span>
          </a>
        </td>
        <td class="py-3.5 px-4">
          <span class="text-slate-200 block">${l.sector || '-'}</span>
          <span class="text-[10px] text-slate-400">Gaji: ${l.salary || '-'}</span>
        </td>
        <td class="py-3.5 px-4">
          <span class="text-slate-300 font-medium block">${l.loan_purpose || 'Penyatuan Hutang'}</span>
          <span class="text-[10px] text-slate-400">Isu: ${l.credit_issues || 'Tiada'}</span>
        </td>
        <td class="py-3.5 px-4">
          <select onchange="updateLeadStatus(${l.id}, this.value)" class="text-[11px] rounded-lg px-2.5 py-1 border ${statusClass} bg-slate-900 focus:outline-none cursor-pointer">
            <option value="BARU" ${l.status === 'BARU' ? 'selected' : ''}>BARU</option>
            <option value="DALAM SEMAKAN" ${l.status === 'DALAM SEMAKAN' ? 'selected' : ''}>DALAM SEMAKAN</option>
            <option value="HANTAR KE BANK" ${l.status === 'HANTAR KE BANK' ? 'selected' : ''}>HANTAR KE BANK</option>
            <option value="LULUS" ${l.status === 'LULUS' ? 'selected' : ''}>LULUS</option>
            <option value="DITOLAK" ${l.status === 'DITOLAK' ? 'selected' : ''}>DITOLAK</option>
          </select>
        </td>
        <td class="py-3.5 px-4">
          <button onclick="deleteLead(${l.id})" class="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition" title="Padam">
            🗑️
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

window.updateLeadStatus = async function(id, newStatus) {
  try {
    const res = await fetch(`${API_BASE}/admin/leads`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ id, status: newStatus })
    });
    if (res.ok) {
      loadLeads();
    }
  } catch (err) {
    alert('Gagal mengemaskini status lead.');
  }
};

window.deleteLead = async function(id) {
  if (!confirm(`Adakah anda pasti ingin memadamkan rekod pemohon #${id}?`)) return;
  try {
    const res = await fetch(`${API_BASE}/admin/leads?id=${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      loadLeads();
    }
  } catch (err) {
    alert('Gagal memadam lead.');
  }
};

function exportLeadsCSV() {
  if (!currentLeads || currentLeads.length === 0) {
    alert('Tiada data permohonan untuk diexport.');
    return;
  }

  const headers = ['ID', 'Nama Pemohon', 'No Telefon', 'Sektor', 'Gaji', 'Komitmen', 'Tujuan', 'Isu Kredit', 'Status', 'Tarikh'];
  const rows = currentLeads.map(l => [
    l.id,
    `"${(l.applicant_name || '').replace(/"/g, '""')}"`,
    `"${l.phone || ''}"`,
    `"${l.sector || ''}"`,
    `"${l.salary || ''}"`,
    `"${l.commitment || ''}"`,
    `"${l.loan_purpose || ''}"`,
    `"${l.credit_issues || ''}"`,
    `"${l.status || ''}"`,
    `"${l.created_at || ''}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `JomConsult_Leads_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ================= 4. AGENTS MANAGEMENT =================
async function loadAgents() {
  const container = document.getElementById('agents-grid');
  try {
    const res = await fetch(`${API_BASE}/admin/agents`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    currentAgents = data.agents || [];

    document.getElementById('badge-agents-count').textContent = currentAgents.length;

    if (currentAgents.length === 0) {
      container.innerHTML = `<div class="col-span-3 text-center py-10 text-slate-500">Tiada ejen didaftarkan.</div>`;
      return;
    }

    container.innerHTML = currentAgents.map(a => {
      const isAktif = a.status.includes('AKTIF');
      return `
        <div class="p-5 rounded-2xl bg-slate-900 border ${isAktif ? 'border-slate-800' : 'border-rose-900/60 bg-rose-950/20'} space-y-4">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl ${a.avatar_bg || 'bg-emerald-700'} flex items-center justify-center font-extrabold text-white text-xs">
                ${a.initials || 'JC'}
              </div>
              <div>
                <span class="font-bold text-white text-xs block">${a.name}</span>
                <span class="text-[10px] font-mono text-emerald-400 font-bold">${a.staff_id}</span>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${isAktif ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}">
              ${isAktif ? 'AKTIF' : 'DIGANTUNG'}
            </span>
          </div>

          <div class="space-y-1.5 text-xs text-slate-300 pt-1 border-t border-slate-800">
            <div class="text-[11px] text-slate-400">Jawatan: <span class="text-white">${a.role}</span></div>
            <div class="text-[11px] text-slate-400">WhatsApp: <a href="https://wa.me/${a.phone}" target="_blank" class="text-emerald-400 hover:underline">${a.phone_display || a.phone}</a></div>
            <div class="text-[11px] text-slate-400">Zon: <span class="text-white">${a.zone}</span></div>
            <div class="text-[10px] text-slate-500">Semakan Anti-Scam: <span class="font-mono text-white">${a.verification_count || 0} kali</span></div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-800">
            <button onclick="toggleAgentStatus(${a.id}, '${isAktif ? 'DIGANTUNG' : 'AKTIF & BERDAFTAR'}')" class="text-[11px] font-bold ${isAktif ? 'text-amber-400 hover:underline' : 'text-emerald-400 hover:underline'}">
              ${isAktif ? 'Gantung Status' : 'Aktifkan Semula'}
            </button>
            <div class="flex items-center gap-2">
              <button onclick="editAgentModal(${a.id})" class="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg text-xs">✏️ Edit</button>
              <button onclick="deleteAgent(${a.id})" class="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 rounded-lg text-xs">🗑️</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
  }
}

// Modal open/close for Agent
document.getElementById('btn-add-agent-modal')?.addEventListener('click', () => {
  document.getElementById('form-agent').reset();
  document.getElementById('agent-id').value = '';
  document.getElementById('modal-agent-title').textContent = 'Tambah Ejen Baharu';
  document.getElementById('modal-agent').classList.remove('hidden');
});

window.closeAgentModal = function() {
  document.getElementById('modal-agent').classList.add('hidden');
};

window.editAgentModal = function(id) {
  const a = currentAgents.find(x => x.id === id);
  if (!a) return;
  document.getElementById('agent-id').value = a.id;
  document.getElementById('agent-staff-id').value = a.staff_id;
  document.getElementById('agent-name').value = a.name;
  document.getElementById('agent-role').value = a.role;
  document.getElementById('agent-phone').value = a.phone;
  document.getElementById('agent-status').value = a.status;
  document.getElementById('agent-specialty').value = a.specialty || '';
  document.getElementById('agent-branch').value = a.branch || '';
  document.getElementById('agent-zone').value = a.zone || '';
  document.getElementById('modal-agent-title').textContent = 'Kemaskini Ejen';
  document.getElementById('modal-agent').classList.remove('hidden');
};

document.getElementById('form-agent')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('agent-id').value;
  const payload = {
    staff_id: document.getElementById('agent-staff-id').value,
    name: document.getElementById('agent-name').value,
    role: document.getElementById('agent-role').value,
    phone: document.getElementById('agent-phone').value,
    status: document.getElementById('agent-status').value,
    specialty: document.getElementById('agent-specialty').value,
    branch: document.getElementById('agent-branch').value,
    zone: document.getElementById('agent-zone').value
  };

  try {
    const res = await fetch(`${API_BASE}/admin/agents`, {
      method: id ? 'PUT' : 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(id ? { id: parseInt(id), ...payload } : payload)
    });
    const data = await res.json();
    if (res.ok && data.success) {
      closeAgentModal();
      loadAgents();
    } else {
      alert(data.error || 'Gagal menyimpan maklumat ejen.');
    }
  } catch (err) {
    alert('Ralat sambungan.');
  }
});

window.toggleAgentStatus = async function(id, newStatus) {
  try {
    const res = await fetch(`${API_BASE}/admin/agents`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ id, status: newStatus })
    });
    if (res.ok) loadAgents();
  } catch (err) {
    alert('Gagal menukar status ejen.');
  }
};

window.deleteAgent = async function(id) {
  if (!confirm('Adakah anda pasti ingin memadamkan ejen ini?')) return;
  try {
    const res = await fetch(`${API_BASE}/admin/agents?id=${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) loadAgents();
  } catch (err) {
    alert('Gagal memadam ejen.');
  }
};

// ================= 5. TESTIMONIALS MANAGEMENT =================
async function loadTestimonials() {
  const container = document.getElementById('testimonials-grid');
  try {
    const res = await fetch(`${API_BASE}/admin/testimonials`, { headers: getAuthHeaders() });
    const data = await res.json();
    const list = data.testimonials || [];

    container.innerHTML = list.map(t => `
      <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div class="flex items-start justify-between">
          <div>
            <span class="font-bold text-white text-xs block">${t.client_name}</span>
            <span class="text-[11px] text-emerald-400 font-semibold">${t.profession}</span>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
            Lulus: ${t.loan_approved}
          </span>
        </div>
        <p class="text-xs text-slate-300 italic">"${t.story || t.original_issue}"</p>
        <div class="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
          <span>Jimat: <strong class="text-emerald-400">${t.monthly_savings || '-'}</strong></span>
          <button onclick="deleteTestimonial(${t.id})" class="text-slate-400 hover:text-rose-400 text-xs">Padam 🗑️</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
  }
}

window.deleteTestimonial = async function(id) {
  if (!confirm('Padamkan testimoni ini?')) return;
  try {
    const res = await fetch(`${API_BASE}/admin/testimonials?id=${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    if (res.ok) loadTestimonials();
  } catch (err) {}
};

// ================= 6. SITE SETTINGS =================
async function loadSettings() {
  try {
    const res = await fetch(`${API_BASE}/admin/settings`, { headers: getAuthHeaders() });
    const data = await res.json();
    const settings = {};
    (data.settings || []).forEach(s => settings[s.key] = s.value);

    if (settings.whatsapp_number) document.getElementById('set-whatsapp').value = settings.whatsapp_number;
    if (settings.phone_display) document.getElementById('set-phone-display').value = settings.phone_display;
    if (settings.email) document.getElementById('set-email').value = settings.email;
    if (settings.address) document.getElementById('set-address').value = settings.address;
    if (settings.office_hours) document.getElementById('set-hours').value = settings.office_hours;
    if (settings.min_interest_rate) document.getElementById('set-rate').value = settings.min_interest_rate;
    if (settings.max_loan_amount) document.getElementById('set-max-loan').value = settings.max_loan_amount;
    if (settings.announcement_text) document.getElementById('set-announcement').value = settings.announcement_text;
  } catch (err) {
    console.error(err);
  }
}

function initSettingsListeners() {
  const form = document.getElementById('settings-form');
  const alertBox = document.getElementById('settings-alert');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        whatsapp_number: document.getElementById('set-whatsapp').value.trim(),
        phone_display: document.getElementById('set-phone-display').value.trim(),
        email: document.getElementById('set-email').value.trim(),
        address: document.getElementById('set-address').value.trim(),
        office_hours: document.getElementById('set-hours').value.trim(),
        min_interest_rate: document.getElementById('set-rate').value.trim(),
        max_loan_amount: document.getElementById('set-max-loan').value.trim(),
        announcement_text: document.getElementById('set-announcement').value.trim()
      };

      try {
        const res = await fetch(`${API_BASE}/admin/settings`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        alertBox.textContent = data.message || 'Tetapan berjaya disimpan.';
        alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
        alertBox.classList.remove('hidden');
        setTimeout(() => alertBox.classList.add('hidden'), 4000);
      } catch (err) {
        alertBox.textContent = 'Ralat menyimpan tetapan.';
        alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30';
        alertBox.classList.remove('hidden');
      }
    });
  }
}
