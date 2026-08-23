const OFFICIAL_WHATSAPP_SVG = '<svg class="w-4 h-4 fill-current text-[#25D366] inline-block shrink-0" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.564 1.724.814 2.796.814 3.18 0 5.767-2.588 5.767-5.766.001-3.182-2.585-5.77-5.767-5.77zm3.364 8.163c-.144.405-.837.774-1.17.825-.313.05-.725.09-2.072-.472-1.614-.672-2.656-2.316-2.736-2.423-.08-.107-.649-.864-.649-1.649 0-.784.408-1.171.553-1.332.145-.16.319-.2.425-.2.106 0 .213 0 .307.006.1.006.234-.038.365.281.135.327.464 1.132.505 1.215.041.083.069.18.014.288-.055.109-.083.176-.164.271-.082.096-.172.214-.246.287-.082.083-.169.173-.072.339.096.166.428.706.918 1.142.631.562 1.162.736 1.328.819.166.082.263.072.36-.041.097-.113.417-.487.528-.654.111-.167.222-.139.373-.083.152.056.963.454 1.129.537.166.083.277.125.318.194.042.069.042.402-.102.807z"/></svg>';

/**
 * JomConsult Solutions - Multi-Page Website Interactive Engine
 * Handling Navigation, Calculator, Multi-Step Form, Verification Portal, Papaipay Hero Slider & Animation
 */

const JOMCONSULT_CONFIG = {
  name: "JomConsult Solutions",
  whatsappNumber: "601171191170",
  email: "hello@jomconsult.com.my",
  phoneDisplay: "+60 11-7119 1170",
  address: "A-10-12, Radia Office Bukit Jelutong, Persiaran Arked, 40150 Shah Alam, Selangor",
  hours: "Isnin - Jumaat: 10:00 AM - 6:00 PM"
};

// Database Ejen & Perunding Kewangan Sah JomConsult
const OFFICIAL_AGENTS = [
  {
    id: "JC-1021",
    name: "Mohd Ali bin Osman",
    role: "Pakar Penstrukturan DSR & Penyatuan Hutang",
    phone: "601171191170",
    phoneDisplay: "011-7119 1170",
    branch: "Ibu Pejabat (Radia Bukit Jelutong, Shah Alam)",
    zone: "Selangor & Kuala Lumpur",
    status: "AKTIF & BERDAFTAR",
    joinedDate: "12 Januari 2021",
    rating: "4.9 / 5.0",
    initials: "AO",
    specialty: "Penyatuan Hutang & Pinjaman Koperasi",
    avatarBg: "bg-emerald-700"
  },
  {
    id: "JC-1045",
    name: "Siti Nurul Aminah binti Razak",
    role: "Konsultan Pinjaman Peribadi Swasta & Bank",
    phone: "60172551461",
    phoneDisplay: "017-255 1461",
    branch: "Cawangan Wilayah Utara (Pulau Pinang)",
    zone: "Penang, Kedah & Perak",
    status: "AKTIF & BERDAFTAR",
    joinedDate: "03 Mac 2022",
    rating: "4.9 / 5.0",
    initials: "SA",
    specialty: "Pinjaman Swasta MNC & Eksekutif",
    avatarBg: "bg-teal-700"
  },
  {
    id: "JC-1088",
    name: "Muhammad Farhan bin Rosli",
    role: "Pakar Penstrukturan & Pemulihan Profil CCRIS",
    phone: "60172551462",
    phoneDisplay: "017-255 1462",
    branch: "Cawangan Wilayah Selatan (Johor Bahru)",
    zone: "Johor, Melaka & Negeri Sembilan",
    status: "AKTIF & BERDAFTAR",
    joinedDate: "10 Ogos 2022",
    rating: "5.0 / 5.0",
    initials: "FR",
    specialty: "CCRIS / SAA & Mortgage Refinance",
    avatarBg: "bg-indigo-700"
  },
  {
    id: "JC-1102",
    name: "Noraini binti Kassim",
    role: "Penasihat Pembiayaan Penjawat Awam (AG / KKM / Guru)",
    phone: "60172551463",
    phoneDisplay: "017-255 1463",
    branch: "Cawangan Pantai Timur (Kuantan)",
    zone: "Pahang, Terengganu & Kelantan",
    status: "AKTIF & BERDAFTAR",
    joinedDate: "01 Februari 2023",
    rating: "4.8 / 5.0",
    initials: "NK",
    specialty: "Koperasi BPA Angkasa & PDRM",
    avatarBg: "bg-amber-700"
  },
  {
    id: "JC-1120",
    name: "Hafiz bin Zainal Abidin",
    role: "Pengurus Khidmat Pelanggan & Analisis Kelayakan",
    phone: "601171191170",
    phoneDisplay: "011-7119 1170",
    branch: "Ibu Pejabat (Radia Bukit Jelutong, Shah Alam)",
    zone: "Seluruh Malaysia",
    status: "AKTIF & BERDAFTAR",
    joinedDate: "15 November 2020",
    rating: "5.0 / 5.0",
    initials: "HZ",
    specialty: "Diagnostik Slip Gaji & Semakan Percuma",
    avatarBg: "bg-slate-800"
  }
];

// 0. Live Cloudflare D1 Config Sync
async function loadDynamicConfig() {
  try {
    const res = await fetch('/api/public/config');
    if (!res.ok) return;
    const cfg = await res.json();
    if (cfg.whatsapp_number) {
      JOMCONSULT_CONFIG.whatsappNumber = cfg.whatsapp_number;
      document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        const href = a.getAttribute('href');
        a.setAttribute('href', href.replace(/wa\.me\/\d+/, `wa.me/${cfg.whatsapp_number}`));
      });
    }
    if (cfg.phone_display) {
      JOMCONSULT_CONFIG.phoneDisplay = cfg.phone_display;
    }
  } catch (e) {
    // Graceful offline fallback
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDynamicConfig();
  initMobileMenu();
  initPapaipayHeroSlider();
  initCountUpAnimations();
  initEligibilityWizard();
  initSavingsCalculator();
  initFAQAccordion();
  initAgentVerification();
});

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('close-mobile-menu');

  if (btn && drawer) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      drawer.classList.remove('hidden');
      drawer.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      drawer.classList.add('hidden');
      drawer.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }

  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.add('hidden');
        drawer.classList.remove('flex');
        document.body.style.overflow = '';
      }
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.add('hidden');
        drawer.classList.remove('flex');
        document.body.style.overflow = '';
      });
    });
  }
}

// 2. Papaipay-Style Hero Slider
function initPapaipayHeroSlider() {
  const totalSlides = 3;
  let activeIndex = 0;
  let timer = null;

  const bgSlides = [
    document.getElementById('hero-slide-bg-0'),
    document.getElementById('hero-slide-bg-1'),
    document.getElementById('hero-slide-bg-2')
  ];

  const textSlides = [
    document.getElementById('hero-text-0'),
    document.getElementById('hero-text-1'),
    document.getElementById('hero-text-2')
  ];

  const dots = document.querySelectorAll('.hero-dot-btn');

  if (!bgSlides[0] || !textSlides[0]) return;

  function showSlide(index) {
    activeIndex = index;

    bgSlides.forEach((bg, i) => {
      if (bg) {
        if (i === activeIndex) {
          bg.classList.remove('opacity-0');
          bg.classList.add('opacity-100');
        } else {
          bg.classList.remove('opacity-100');
          bg.classList.add('opacity-0');
        }
      }
    });

    textSlides.forEach((txt, i) => {
      if (txt) {
        if (i === activeIndex) {
          txt.classList.remove('opacity-0', 'pointer-events-none');
          txt.classList.add('opacity-100');
        } else {
          txt.classList.remove('opacity-100');
          txt.classList.add('opacity-0', 'pointer-events-none');
        }
      }
    });

    dots.forEach((d, i) => {
      if (i === activeIndex) {
        d.classList.remove('bg-white/40', 'w-2.5');
        d.classList.add('bg-white', 'w-8');
      } else {
        d.classList.remove('bg-white', 'w-8');
        d.classList.add('bg-white/40', 'w-2.5');
      }
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(() => {
      const next = (activeIndex + 1) % totalSlides;
      showSlide(next);
    }, 5500);
  }

  function stopAutoPlay() {
    if (timer) clearInterval(timer);
  }

  dots.forEach(d => {
    d.addEventListener('click', () => {
      const idx = parseInt(d.getAttribute('data-index')) || 0;
      showSlide(idx);
      startAutoPlay();
    });
  });

  startAutoPlay();
}

// 3. Count-Up Animations on Scroll
function initCountUpAnimations() {
  const counters = document.querySelectorAll('[data-counter-end]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const end = parseFloat(el.getAttribute('data-counter-end')) || 0;
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-counter-decimals')) || 0;
        const duration = 1800;

        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = easeProgress * end;
          el.innerText = prefix + (decimals > 0 ? current.toFixed(decimals) : Math.round(current)) + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.innerText = prefix + (decimals > 0 ? end.toFixed(decimals) : Math.round(end)) + suffix;
          }
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  counters.forEach(c => observer.observe(c));
}

// 4. Multi-Step Eligibility Form
function initEligibilityWizard() {
  const formContainer = document.getElementById('eligibility-form-container');
  if (!formContainer) return;

  let currentStep = 1;
  let data = {
    employment: 'Swasta / Korporat',
    salary: 'RM3,000 - RM5,000',
    loanAmount: 'RM50,000 - RM100,000',
    mainIssue: 'Komitmen Tinggi (DSR Terlebih)',
    name: '',
    phone: ''
  };

  const step1 = document.getElementById('wizard-step-1');
  const step2 = document.getElementById('wizard-step-2');
  const step3 = document.getElementById('wizard-step-3');
  const result = document.getElementById('wizard-result');
  const progressBar = document.getElementById('wizard-progress-bar');
  const stepIndicator = document.getElementById('wizard-step-indicator');

  const btnNext = document.getElementById('wizard-next-btn');
  const btnPrev = document.getElementById('wizard-prev-btn');

  function updateView() {
    if (progressBar) progressBar.style.width = ((currentStep / 3) * 100) + '%';
    if (stepIndicator) stepIndicator.innerText = `Langkah ${currentStep} dari 3`;

    if (step1) step1.classList.toggle('hidden', currentStep !== 1);
    if (step2) step2.classList.toggle('hidden', currentStep !== 2);
    if (step3) step3.classList.toggle('hidden', currentStep !== 3);
    if (result) result.classList.toggle('hidden', currentStep !== 4);

    if (btnPrev) btnPrev.classList.toggle('hidden', currentStep <= 1 || currentStep >= 4);
    if (btnNext) {
      btnNext.classList.toggle('hidden', currentStep >= 4);
      btnNext.innerText = currentStep === 3 ? 'Dapatkan Analisa Kelayakan' : 'Seterusnya';
    }
  }

  document.querySelectorAll('.emp-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.emp-opt-btn').forEach(b => {
        b.classList.remove('bg-emerald-50', 'border-emerald-500', 'ring-2', 'ring-emerald-500/20');
        b.classList.add('bg-slate-50', 'border-slate-200');
      });
      btn.classList.add('bg-emerald-50', 'border-emerald-500', 'ring-2', 'ring-emerald-500/20');
      btn.classList.remove('bg-slate-50', 'border-slate-200');
      data.employment = btn.getAttribute('data-val');
    });
  });

  document.querySelectorAll('.salary-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.salary-opt-btn').forEach(b => {
        b.classList.remove('bg-emerald-50', 'border-emerald-500', 'text-emerald-800', 'ring-1', 'ring-emerald-500');
        b.classList.add('bg-slate-50', 'border-slate-200', 'text-slate-700');
      });
      btn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800', 'ring-1', 'ring-emerald-500');
      btn.classList.remove('bg-slate-50', 'border-slate-200', 'text-slate-700');
      data.salary = btn.getAttribute('data-val');
    });
  });

  document.querySelectorAll('.loan-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.loan-opt-btn').forEach(b => {
        b.classList.remove('bg-emerald-50', 'border-emerald-500', 'text-emerald-800', 'ring-1', 'ring-emerald-500');
        b.classList.add('bg-slate-50', 'border-slate-200', 'text-slate-700');
      });
      btn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800', 'ring-1', 'ring-emerald-500');
      btn.classList.remove('bg-slate-50', 'border-slate-200', 'text-slate-700');
      data.loanAmount = btn.getAttribute('data-val');
    });
  });

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStep < 3) {
        currentStep++;
        updateView();
      } else if (currentStep === 3) {
        const nameInput = document.getElementById('wizard-name-input');
        const phoneInput = document.getElementById('wizard-phone-input');
        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';

        if (!name || !phone) {
          alert('Sila masukkan Nama dan Nombor WhatsApp anda.');
          return;
        }

        data.name = name;
        data.phone = phone;

        const resName = document.getElementById('res-client-name');
        if (resName) resName.innerText = name;

        const waBtn = document.getElementById('wizard-whatsapp-send-btn');
        if (waBtn) {
          waBtn.onclick = () => {
            const msg = `Salam Penasihat JomConsult, saya telah semak kelayakan di laman web:\n\n` +
              `*Nama:* ${data.name}\n` +
              `*No. Telefon:* ${data.phone}\n` +
              `*Sektor:* ${data.employment}\n` +
              `*Gaji Bersih:* ${data.salary}\n` +
              `*Jumlah Diperlukan:* ${data.loanAmount}\n` +
              `*Isu Semasa:* ${data.mainIssue}\n\n` +
              `Mohon bantu analisa profil kredit saya secara percuma. Terima kasih!`;
            window.open(`https://wa.me/${JOMCONSULT_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
          };
        }

                // Asynchronous Lead Submission to Cloudflare D1 Backend
        fetch('/api/public/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            applicant_name: data.name,
            phone: data.phone,
            sector: data.employment,
            salary: data.salary,
            commitment: data.loanAmount,
            loan_purpose: 'Penyatuan Hutang',
            credit_issues: data.mainIssue
          })
        }).catch(err => console.log('D1 Lead intake note:', err));

        currentStep = 4;
        updateView();
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateView();
      }
    });
  }

  const resetBtn = document.getElementById('wizard-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentStep = 1;
      updateView();
    });
  }
}

// 5. Savings Calculator Logic
function initSavingsCalculator() {
  const debtSlider = document.getElementById('calc-debt-slider');
  const currentMonthlySlider = document.getElementById('calc-monthly-slider');
  const tenureButtons = document.querySelectorAll('.tenure-btn');

  const debtDisplay = document.getElementById('calc-debt-display');
  const monthlyDisplay = document.getElementById('calc-monthly-display');
  const newMonthlyDisplay = document.getElementById('calc-new-monthly');
  const savingsDisplay = document.getElementById('calc-savings-display');
  const yearlySavingsDisplay = document.getElementById('calc-yearly-savings');
  const shareBtn = document.getElementById('calc-share-whatsapp-btn');

  let tenureYears = 7;

  if (!debtSlider || !currentMonthlySlider) return;

  function recalculate() {
    const totalDebt = parseFloat(debtSlider.value) || 50000;
    const currentMonthly = parseFloat(currentMonthlySlider.value) || 1800;

    if (debtDisplay) debtDisplay.innerText = "RM " + Number(totalDebt).toLocaleString('en-MY');
    if (monthlyDisplay) monthlyDisplay.innerText = "RM " + Number(currentMonthly).toLocaleString('en-MY') + "/bln";

    const rate = 0.042;
    const totalInterest = totalDebt * rate * tenureYears;
    const newMonthly = Math.round((totalDebt + totalInterest) / (tenureYears * 12));
    const savings = Math.max(0, currentMonthly - newMonthly);
    const yearly = savings * 12;

    if (newMonthlyDisplay) newMonthlyDisplay.innerText = "~RM " + Number(newMonthly).toLocaleString('en-MY') + "/bln";
    if (savingsDisplay) savingsDisplay.innerText = "RM " + Number(savings).toLocaleString('en-MY');
    if (yearlySavingsDisplay) yearlySavingsDisplay.innerText = "RM " + Number(yearly).toLocaleString('en-MY');

    if (shareBtn) {
      shareBtn.onclick = () => {
        const text = `Salam JomConsult, saya gunakan kalkulator penjimatan hutang di web:\n\n` +
          `*Jumlah Hutang Ditutup:* RM ${totalDebt.toLocaleString()}\n` +
          `*Bayaran Bulanan Semasa:* RM ${currentMonthly.toLocaleString()}/bulan\n` +
          `*Anggaran Penjimatan Bulanan:* RM ${savings.toLocaleString()}/bulan\n\n` +
          `Boleh bantu saya buat permohonan penyatuan hutang ini?`;
        window.open(`https://wa.me/${JOMCONSULT_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
      };
    }
  }

  debtSlider.addEventListener('input', recalculate);
  currentMonthlySlider.addEventListener('input', recalculate);

  tenureButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tenureButtons.forEach(b => {
        b.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-600');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-300');
      });
      btn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-600');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-300');
      tenureYears = parseInt(btn.getAttribute('data-years')) || 7;
      recalculate();
    });
  });

  recalculate();
}

// 6. FAQ Accordion Logic
function initFAQAccordion() {
  document.querySelectorAll('.faq-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const body = parent.querySelector('.faq-content');
      const icon = btn.querySelector('.faq-icon');
      const isHidden = body.classList.contains('hidden');

      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180', 'text-emerald-700'));

      if (isHidden) {
        body.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180', 'text-emerald-700');
      }
    });
  });
}

// 7. Agent Verification System (Verify.html)
function initAgentVerification() {
  const form = document.getElementById('agent-search-form');
  const input = document.getElementById('agent-search-input');
  const resultContainer = document.getElementById('verification-result');
  const directoryContainer = document.getElementById('agents-directory');

  if (directoryContainer) {
    directoryContainer.innerHTML = OFFICIAL_AGENTS.map(agent => `
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-14 h-14 rounded-2xl ${agent.avatarBg} text-white flex items-center justify-center text-lg font-black shadow-md shrink-0">
              ${agent.initials}
            </div>
            <div>
              <div class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md mb-1">
                ${agent.status}
              </div>
              <h4 class="text-base font-bold text-slate-900 leading-tight">${agent.name}</h4>
              <div class="text-xs text-emerald-700 font-mono font-bold mt-0.5">Staff ID: ${agent.id}</div>
            </div>
          </div>

          <div class="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <div><strong>Jawatan:</strong> ${agent.role}</div>
            <div><strong>Cawangan:</strong> ${agent.branch}</div>
            <div><strong>Zon Operasi:</strong> ${agent.zone}</div>
            <div><strong>Pengkhususan:</strong> ${agent.specialty}</div>
            <div><strong>Tarikh Pendaftaran:</strong> ${agent.joinedDate}</div>
          </div>
        </div>

        <div class="mt-5 pt-4 border-t border-slate-100">
          <a href="https://wa.me/${agent.phone}?text=Salam%20${encodeURIComponent(agent.name)}%20(ID:%20${agent.id}),%20saya%20telah%20mengesahkan%20profil%20tuan%2Fpuan%20di%20portal%20JomConsult%20dan%20ingin%20memohon%20konsultasi." target="_blank" class="inline-flex items-center justify-center w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition">
            <span class='inline-flex items-center gap-1.5'>${OFFICIAL_WHATSAPP_SVG} WhatsApp ${agent.name.split(' ')[0]} (Rasmi)</span>
          </a>
        </div>
      </div>
    `).join('');
  }

  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('id') || urlParams.get('q');
  if (searchParam && input) {
    input.value = searchParam;
    executeVerification(searchParam);
  }

  document.querySelectorAll('.quick-verify-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-id');
      if (input) {
        input.value = val;
        executeVerification(val);
      }
    });
  });

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim();
      executeVerification(query);
    });
  }

  function executeVerification(query) {
    if (!resultContainer) return;
    if (!query) {
      resultContainer.innerHTML = '';
      return;
    }

    const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');

    const matched = OFFICIAL_AGENTS.find(agent => {
      const cleanId = agent.id.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanName = agent.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanPhone = agent.phone.replace(/[^0-9]/g, '');
      const cleanDisplay = agent.phoneDisplay.replace(/[^0-9]/g, '');

      return cleanId.includes(cleanQuery) || 
             cleanName.includes(cleanQuery) || 
             cleanPhone.includes(cleanQuery) || 
             cleanDisplay.includes(cleanQuery) ||
             query.toLowerCase().split(' ').some(word => word.length > 2 && agent.name.toLowerCase().includes(word));
    });

    if (matched) {
      resultContainer.innerHTML = `
        <div class="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-500 shadow-xl space-y-4 animate-fade-in">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-emerald-200">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl ${matched.avatarBg} text-white flex items-center justify-center font-bold text-base shadow">
                ${matched.initials}
              </div>
              <div>
                <span class="inline-block text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-600 text-white mb-1">
                  IDENTITI DISAHKAN SAH & BERDAFTAR
                </span>
                <h3 class="text-lg font-extrabold text-slate-900">${matched.name}</h3>
                <p class="text-xs text-emerald-800 font-mono font-bold">Staff ID: ${matched.id}</p>
              </div>
            </div>
            <span class="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-emerald-300">
              Penilaian Klien: ${matched.rating}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            <div class="p-2.5 bg-white rounded-lg border border-emerald-200">
              <span class="font-semibold text-slate-500 block">Jawatan Rasmi:</span>
              <span class="font-bold text-slate-900">${matched.role}</span>
            </div>
            <div class="p-2.5 bg-white rounded-lg border border-emerald-200">
              <span class="font-semibold text-slate-500 block">No. Telefon / WhatsApp Sah:</span>
              <span class="font-bold text-emerald-700 font-mono text-sm">${matched.phoneDisplay}</span>
            </div>
            <div class="p-2.5 bg-white rounded-lg border border-emerald-200">
              <span class="font-semibold text-slate-500 block">Cawangan / Pejabat:</span>
              <span class="font-bold text-slate-900">${matched.branch}</span>
            </div>
            <div class="p-2.5 bg-white rounded-lg border border-emerald-200">
              <span class="font-semibold text-slate-500 block">Zon Liputan Khidmat:</span>
              <span class="font-bold text-slate-900">${matched.zone}</span>
            </div>
          </div>

          <div class="pt-2 flex flex-col sm:flex-row gap-3">
            <a href="https://wa.me/${matched.phone}?text=Salam%20${encodeURIComponent(matched.name)}%20(ID:%20${matched.id}),%20saya%20telah%20mengesahkan%20profil%20tuan%2Fpuan%20di%20portal%20JomConsult%20dan%20ingin%20memohon%20konsultasi%20pinjaman." target="_blank" class="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl text-center shadow transition">
              Hubungi Terus WhatsApp ${matched.name.split(' ')[0]} (Disahkan)
            </a>
            <button onclick="document.getElementById('verification-result').innerHTML='';" class="py-3 px-4 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition">
              Tutup Carian
            </button>
          </div>
        </div>
      `;
    } else {
      resultContainer.innerHTML = `
        <div class="p-6 rounded-2xl bg-rose-50 border-2 border-rose-400 shadow-xl space-y-3 animate-fade-in">
          <div class="flex items-center gap-2 text-rose-800 font-bold text-sm">
            <span>⚠️ MAKLUMAT TIDAK DIJUMPAI / TIDAK BERDAFTAR</span>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed">
            Tiada rekod ejen rasmi JomConsult yang sepadan dengan carian <strong>"${query}"</strong>. 
            Sila pastikan ejaan nama, nombor Staff ID atau nombor telefon dimasukkan dengan tepat.
          </p>
          <div class="p-3 bg-white rounded-lg border border-rose-200 text-xs text-rose-900">
            <strong>Amaran Keselamatan:</strong> Jika individu berkenaan mendesak meminta bayaran pendahuluan (upfront) atau meminta pemindahan wang ke akaun peribadi, sila elakkan berurusan dan laporkan segera kepada pihak pengurusan kami.
          </div>
          <div class="pt-2">
            <a href="https://wa.me/${JOMCONSULT_CONFIG.whatsappNumber}?text=Salam%20HQ%20JomConsult,%20saya%20ingin%20membuat%20semakan%20mengenai%20kesahihan%20ejen%20dengan%20maklumat:%20${encodeURIComponent(query)}" target="_blank" class="inline-block py-2.5 px-5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition">
              Laporkan / Semak Bersama HQ JomConsult
            </a>
          </div>
        </div>
      `;
    }
  }
}
