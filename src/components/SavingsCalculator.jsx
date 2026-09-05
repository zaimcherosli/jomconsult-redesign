import React, { useState } from 'react';

export default function SavingsCalculator({ onOpenChecker }) {
  const [totalDebt, setTotalDebt] = useState(50000);
  const [currentMonthly, setCurrentMonthly] = useState(1800);
  const [tenureYears, setTenureYears] = useState(7);

  // Estimation: Consolidating high-interest card/personal loans into an optimized loan (~4.2% p.a.)
  const annualRate = 0.042;
  const totalInterest = totalDebt * annualRate * tenureYears;
  const newMonthlyEstimate = Math.round((totalDebt + totalInterest) / (tenureYears * 12));
  const monthlySavings = Math.max(0, currentMonthly - newMonthlyEstimate);
  const yearlySavings = monthlySavings * 12;

  const handleWhatsAppShare = () => {
    const text = `Salam JomConsult, saya guna kalkulator penjimatan di web:\n\n` +
      `*Jumlah Hutang Untuk Ditutup:* RM ${totalDebt.toLocaleString()}\n` +
      `*Bayaran Bulanan Sekarang:* RM ${currentMonthly.toLocaleString()}\n` +
      `*Anggaran Penjimatan Bulanan:* RM ${monthlySavings.toLocaleString()}/bulan\n\n` +
      `Boleh bantu saya buat permohonan penyatuan hutang ini?`;
    window.open(`https://wa.me/601171191179?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="kalkulator" className="py-20 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Kalkulator Interaktif Penjimatan
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kira Jumlah Penjimatan Bulanan Anda
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600">
            Ketahui bagaimana penyatuan hutang kad kredit dan pinjaman faedah tinggi boleh memulihkan kembali baki gaji bulanan anda.
          </p>
        </div>

        {/* Interactive Calculator Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Sliders */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Total Debt Amount */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <label className="font-semibold text-slate-800">
                    Jumlah Hutang / Kad Kredit Nak Ditutup:
                  </label>
                  <span className="font-extrabold text-emerald-700 text-base">
                    RM {totalDebt.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={totalDebt}
                  onChange={(e) => setTotalDebt(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>RM 10,000</span>
                  <span>RM 100,000</span>
                  <span>RM 200,000</span>
                </div>
              </div>

              {/* Slider 2: Current Monthly Payment */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <label className="font-semibold text-slate-800">
                    Bayaran Bulanan Sekarang (Semua Komitmen Ini):
                  </label>
                  <span className="font-extrabold text-rose-600 text-base">
                    RM {currentMonthly.toLocaleString()}/bulan
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="6000"
                  step="100"
                  value={currentMonthly}
                  onChange={(e) => setCurrentMonthly(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>RM 500/bln</span>
                  <span>RM 3,000/bln</span>
                  <span>RM 6,000/bln</span>
                </div>
              </div>

              {/* Slider 3: Tenure Years */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <label className="font-semibold text-slate-800">
                    Tempoh Pembiayaan Baharu:
                  </label>
                  <span className="font-extrabold text-slate-900 text-base">
                    {tenureYears} Tahun
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 7, 10].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureYears(yr)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        tenureYears === yr
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {yr} Tahun
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Real-time Savings Breakdown Card */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-4 shadow-md">
              
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Anggaran Penjimatan Tunai Anda
              </div>

              <div className="py-3 border-y border-slate-100 space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight">
                  RM {monthlySavings.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 block">Jimat Setiap Bulan</span>
              </div>

              <div className="space-y-2 text-xs text-left">
                <div className="flex justify-between text-slate-600">
                  <span>Komitmen Asal:</span>
                  <span className="font-semibold text-rose-600 line-through">RM {currentMonthly.toLocaleString()}/bln</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Ansuran Baru JomConsult:</span>
                  <span className="font-bold text-slate-900">~RM {newMonthlyEstimate.toLocaleString()}/bln</span>
                </div>
                <div className="flex justify-between text-slate-700 pt-1 border-t border-slate-100">
                  <span className="font-semibold">Penjimatan 1 Tahun:</span>
                  <span className="font-extrabold text-emerald-700">RM {yearlySavings.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppShare}
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm"
              >
                Konsultasi Pelan Penjimatan Ini
              </button>

              <p className="text-[10px] text-slate-400">
                Tertakluk kepada terma, syarat dan profil kelayakan institusi perbankan.
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
