import React from 'react';

export default function ProblemAnalysis({ onOpenChecker }) {
  const problems = [
    {
      id: 'dsr',
      title: 'DSR Terlalu Tinggi (Komitmen)',
      badge: 'Punca No. 1 di Malaysia',
      desc: 'Gaji nampak mencukupi (cth: RM5,000), tetapi bila bank campur komitmen kereta, kad kredit dan pinjaman sedia ada, nisbah DSR melebihi 60-70%.',
      bankThinking: 'Bank melihat pemohon berisiko tinggi terlebih bebanan hutang (overleveraged).',
      jomconsultFix: 'Kami laksanakan pelan Penyatuan Hutang (Debt Consolidation) untuk menutup komitmen kad kredit/pinjaman faedah tinggi, sekaligus menurunkan DSR kepada bawah 50% sebelum memohon pinjaman baharu.'
    },
    {
      id: 'ccris',
      title: 'Rekod CCRIS Ada Tunggakan / SAA',
      badge: 'Isu Rekod Sejarah',
      desc: 'Pernah terlewat bayar 1-2 bulan pada masa lalu, atau ada akaun di bawah Special Attention Account (SAA) walaupun baki sudah selesai dibayar.',
      bankThinking: 'Sistem algoritma automatik bank akan terus menolak permohonan secara serta-merta.',
      jomconsultFix: 'Kami analisa laporan CCRIS Bank Negara, dapatkan surat pelepasan (release letter) atau susun permohonan ke institusi/koperasi yang mempunyai polisi khas menerima rekod CCRIS tertentu.'
    },
    {
      id: 'spam',
      title: 'Memohon ke Banyak Bank Serentak',
      badge: 'Kesilapan Kerap',
      desc: 'Bila satu bank tolak, pemohon mencuba menghantar ke 4-5 bank lain serentak dengan harapan ada satu yang lulus.',
      bankThinking: 'Setiap carian kredit meninggalkan jejak rekod. Bank menganggap pemohon terlalu terdesak (credit hungry).',
      jomconsultFix: 'Kami hentikan kitaran penolakan, rehatkan profil, dan hanya hantar kepada satu institusi yang telah disahkan 100% mematuhi syarat profil pemohon.'
    },
    {
      id: 'bank-matching',
      title: 'Salah Pilih Bank Mengikut Profil',
      badge: 'Kelemahan Maklumat',
      desc: 'Setiap bank ada selera risiko berbeza. Ada bank gemar sektor swasta MNC, ada gemar penjawat awam, dan ada bank sangat ketat terhadap had kad kredit.',
      bankThinking: 'Bank tidak akan menerangkan punca penolakan secara terperinci kepada pemohon.',
      jomconsultFix: 'Dengan data kriteria pembiayaan lebih 15+ bank, kami terus padankan profil anda dengan institusi yang mempunyai kadar kelulusan tertinggi untuk sektor kerjaya anda.'
    }
  ];

  return (
    <section id="punca-reject" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            Bedah Siasat Masalah Pinjaman
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kenapa Permohonan Pinjaman Selalu <span className="text-rose-600">Ditolak?</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600">
            Ramai beranggapan bila permohonan ditolak, bermaksud mereka langsung tidak layak. Hakikatnya, masalah bukan pada diri anda, tetapi pada <span className="text-slate-900 font-semibold">cara dan strategi permohonan</span>.
          </p>
        </div>

        {/* 4 Core Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {problems.map((prob) => (
            <div 
              key={prob.id}
              className="p-6 md:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{prob.title}</h3>
                  <span className="text-[11px] text-rose-600 font-medium">{prob.badge}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {prob.desc}
              </p>

              {/* Bank Thinking vs JomConsult Fix */}
              <div className="space-y-2 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                  <span className="font-bold text-rose-800 block mb-0.5">Sudut Pandang Bank:</span>
                  {prob.bankThinking}
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <span className="font-bold text-emerald-800 block mb-0.5">Strategi JomConsult:</span>
                  {prob.jomconsultFix}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Comparison: Submit Sendiri vs Susun Bersama JomConsult */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 md:p-10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Perbandingan: Hantar Sendiri vs Susun Bersama JomConsult
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Kenapa mereka yang pernah ditolak 3 kali boleh lulus apabila menggunakan strategi yang betul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Cara Sendiri */}
            <div className="p-6 rounded-2xl bg-white border border-rose-200 space-y-3">
              <div className="text-rose-700 font-bold text-sm uppercase tracking-wider pb-3 border-b border-slate-100">
                Cara Biasa / Hantar Sendiri
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="p-2 bg-slate-50 rounded-lg">
                  Memohon ke bank popular tanpa mengetahui formula DSR bank berkenaan.
                </li>
                <li className="p-2 bg-slate-50 rounded-lg">
                  Tidak menyemak rekod CCRIS dan tunggakan terlebih dahulu.
                </li>
                <li className="p-2 bg-slate-50 rounded-lg">
                  Bila ditolak, terus memohon ke bank lain secara berulang (menjejaskan skor kredit).
                </li>
                <li className="p-2 bg-rose-50 text-rose-900 rounded-lg font-semibold">
                  Keputusan: Permohonan Ditolak dan Masa Terbuang 3 hingga 6 Bulan.
                </li>
              </ul>
            </div>

            {/* Cara JomConsult */}
            <div className="p-6 rounded-2xl bg-white border border-emerald-300 space-y-3 shadow-sm">
              <div className="text-emerald-800 font-bold text-sm uppercase tracking-wider pb-3 border-b border-slate-100">
                Pendekatan Strategik JomConsult
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="p-2 bg-emerald-50/60 rounded-lg">
                  Diagnostik profil secara menyeluruh (Slip gaji, DSR, CCRIS & CTOS) secara 100% percuma.
                </li>
                <li className="p-2 bg-emerald-50/60 rounded-lg">
                  Menyusun penstrukturan semula hutang untuk kurangkan komitmen bulanan.
                </li>
                <li className="p-2 bg-emerald-50/60 rounded-lg">
                  Hanya menghantar ke satu institusi yang kriteria pembiayaannya secocok.
                </li>
                <li className="p-2 bg-emerald-100 text-emerald-950 rounded-lg font-bold">
                  Keputusan: Pinjaman Diluluskan, Kadar Faedah Sesuai dan Wang Masuk Akaun.
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onOpenChecker}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm"
            >
              Biar Kami Periksa Profil Anda Secara Percuma
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
