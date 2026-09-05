/**
 * JomConsult Theme Switcher Engine (Demo Client Feature)
 * Allows client to preview 5 distinct color schemes live on any page.
 * Stores preference in localStorage so it persists across page navigation.
 */

const THEMES = [
  {
    id: 'black-gold',
    name: '1. Hitam & Emas Hangat',
    tag: 'Hitam Obsidian',
    colors: ['#0b0f19', '#eab308'],
    desc: 'Latar hitam obsidian mewah dengan ambient glow emas hangat & kontras tinggi.'
  },
  {
    id: 'navy-gold',
    name: '2. Biru Korporat & Emas',
    tag: 'Institusi & Bank',
    colors: ['#071021', '#eab308'],
    desc: 'Latar biru gelap korporat (Navy) melambangkan autoriti dan kredibiliti perbankan.'
  },
  {
    id: 'emerald-gold',
    name: '3. Hijau Zamrud & Emas',
    tag: 'Syariah & Kemakmuran',
    colors: ['#051912', '#facc15'],
    desc: 'Latar hijau zamrud gelap berprestij, sesuai untuk pembiayaan patuh Syariah.'
  },
  {
    id: 'graphite-gold',
    name: '4. Kelabu Titanium & Kuning',
    tag: 'Moden Fintech',
    colors: ['#15171c', '#fde047'],
    desc: 'Latar kelabu grafit titanium moden dengan aksen kuning matahari yang bertenaga.'
  },
  {
    id: 'light-gold',
    name: '5. Putih Bersih & Emas Gelap',
    tag: 'Cerah (Light Mode)',
    colors: ['#f8fafc', '#ca8a04'],
    desc: 'Latar putih bersih yang terang, kemas dan santai dengan tulisan gelap yang jelas.'
  }
];

function getStoredTheme() {
  if (!localStorage.getItem('jomconsult_default_v2')) {
    localStorage.setItem('jomconsult_theme', 'light-gold');
    localStorage.setItem('jomconsult_default_v2', 'true');
    return 'light-gold';
  }
  return localStorage.getItem('jomconsult_theme') || 'light-gold';
}

export function applyTheme(themeId, save = true) {
  document.documentElement.setAttribute('data-theme', themeId);
  if (document.body) {
    document.body.setAttribute('data-theme', themeId);
  }

  // Handle Logo swap ONLY for header & mobile menu (Footer ALWAYS stays white logo)
  const headerLogos = document.querySelectorAll('header img[src*="logo"], #mobile-menu img[src*="logo"]');
  headerLogos.forEach(img => {
    if (themeId === 'light-gold') {
      if (img.src.includes('logo-white.png')) {
        img.src = img.src.replace('logo-white.png', 'logo.png');
      }
    } else {
      if (img.src.includes('logo.png') && !img.src.includes('logo-white.png')) {
        img.src = img.src.replace('logo.png', 'logo-white.png');
      }
    }
  });

  // Ensure footer logo is always white logo
  const footerLogos = document.querySelectorAll('footer img[src*="logo"]');
  footerLogos.forEach(img => {
    if (img.src.includes('logo.png') && !img.src.includes('logo-white.png')) {
      img.src = img.src.replace('logo.png', 'logo-white.png');
    }
  });

  if (save) {
    localStorage.setItem('jomconsult_theme', themeId);
  }

  // Update active state in modal if open
  updateModalActiveState(themeId);
}

function updateModalActiveState(activeId) {
  const cards = document.querySelectorAll('.theme-option-card');
  cards.forEach(card => {
    const themeId = card.getAttribute('data-theme-id');
    const badge = card.querySelector('.theme-active-indicator');
    const tag = card.querySelector('.jc-card-tag');
    const themeConfig = THEMES.find(t => t.id === themeId);
    if (themeId === activeId) {
      card.classList.add('active-theme');
      if (badge) badge.classList.remove('hidden');
      if (tag) tag.textContent = '✓ AKTIF';
    } else {
      card.classList.remove('active-theme');
      if (badge) badge.classList.add('hidden');
      if (tag && themeConfig) tag.textContent = themeConfig.tag;
    }
  });
}

function initThemeSwitcher() {
  // Apply saved theme immediately
  const initialTheme = getStoredTheme();
  applyTheme(initialTheme, false);

  // Avoid duplicate injection
  if (document.getElementById('jc-theme-switcher-widget')) return;

  const container = document.createElement('div');
  container.id = 'jc-theme-switcher-widget';
  container.className = 'fixed bottom-5 left-5 z-[99999]';

  container.innerHTML = `
    <!-- Floating Trigger Pill Button (No emoji, clean modern dot) -->
    <button id="jc-theme-toggle-btn" type="button" class="flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer group">
      <span class="relative flex h-2.5 w-2.5 shrink-0">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
      </span>
      <span class="jc-btn-label">Tukar Warna Web</span>
    </button>

    <!-- Theme Selection Modal / Drawer -->
    <div id="jc-theme-modal" class="hidden fixed bottom-16 left-3 sm:left-6 w-[94vw] max-w-sm sm:max-w-md rounded-3xl p-4 sm:p-5 shadow-2xl animate-fadeIn max-h-[88vh] flex flex-col justify-between">
      <div class="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-yellow-400/15 border border-yellow-400/30 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a10 10 0 0 1 0 20v-20z"></path>
            </svg>
          </div>
          <div>
            <h3 class="jc-modal-title text-sm leading-tight">Pilih Tema Warna Web</h3>
            <p class="jc-modal-subtitle text-[11px]">Ujian Pilihan Klien (5 Tema)</p>
          </div>
        </div>
        <button id="jc-close-theme-modal" type="button" class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer">
          ✕
        </button>
      </div>

      <p class="jc-modal-intro py-2">
        Klik warna di bawah untuk melihat rupa website secara langsung. Pilihan disimpan automatik semasa melayari web.
      </p>

      <!-- Theme Cards List (Room for all 5 themes) -->
      <div class="space-y-1.5 max-h-[58vh] sm:max-h-[62vh] overflow-y-auto pr-1">
        ${THEMES.map(theme => {
          const isActive = theme.id === initialTheme;
          return `
          <div class="theme-option-card flex items-start gap-3 ${isActive ? 'active-theme' : ''}" data-theme-id="${theme.id}">
            <!-- Color Preview Circles -->
            <div class="flex items-center -space-x-1.5 shrink-0 mt-0.5">
              <div class="w-5 h-5 rounded-full border border-white/30 shadow-sm" style="background-color: ${theme.colors[0]};"></div>
              <div class="w-5 h-5 rounded-full border border-white/30 shadow-sm" style="background-color: ${theme.colors[1]};"></div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1.5 mb-0.5">
                <span class="jc-card-title truncate">${theme.name}</span>
                <span class="jc-card-tag shrink-0">${isActive ? '✓ AKTIF' : theme.tag}</span>
              </div>
              <p class="jc-card-desc">${theme.desc}</p>
            </div>

            <div class="theme-active-indicator shrink-0 self-center ${isActive ? '' : 'hidden'}">
              <span class="jc-active-badge">✓</span>
            </div>
          </div>
          `;
        }).join('')}
      </div>

      <!-- Footer Note -->
      <div class="jc-modal-footer flex items-center justify-between">
        <span class="jc-status-pill flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Pratonton Langsung
        </span>
        <button id="jc-done-theme-modal" type="button">
          Tutup & Lihat
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // Event Listeners
  const toggleBtn = document.getElementById('jc-theme-toggle-btn');
  const modal = document.getElementById('jc-theme-modal');
  const closeBtn = document.getElementById('jc-close-theme-modal');
  const doneBtn = document.getElementById('jc-done-theme-modal');

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.classList.toggle('hidden');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  doneBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Theme option clicks
  const themeCards = container.querySelectorAll('.theme-option-card');
  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      const selectedId = card.getAttribute('data-theme-id');
      applyTheme(selectedId, true);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      modal.classList.add('hidden');
    }
  });
}

// Initialize as soon as DOM is interactive
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeSwitcher);
} else {
  initThemeSwitcher();
}
