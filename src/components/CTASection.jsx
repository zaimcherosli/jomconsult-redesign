import React from 'react';

export default function CTASection({ onOpenChecker }) {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center shadow-xl space-y-6">
          
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            Tindakan Hari Ini Menentukan Kelulusan Anda
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Jangan Ulang Kesilapan Mohon Sendiri dan <span className="text-rose-400">Ditolak</span> Lagi.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Biar pakar penstrukturan pinjaman kami menganalisis profil anda secara percuma terlebih dahulu. Tiada bayaran pendahuluan dan tiada risiko.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenChecker}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg text-center"
            >
              Semak Kelayakan Percuma Sekarang
            </button>

            <a
              href="https://wa.me/60172551460?text=Salam%20JomConsult,%20saya%20nak%20dapatkan%20konsultasi%20pinjaman."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-center"
            >
              Bual Bersama Penasihat (WhatsApp)
            </a>
          </div>

          {/* Guarantee points */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span>0 Bayaran Pendahuluan</span>
            <span>•</span>
            <span>100% Khidmat Nasihat Percuma</span>
            <span>•</span>
            <span>Data Dilindungi Akta PDPA 2010</span>
          </div>

        </div>
      </div>
    </section>
  );
}
