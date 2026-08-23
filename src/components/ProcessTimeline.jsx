import React from 'react';

export default function ProcessTimeline({ onOpenChecker }) {
  const steps = [
    {
      step: '01',
      title: 'Semakan Percuma 15 Minit',
      desc: 'Isi borang ringkas atau hubungi kami. Kami periksa kelayakan asas secara percuma tanpa menjejaskan skor kredit CCRIS anda.',
      duration: 'Masa: 15 - 30 Minit'
    },
    {
      step: '02',
      title: 'Diagnostik Profil & DSR',
      desc: 'Pakar kami menganalisis nisbah komitmen (DSR), corak pembayaran CCRIS/CTOS, dan menyusun formula penjimatan terbaik.',
      duration: 'Masa: 2 - 4 Jam'
    },
    {
      step: '03',
      title: 'Padanan Bank & Susun Dokumen',
      desc: 'Kami memilih institusi perbankan/koperasi yang paling menepati profil anda dan memperkemaskan dokumentasi sebelum penyerahan.',
      duration: 'Masa: 1 - 2 Hari'
    },
    {
      step: '04',
      title: 'Kelulusan Rasmi & Wang Masuk',
      desc: 'Terima surat tawaran rasmi dari bank (Offer Letter), tandatangan persetujuan, dan wang tunai terus dikreditkan ke akaun bank anda.',
      duration: 'Masa: 2 - 5 Hari Bekerja'
    }
  ];

  return (
    <section id="cara-kerja" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Proses Telus & Mudah
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            4 Langkah Mudah Dari Semakan Hingga Kelulusan
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600">
            Tiada proses yang berbelit-belit. Kami bimbing anda dari A sehingga Z tanpa sebarang bayaran pendahuluan.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, index) => (
            <div 
              key={s.step}
              className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              {/* Step Number */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-emerald-700 font-mono">
                  {s.step}
                </span>
                <span className="text-[10px] uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                  Langkah {index + 1}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-800">
                {s.duration}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenChecker}
            className="px-7 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm"
          >
            Mulakan Langkah 1: Semak Profil Anda Sekarang
          </button>
        </div>

      </div>
    </section>
  );
}
