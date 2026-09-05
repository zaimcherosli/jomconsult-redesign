import React, { useState } from 'react';

export default function ServicesSection({ onOpenChecker }) {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      id: 'consolidation',
      title: 'Penyatuan Hutang (Debt Consolidation)',
      tag: 'Paling Popular',
      shortDesc: 'Gabungkan kad kredit dan pinjaman peribadi faedah tinggi menjadi satu ansuran serendah 3.5% setahun.',
      highlight: 'Jimat sehingga RM1,000 - RM2,500 bayaran bulanan',
      benefits: [
        'Tutup semua hutang kad kredit (faedah 15% - 18%) dan baki tertunggak.',
        'Tingkatkan semula aliran tunai bersih (cashflow) bulanan anda serta-merta.',
        'Turunkan nisbah DSR dari kritikal kepada zon hijau kelulusan bank.',
        'Hanya perlu ingat satu tarikh bayaran bulanan sahaja.'
      ],
      idealFor: 'Individu yang mempunyai 2 atau lebih kad kredit, pinjaman peribadi bertindih, atau gaji habis membayar komitmen.'
    },
    {
      id: 'personal',
      title: 'Pinjaman Peribadi (Bank & Koperasi)',
      tag: 'Kelulusan Pantas',
      shortDesc: 'Pembiayaan peribadi patuh syariah untuk kakitangan Kerajaan, GLC, dan Swasta dengan had pembiayaan sehingga RM250,000.',
      highlight: 'Kadar keuntungan kompetitif serendah 2.88% setahun',
      benefits: [
        'Pakej khas kakitangan awam & badan berkanun melalui potongan gaji (AG / Biro ANGKASA).',
        'Pilihan khas pekerja swasta MNC & syarikat berstatus Panel.',
        'Kelulusan pantas seawal 48 jam jika dokumen lengkap.',
        'Tanpa penjamin (No guarantor) dan perlindungan Takaful.'
      ],
      idealFor: 'Kakitangan yang memerlukan modal kecemasan, ubah suai rumah, perkahwinan, atau perubatan.'
    },

    {
      id: 'profile',
      title: 'Penstrukturan & Pemulihan Profil CCRIS',
      tag: 'Pakar Strategi',
      shortDesc: 'Khidmat analisa diagnostik mendalam untuk membersihkan dan mencantikkan semula skor kredit Bank Negara (CCRIS/CTOS).',
      highlight: 'Berdasarkan Rangka Kerja Garis Panduan Bank Negara Malaysia',
      benefits: [
        'Semakan menyeluruh laporan CCRIS, CTOS, dan kedudukan DSR semasa.',
        'Pelan langkah demi langkah menyelesaikan rekod SAA / tunggakan lama.',
        'Strategi membina semula skor kredit yang sihat dalam tempoh 1 - 3 bulan.',
        'Mengelakkan daripada terjebak dengan pinjaman tidak berlesen.'
      ],
      idealFor: 'Individu yang pernah ada rekod lewat bayar atau pernah ditolak oleh bank disebabkan skor kredit rendah.'
    }
  ];

  return (
    <section id="servis" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Penyelesaian Kewangan Komprehensif
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perkhidmatan Penstrukturan Pinjaman Kami
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600">
            Setiap individu mempunyai profil dan keperluan yang berbeza. Kami menyediakan penyelesaian khusus mengikut tahap kelayakan anda.
          </p>
        </div>

        {/* Services Tabs / Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Navigation Buttons */}
          <div className="lg:col-span-4 space-y-3">
            {services.map((srv, idx) => {
              const isSelected = selectedService === idx;
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedService(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-bold ${isSelected ? 'text-emerald-950 font-extrabold' : 'text-slate-800'}`}>
                      {srv.title}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit mt-1 ${isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                    {srv.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Service Showcase */}
          <div className="lg:col-span-8">
            <div className="p-7 md:p-9 rounded-3xl bg-white border border-slate-200 shadow-md relative">
              
              {/* Highlight Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-4">
                <span>{services[selectedService].highlight}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3">
                {services[selectedService].title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {services[selectedService].shortDesc}
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-3 mb-6">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Kelebihan & Ciri-Ciri Utama:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services[selectedService].benefits.map((benefit, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-700 font-medium">
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sesuai Untuk */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Sesuai Untuk:</span>
                {services[selectedService].idealFor}
              </div>

              {/* Action Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[11px] text-slate-500 block">Kos Konsultasi:</span>
                  <span className="text-sm font-extrabold text-emerald-700">100% Percuma (Tiada Caj Upfront)</span>
                </div>

                <button
                  onClick={onOpenChecker}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm"
                >
                  Semak Kelayakan Untuk Servis Ini
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
