/**
 * JomConsult Theme Switcher Engine (Demo Client Feature)
 * Allows client to preview 5 distinct color schemes live on any page.
 * Stores preference in localStorage so it persists across page navigation.
 */

const THEMES = [
  {
    id: 'black-gold',
    name: '1. Hitam & Emas Hangat',
    tag: 'Tema Semasa',
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
    tag: 'Cerah & Segar (Light)',
    colors: ['#f8fafc', '#ca8a04'],
    desc: 'Latar putih bersih yang terang, kemas dan santai dengan tulisan gelap yang jelas.'
  }
];

function getStoredTheme() {
  return localStorage.getItem('jomconsult_theme') || 'black-gold';
}

export function applyTheme(themeId, save = true) {
  document.documentElement.setAttribute('data-theme', themeId);
  if (document.body) {
    document.body.setAttribute('data-theme', themeId);
  }

  // Handle Logo swap between dark/light themes
  const logos = document.querySelectorAll('img[src*="logo"]');
  logos.forEach(img => {
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
    if (themeId === activeId) {
      card.classList.add('active-theme');
      if (badge) badge.classList.remove('hidden');
    } else {
      card.classList.remove('active-theme');
      if (badge) badge.classList.add('hidden');
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
    <!-- Floating Trigger Pill Button -->
    <button id="jc-theme-toggle-btn" type="button" class="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/95 hover:bg-slate-800 text-white rounded-full shadow-2xl border-2 border-yellow-400 transition-all transform hover:scale-105 active:scale-95 backdrop-blur-md cursor-pointer group">
      <span class="text-base animate-bounce">🎨</span>
      <span class="text-xs font-extrabold tracking-wide text-yellow-300 group-hover:text-white transition">Tukar Warna Web</span>
      <span class="inline-flex h-2 w-2 rounded-full bg-yellow-400"></span>
    </button>

    <!-- Theme Selection Modal / Drawer -->
    <div id="jc-theme-modal" class="hidden fixed bottom-16 left-3 sm:left-6 w-[94vw] max-w-sm sm:max-w-md bg-slate-900/98 border-2 border-yellow-500/40 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl text-slate-100 animate-fadeIn max-h-[82vh] flex flex-col justify-between">
      <div class="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <span class="text-xl">🎨</span>
          <div>
            <h3 class="font-extrabold text-sm text-white leading-tight">Pilih Tema Warna Web</h3>
            <p class="text-[11px] text-yellow-400 font-medium">Ujian Pilihan Klien</p>
          </div>
        </div>
        <button id="jc-close-theme-modal" class="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold transition cursor-pointer">
          ✕
        </button>
      </div>

      <p class="text-[11px] text-slate-300 py-2 leading-relaxed">
        Klik warna di bawah untuk melihat rupa website secara langsung. Pilihan disimpan automatik semasa melayari web.
      </p>

      <!-- Theme Cards List -->
      <div class="space-y-2 max-h-[38vh] sm:max-h-[44vh] overflow-y-auto pr-1">
        ${THEMES.map(theme => `
          <div class="theme-option-card flex items-start gap-3 p-3 rounded-2xl border border-slate-800 bg-slate-950/70 hover:border-yellow-400/60 transition ${theme.id === initialTheme ? 'active-theme' : ''}" data-theme-id="${theme.id}">
            <!-- Color Preview Circles -->
            <div class="flex items-center -space-x-1.5 shrink-0 mt-1">
              <div class="w-5 h-5 rounded-full border border-white/20 shadow-sm" style="background-color: ${theme.colors[0]};"></div>
              <div class="w-5 h-5 rounded-full border border-white/20 shadow-sm" style="background-color: ${theme.colors[1]};"></div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1.5 mb-0.5">
                <span class="font-extrabold text-xs text-white truncate">${theme.name}</span>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 whitespace-nowrap">${theme.tag}</span>
              </div>
              <p class="text-[11px] text-slate-300 leading-snug">${theme.desc}</p>
            </div>

            <div class="theme-active-indicator shrink-0 self-center ${theme.id === initialTheme ? '' : 'hidden'}">
              <span class="w-5 h-5 rounded-full bg-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center">✓</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Footer Note -->
      <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
        <span class="text-slate-400 text-[11px] font-medium flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Pratonton Langsung
        </span>
        <button id="jc-done-theme-modal" class="px-5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold text-xs transition cursor-pointer shadow-md shadow-yellow-500/20">
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
