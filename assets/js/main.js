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
      document.querySelectorAll('.phone-display-text').forEach(el => el.textContent = cfg.phone_display);
    }
    if (cfg.announcement_text) {
      document.querySelectorAll('.announcement-text-item').forEach(el => el.textContent = cfg.announcement_text);
      const annEl = document.getElementById('announcement-text-display');
      if (annEl) annEl.textContent = cfg.announcement_text;
    }
    if (cfg.min_interest_rate) {
      document.querySelectorAll('.min-rate-display').forEach(el => el.textContent = cfg.min_interest_rate);
    }
    if (cfg.max_loan_amount) {
      document.querySelectorAll('.max-loan-display').forEach(el => el.textContent = cfg.max_loan_amount);
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
  initCareerApplyForm();
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
        const decimals = parseInt(el.getAttribute('data-counter-decimals'), 10) || 0;
        const duration = 2000;

        const formatNum = (val) => {
          if (decimals > 0) return val.toFixed(decimals);
          return Math.round(val).toLocaleString();
        };

        // Reset to 0 before animating up
        el.innerText = prefix + formatNum(0) + suffix;

        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = easeProgress * end;
          el.innerText = prefix + formatNum(current) + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.innerText = prefix + formatNum(end) + suffix;
          }
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  counters.forEach(c => observer.observe(c));
}

// 4. Multi-Step Eligibility Form (11 Questions V3)
function initEligibilityWizard() {
  // A. HOMEPAGE WIZARD
  const formContainer = document.getElementById('eligibility-form-container');
  if (formContainer) {
    let currentStep = 1;
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

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentStep === 1) {
          currentStep = 2;
          updateView();
        } else if (currentStep === 2) {
          currentStep = 3;
          updateView();
        } else if (currentStep === 3) {
          const name = document.getElementById('wizard-name-input')?.value.trim();
          const ic = document.getElementById('wizard-ic-input')?.value.trim();
          const phone = document.getElementById('wizard-phone-input')?.value.trim();
          const sector = document.getElementById('wiz-sector')?.value;
          const employer = document.getElementById('wiz-employer')?.value.trim() || '-';
          const employmentStatus = document.getElementById('wiz-employment-status')?.value;
          const cert = document.getElementById('wiz-cert')?.value;
          const salary = document.getElementById('wiz-salary')?.value;
          const location = document.getElementById('wiz-location')?.value;
          const socialChannel = document.getElementById('wiz-social-channel')?.value;

          const checkedIssues = Array.from(document.querySelectorAll('.wiz-issue-cb:checked')).map(cb => cb.value);
          const issuesStr = checkedIssues.length > 0 ? checkedIssues.join(', ') : 'Tiada Masalah';

          if (!name || !phone) {
            alert('Sila masukkan Nama Penuh dan Nombor WhatsApp anda.');
            return;
          }

          const resName = document.getElementById('res-client-name');
          if (resName) resName.innerText = name;

          // Build Clean Formatted WhatsApp Message
          const waMsg = `*BORANG SEMAK KELAYAKAN LOAN (V3)*\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `*Nama Penuh:* ${name}\n` +
            `*No. IC:* ${ic || '-'}\n` +
            `*No. Telefon:* ${phone}\n` +
            `*Lokasi / Negeri:* ${location}\n\n` +
            `*Sektor Pekerjaan:* ${sector}\n` +
            `*Majikan / Syarikat:* ${employer}\n` +
            `*Status Jawatan:* ${employmentStatus}\n` +
            `*Gaji Kasar:* ${salary}\n` +
            `*Sijil Profesional:* ${cert}\n\n` +
            `*Masalah Dihadapi:* ${issuesStr}\n` +
            `*Saluran Sosmed:* ${socialChannel}\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `Salam Team Faris / JomConsult, saya ingin memohon semakan kelayakan pinjaman berdasarkan maklumat di atas. Terima kasih!`;

          const waBtn = document.getElementById('wizard-whatsapp-send-btn');
          if (waBtn) {
            waBtn.onclick = () => {
              window.open(`https://wa.me/${JOMCONSULT_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`, '_blank');
            };
          }

          // Asynchronous Lead Intake to Cloudflare D1
          fetch('/api/public/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              applicant_name: name,
              ic_number: ic,
              phone: phone,
              location_state: location,
              sector: sector,
              employer_name: employer,
              employment_status: employmentStatus,
              salary: salary,
              professional_cert: cert,
              credit_issues: issuesStr,
              social_channel: socialChannel,
              source: 'Borang Semak Kelayakan V3 (Homepage)'
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

  // B. DEDICATED LANDING PAGE WIZARD (semak-kelayakan.html)
  const pageStep1 = document.getElementById('page-wizard-step-1');
  if (pageStep1) {
    let pStep = 1;
    const pStep2 = document.getElementById('page-wizard-step-2');
    const pStep3 = document.getElementById('page-wizard-step-3');
    const pResult = document.getElementById('page-wizard-result');
    const pProgressBar = document.getElementById('page-wizard-progress-bar');
    const pStepIndicator = document.getElementById('page-wizard-step-indicator');
    const pBtnNext = document.getElementById('page-wizard-next-btn');
    const pBtnPrev = document.getElementById('page-wizard-prev-btn');

    function updatePageView() {
      if (pProgressBar) pProgressBar.style.width = ((pStep / 3) * 100) + '%';
      if (pStepIndicator) pStepIndicator.innerText = `Langkah ${pStep} dari 3`;

      if (pageStep1) pageStep1.classList.toggle('hidden', pStep !== 1);
      if (pStep2) pStep2.classList.toggle('hidden', pStep !== 2);
      if (pStep3) pStep3.classList.toggle('hidden', pStep !== 3);
      if (pResult) pResult.classList.toggle('hidden', pStep !== 4);

      if (pBtnPrev) pBtnPrev.classList.toggle('hidden', pStep <= 1 || pStep >= 4);
      if (pBtnNext) {
        pBtnNext.classList.toggle('hidden', pStep >= 4);
        pBtnNext.innerText = pStep === 3 ? 'Hantar Borang Semakan' : 'Seterusnya';
      }
    }

    if (pBtnNext) {
      pBtnNext.addEventListener('click', () => {
        if (pStep === 1) {
          pStep = 2;
          updatePageView();
        } else if (pStep === 2) {
          pStep = 3;
          updatePageView();
        } else if (pStep === 3) {
          const name = document.getElementById('p-wizard-name-input')?.value.trim();
          const ic = document.getElementById('p-wizard-ic-input')?.value.trim();
          const phone = document.getElementById('p-wizard-phone-input')?.value.trim();
          const sector = document.getElementById('p-wiz-sector')?.value;
          const employer = document.getElementById('p-wiz-employer')?.value.trim() || '-';
          const employmentStatus = document.getElementById('p-wiz-employment-status')?.value;
          const cert = document.getElementById('p-wiz-cert')?.value;
          const salary = document.getElementById('p-wiz-salary')?.value;
          const location = document.getElementById('p-wiz-location')?.value;
          const socialChannel = document.getElementById('p-wiz-social-channel')?.value;

          const checkedIssues = Array.from(document.querySelectorAll('.p-wiz-issue-cb:checked')).map(cb => cb.value);
          const issuesStr = checkedIssues.length > 0 ? checkedIssues.join(', ') : 'Tiada Masalah';

          if (!name || !phone) {
            alert('Sila masukkan Nama Penuh dan Nombor WhatsApp anda.');
            return;
          }

          const resName = document.getElementById('page-res-client-name');
          if (resName) resName.innerText = name;

          const waMsg = `*BORANG SEMAK KELAYAKAN LOAN (V3)*\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `*Nama Penuh:* ${name}\n` +
            `*No. IC:* ${ic || '-'}\n` +
            `*No. Telefon:* ${phone}\n` +
            `*Lokasi / Negeri:* ${location}\n\n` +
            `*Sektor Pekerjaan:* ${sector}\n` +
            `*Majikan / Syarikat:* ${employer}\n` +
            `*Status Jawatan:* ${employmentStatus}\n` +
            `*Gaji Kasar:* ${salary}\n` +
            `*Sijil Profesional:* ${cert}\n\n` +
            `*Masalah Dihadapi:* ${issuesStr}\n` +
            `*Saluran Sosmed:* ${socialChannel}\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `Salam Team Faris / JomConsult, saya ingin memohon semakan kelayakan pinjaman berdasarkan maklumat di atas. Terima kasih!`;

          const waBtn = document.getElementById('page-wizard-whatsapp-send-btn');
          if (waBtn) {
            waBtn.onclick = () => {
              window.open(`https://wa.me/${JOMCONSULT_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`, '_blank');
            };
          }

          fetch('/api/public/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              applicant_name: name,
              ic_number: ic,
              phone: phone,
              location_state: location,
              sector: sector,
              employer_name: employer,
              employment_status: employmentStatus,
              salary: salary,
              professional_cert: cert,
              credit_issues: issuesStr,
              social_channel: socialChannel,
              source: 'Borang Semak Kelayakan V3 (Landing Page)'
            })
          }).catch(err => console.log('D1 Lead intake note:', err));

          pStep = 4;
          updatePageView();
        }
      });
    }

    if (pBtnPrev) {
      pBtnPrev.addEventListener('click', () => {
        if (pStep > 1) {
          pStep--;
          updatePageView();
        }
      });
    }
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
        b.classList.remove('bg-yellow-400', 'text-slate-950', 'border-yellow-400', 'font-extrabold');
        b.classList.add('bg-slate-800', 'text-slate-300', 'border-slate-700');
      });
      btn.classList.add('bg-yellow-400', 'text-slate-950', 'border-yellow-400', 'font-extrabold');
      btn.classList.remove('bg-slate-800', 'text-slate-300', 'border-slate-700');
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
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180', 'text-yellow-400'));

      if (isHidden) {
        body.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180', 'text-yellow-400');
      }
    });
  });
}

// 7. Agent Verification System (Verify.html)
async function initAgentVerification() {
  const form = document.getElementById('agent-search-form');
  const input = document.getElementById('agent-search-input');
  const resultContainer = document.getElementById('verification-result');
  const directoryContainer = document.getElementById('agents-directory');

  let activeAgents = [...OFFICIAL_AGENTS];

  // Attempt to fetch live agents with photos from Cloudflare D1
  try {
    const res = await fetch('/api/public/agents');
    if (res.ok) {
      const data = await res.json();
      if (data.agents && data.agents.length > 0) {
        activeAgents = data.agents.map(a => ({
          id: a.staff_id,
          name: a.name,
          role: a.role,
          phone: a.phone,
          phoneDisplay: a.phone_display || a.phone,
          branch: a.branch,
          zone: a.zone,
          status: a.status,
          joinedDate: a.created_at ? new Date(a.created_at).toLocaleDateString('ms-MY', { day: '2-digit', month: 'long', year: 'numeric' }) : '01 Januari 2024',
          rating: a.rating || '5.0 / 5.0',
          initials: a.initials || 'JC',
          specialty: a.specialty || 'Penyatuan Hutang & Analisis DSR',
          avatarBg: a.avatar_bg || 'bg-slate-800 text-yellow-400 border border-yellow-500/30',
          photo_url: a.photo_url || null
        }));
      }
    }
  } catch (err) {}

  if (directoryContainer) {
    directoryContainer.innerHTML = activeAgents.map(agent => {
      const avatarHtml = agent.photo_url
        ? `<img src="${agent.photo_url}" class="w-14 h-14 rounded-2xl object-cover shadow-md shrink-0 border border-slate-700" alt="${agent.name}">`
        : `<div class="w-14 h-14 rounded-2xl ${agent.avatarBg} flex items-center justify-center text-lg font-black shadow-md shrink-0">${agent.initials}</div>`;

      return `
        <div class="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-yellow-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div class="flex items-center gap-4 mb-4">
              ${avatarHtml}
              <div>
                <div class="inline-flex items-center gap-1 text-[11px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-2 py-0.5 rounded-md mb-1">
                  ${agent.status}
                </div>
                <h4 class="text-base font-bold text-white leading-tight">${agent.name}</h4>
                <div class="text-xs text-yellow-400 font-mono font-bold mt-0.5">Staff ID: ${agent.id}</div>
              </div>
            </div>

            <div class="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
              <div><strong class="text-slate-100">Jawatan:</strong> ${agent.role}</div>
              <div><strong class="text-slate-100">Cawangan:</strong> ${agent.branch}</div>
              <div><strong class="text-slate-100">Zon Operasi:</strong> ${agent.zone}</div>
              <div><strong class="text-slate-100">Pengkhususan:</strong> ${agent.specialty}</div>
              <div><strong class="text-slate-100">Tarikh Pendaftaran:</strong> ${agent.joinedDate}</div>
            </div>
          </div>

          <div class="mt-5 pt-4 border-t border-slate-800">
            <a href="https://wa.me/${agent.phone}?text=Salam%20${encodeURIComponent(agent.name)}%20(ID:%20${agent.id}),%20saya%20telah%20mengesahkan%20profil%20tuan%2Fpuan%20di%20portal%20JomConsult%20dan%20ingin%20memohon%20konsultasi." target="_blank" class="inline-flex items-center justify-center w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-sm transition">
              <span class='inline-flex items-center gap-1.5'>${OFFICIAL_WHATSAPP_SVG} WhatsApp ${agent.name.split(' ')[0]} (Rasmi)</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
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

    const matched = activeAgents.find(agent => {
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
      const avatarHtml = matched.photo_url
        ? `<img src="${matched.photo_url}" class="w-12 h-12 rounded-xl object-cover shadow border border-yellow-400 shrink-0" alt="${matched.name}">`
        : `<div class="w-12 h-12 rounded-xl ${matched.avatarBg} flex items-center justify-center font-bold text-base shadow shrink-0">${matched.initials}</div>`;

      resultContainer.innerHTML = `
        <div class="p-6 rounded-2xl bg-slate-900 border-2 border-yellow-400 shadow-2xl space-y-4 animate-fade-in text-white">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div class="flex items-center gap-3">
              ${avatarHtml}
              <div>
                <span class="inline-block text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-yellow-400 text-slate-950 mb-1">
                  IDENTITI DISAHKAN SAH & BERDAFTAR
                </span>
                <h3 class="text-lg font-extrabold text-white">${matched.name}</h3>
                <p class="text-xs text-yellow-400 font-mono font-bold">Staff ID: ${matched.id}</p>
              </div>
            </div>
            <span class="text-xs font-bold text-slate-200 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              Penilaian Klien: ${matched.rating}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
            <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
              <span class="font-semibold text-slate-400 block">Jawatan Rasmi:</span>
              <span class="font-bold text-white">${matched.role}</span>
            </div>
            <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
              <span class="font-semibold text-slate-400 block">No. Telefon / WhatsApp Sah:</span>
              <span class="font-bold text-yellow-400 font-mono text-sm">${matched.phoneDisplay}</span>
            </div>
            <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
              <span class="font-semibold text-slate-400 block">Cawangan / Pejabat:</span>
              <span class="font-bold text-white">${matched.branch}</span>
            </div>
            <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
              <span class="font-semibold text-slate-400 block">Zon Liputan Khidmat:</span>
              <span class="font-bold text-white">${matched.zone}</span>
            </div>
          </div>

          <div class="pt-2 flex flex-col sm:flex-row gap-3">
            <a href="https://wa.me/${matched.phone}?text=Salam%20${encodeURIComponent(matched.name)}%20(ID:%20${matched.id}),%20saya%20telah%20mengesahkan%20profil%20tuan%2Fpuan%20di%20portal%20JomConsult%20dan%20ingin%20memohon%20konsultasi%20pinjaman." target="_blank" class="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl text-center shadow transition">
              Hubungi Terus WhatsApp ${matched.name.split(' ')[0]} (Disahkan)
            </a>
            <button onclick="document.getElementById('verification-result').innerHTML='';" class="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition">
              Tutup Carian
            </button>
          </div>
        </div>
      `;
    } else {
      resultContainer.innerHTML = `
        <div class="p-6 rounded-2xl bg-slate-900 border-2 border-rose-500 shadow-2xl space-y-3 animate-fade-in text-white">
          <div class="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <span>⚠️ MAKLUMAT TIDAK DIJUMPAI / TIDAK BERDAFTAR</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            Tiada rekod ejen rasmi JomConsult yang sepadan dengan carian <strong class="text-white">"${query}"</strong>. 
            Sila pastikan ejaan nama, nombor Staff ID atau nombor telefon dimasukkan dengan tepat.
          </p>
          <div class="p-3 bg-slate-800/80 rounded-lg border border-rose-500/40 text-xs text-rose-300">
            <strong class="text-rose-400">Amaran Keselamatan:</strong> Jika individu berkenaan mendesak meminta bayaran pendahuluan (upfront) atau meminta pemindahan wang ke akaun peribadi, sila elakkan berurusan dan laporkan segera kepada pihak pengurusan kami.
          </div>
          <div class="pt-2">
            <a href="https://wa.me/${JOMCONSULT_CONFIG.whatsappNumber}?text=Salam%20HQ%20JomConsult,%20saya%20ingin%20membuat%20semakan%20mengenai%20kesahihan%20ejen%20dengan%20maklumat:%20${encodeURIComponent(query)}" target="_blank" class="inline-block py-2.5 px-5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition shadow">
              Laporkan / Semak Bersama HQ JomConsult
            </a>
          </div>
        </div>
      `;
    }
  }
}

// 8. Career / Consultant Recruitment Form Wizard Logic
function initCareerApplyForm() {
  const form = document.getElementById('career-apply-form');
  if (!form) return;

  let currentStep = 1;
  const totalSteps = 4;

  const step1 = document.getElementById('career-step-1');
  const step2 = document.getElementById('career-step-2');
  const step3 = document.getElementById('career-step-3');
  const step4 = document.getElementById('career-step-4');
  const successCard = document.getElementById('career-success-card');

  const titleEl = document.getElementById('career-step-title');
  const badgeEl = document.getElementById('career-step-badge');
  const barEl = document.getElementById('career-progress-bar');

  const stepTitles = [
    "Langkah 1: Maklumat Peribadi",
    "Langkah 2: Maklumat Perhubungan & Alamat",
    "Langkah 3: Dokumen Pengenalan Diri (KYC)",
    "Langkah 4: Maklumat Akaun Bank Komisen"
  ];

  function updateCareerStep(step) {
    currentStep = step;
    [step1, step2, step3, step4].forEach((el, idx) => {
      if (el) {
        if (idx + 1 === currentStep) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    });

    if (titleEl) titleEl.innerText = stepTitles[currentStep - 1] || `Langkah ${currentStep}`;
    if (badgeEl) badgeEl.innerText = `${currentStep} dari ${totalSteps}`;
    if (barEl) barEl.style.width = `${(currentStep / totalSteps) * 100}%`;

    const formSec = document.getElementById('borang-kerjaya-section');
    if (formSec) {
      formSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // File Upload Preview & Base64 storage
  let icFrontBase64 = "";
  let icBackBase64 = "";
  let selfieBase64 = "";

  function handleFileUpload(inputId, btnId, previewId, callback) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    const preview = document.getElementById(previewId);

    if (btn && input) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        input.click();
      });
    }

    if (input) {
      input.addEventListener('change', () => {
        const file = input.files[0];
        if (file) {
          if (file.size > 5 * 1024 * 1024) {
            alert('Saiz fail melebihi 5MB. Sila pilih fail yang lebih kecil.');
            input.value = "";
            return;
          }
          if (preview) {
            preview.innerText = `✓ ${file.name}`;
            preview.classList.remove('text-slate-400');
            preview.classList.add('text-yellow-400', 'font-semibold');
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            callback(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  handleFileUpload('c-file-ic-front', 'btn-browse-ic-front', 'preview-text-ic-front', (b64) => { icFrontBase64 = b64; });
  handleFileUpload('c-file-ic-back', 'btn-browse-ic-back', 'preview-text-ic-back', (b64) => { icBackBase64 = b64; });
  handleFileUpload('c-file-selfie', 'btn-browse-selfie', 'preview-text-selfie', (b64) => { selfieBase64 = b64; });

  // Step 1 Navigation
  const btnNext1 = document.getElementById('btn-career-next-1');
  if (btnNext1) {
    btnNext1.addEventListener('click', () => {
      const name = document.getElementById('c-fullname')?.value.trim();
      const ic = document.getElementById('c-icnumber')?.value.trim();
      const dob = document.getElementById('c-dob')?.value.trim();
      if (!name || !ic || !dob) {
        alert('Sila lengkapkan Nama Penuh, No. Kad Pengenalan dan Tarikh Lahir.');
        return;
      }
      updateCareerStep(2);
    });
  }

  // Step 2 Navigation
  const btnPrev2 = document.getElementById('btn-career-prev-2');
  const btnNext2 = document.getElementById('btn-career-next-2');
  if (btnPrev2) btnPrev2.addEventListener('click', () => updateCareerStep(1));
  if (btnNext2) {
    btnNext2.addEventListener('click', () => {
      const phone = document.getElementById('c-phone')?.value.trim();
      const email = document.getElementById('c-email')?.value.trim();
      const addr1 = document.getElementById('c-address-1')?.value.trim();
      const postcode = document.getElementById('c-postcode')?.value.trim();
      const city = document.getElementById('c-city')?.value.trim();
      if (!phone || !email || !addr1 || !postcode || !city) {
        alert('Sila lengkapkan No. Telefon, Emel dan Alamat Kediaman.');
        return;
      }
      updateCareerStep(3);
    });
  }

  // Step 3 Navigation
  const btnPrev3 = document.getElementById('btn-career-prev-3');
  const btnNext3 = document.getElementById('btn-career-next-3');
  if (btnPrev3) btnPrev3.addEventListener('click', () => updateCareerStep(2));
  if (btnNext3) {
    btnNext3.addEventListener('click', () => {
      updateCareerStep(4);
    });
  }

  // Step 4 Navigation & Submit
  const btnPrev4 = document.getElementById('btn-career-prev-4');
  if (btnPrev4) btnPrev4.addEventListener('click', () => updateCareerStep(3));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('btn-career-submit');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sedang Menghantar...</span>';
    }

    const payload = {
      full_name: document.getElementById('c-fullname')?.value.trim() || '',
      ic_number: document.getElementById('c-icnumber')?.value.trim() || '',
      date_of_birth: document.getElementById('c-dob')?.value.trim() || '',
      marital_status: document.getElementById('c-marital')?.value || 'Bujang',
      race: document.getElementById('c-race')?.value || 'Melayu',
      religion: document.getElementById('c-religion')?.value || 'Islam',
      phone: document.getElementById('c-phone')?.value.trim() || '',
      email: document.getElementById('c-email')?.value.trim() || '',
      address_line_1: document.getElementById('c-address-1')?.value.trim() || '',
      address_line_2: document.getElementById('c-address-2')?.value.trim() || '',
      address_postcode: document.getElementById('c-postcode')?.value.trim() || '',
      address_city: document.getElementById('c-city')?.value.trim() || '',
      address_state: document.getElementById('c-state')?.value || 'Selangor',
      bank_name: document.getElementById('c-bank-name')?.value || 'Maybank',
      bank_account_name: document.getElementById('c-bank-acc-name')?.value.trim() || '',
      bank_account_number: document.getElementById('c-bank-acc-num')?.value.trim() || '',
      recruiter_name: document.getElementById('c-recruiter')?.value.trim() || 'HQ JomConsult',
      ic_front_data: icFrontBase64,
      ic_back_data: icBackBase64,
      selfie_ic_data: selfieBase64
    };

    try {
      const res = await fetch('/api/public/career-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        form.classList.add('hidden');
        if (successCard) {
          successCard.classList.remove('hidden');
          const refEl = document.getElementById('career-success-ref');
          if (refEl) refEl.innerText = data.ref_no || 'JC-REC-SUCCESS';

          const waBtn = document.getElementById('btn-whatsapp-hr-confirm');
          if (waBtn) {
            const msg = `*PENDAFTARAN PERUNDING JOMCONSULT*\n` +
              `━━━━━━━━━━━━━━━━━━\n` +
              `*No. Rujukan:* ${data.ref_no}\n` +
              `*Nama Penuh:* ${payload.full_name}\n` +
              `*No. IC:* ${payload.ic_number}\n` +
              `*No. Telefon:* ${payload.phone}\n` +
              `*Emel:* ${payload.email}\n` +
              `*Lokasi:* ${payload.address_city}, ${payload.address_state}\n` +
              `*Perekrut:* ${payload.recruiter_name}\n` +
              `*Bank Komisen:* ${payload.bank_name} (${payload.bank_account_number})\n` +
              `━━━━━━━━━━━━━━━━━━\n` +
              `Salam Pasukan HR JomConsult, saya telah mengisi borang pendaftaran perunding di atas. Mohon semakan bagi sesi temuduga dan pengeluaran Staff ID. Terima kasih!`;
            waBtn.href = `https://wa.me/${JOMCONSULT_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
          }
        }
      } else {
        alert(data.error || 'Ralat semasa menghantar permohonan. Sila cuba lagi.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    } catch (err) {
      alert('Ralat sambungan ke pelayan: ' + err.message);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}

