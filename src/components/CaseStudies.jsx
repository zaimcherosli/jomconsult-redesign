import React from 'react';

export default function CaseStudies({ onOpenChecker }) {
  const cases = [
    {
      name: 'En. Firdaus M.',
      role: 'Eksekutif Swasta (Kuala Lumpur)',
      salary: 'Gaji Bersih: RM4,800',
      initialIssue: '3 Kali Ditolak di Bank Komersial kerana DSR 82% (3 Kad Kredit + 1 Pinjaman Peribadi).',
      solution: 'Penyatuan Hutang RM75,000 menutup 3 kad kredit dengan ansuran tunggal serendah 3.9% setahun.',
      result: 'DSR turun ke 48%, jimat bayaran RM1,350 sebulan dan mempunyai baki tunai lebihan RM15,000.',
      status: 'Lulus RM 75,000'
    },
    {
      name: 'Puan Siti Nurhaliza K.',
      role: 'Guru Kanan / Penjawat Awam (Selangor)',
      salary: 'Gaji Bersih: RM5,600',
      initialIssue: 'Rekod CCRIS tertunggak 2 bulan akibat masalah keluarga lampau, permohonan pinjaman perumahan tersekat.',
      solution: 'Pemulihan profil dan penstrukturan pembiayaan peribadi koperasi patuh syariah tanpa potongan melebihi had 60%.',
      result: 'Berjaya melunaskan semua tunggakan dan lulus pembiayaan dalam masa 4 hari bekerja.',
      status: 'Lulus RM 120,000'
    },
    {
      name: 'En. Jason Tan',
      role: 'Pemilik Perniagaan SME (Shah Alam)',
      salary: 'Pendapatan Syarikat',
      initialIssue: 'Perniagaan baharu 1.5 tahun, rekod cukai LHDN belum matang dan tiada cagaran hartanah.',
      solution: 'Padanan skim modal kerja khas institusi DFI dengan unjuran aliran tunai penyata bank 6 bulan.',
      result: 'Mendapat suntikan modal pusingan bagi menampung tempahan projek baharu.',
      status: 'Lulus RM 85,000'
    }
  ];

  const testimonials = [
    {
      client: 'Azman Shah',
      sector: 'Kakitangan Swasta',
      text: 'Sebelum ini saya cuba memohon di dua buah bank sendiri dan ditolak kerana komitmen kad kredit. Selepas dibantu menyusun semula DSR, permohonan saya berjaya diluluskan.',
      rating: '5/5'
    },
    {
      client: 'Norazila Binti Hashim',
      sector: 'Kakitangan KKM',
      text: 'Perkhidmatan sangat telus dan profesional. Tiada sebarang bayaran pendahuluan diminta dan segala proses diterangkan dengan jelas.',
      rating: '5/5'
    },
    {
      client: 'Mohd Ridzuan',
      sector: 'Eksekutif Logistik',
      text: 'Proses semakan awal sangat pantas. Saya dapat tahu kedudukan profil saya dalam masa singkat sebelum memilih institusi pembiayaan yang tepat.',
      rating: '5/5'
    }
  ];

  return (
    <section id="testimoni" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Kisah Kejayaan Sebenar
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Daripada Pernah Ditolak Kepada Lulus Berjaya
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600">
            Lihat bagaimana strategi penstrukturan yang betul mengubah keputusan permohonan pinjaman klien-klien kami.
          </p>
        </div>

        {/* 3 Detailed Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {cases.map((c, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                    <p className="text-[11px] text-slate-500">{c.role}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-extrabold text-xs border border-emerald-200">
                    {c.status}
                  </span>
                </div>

                <div className="space-y-3 pt-3 text-xs">
                  <div>
                    <span className="text-[11px] font-bold text-rose-800 block mb-0.5">Masalah Asal:</span>
                    <p className="text-slate-600 leading-relaxed bg-rose-50/60 p-2.5 rounded-lg border border-rose-100">
                      {c.initialIssue}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-800 block mb-0.5">Strategi JomConsult:</span>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      {c.solution}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-emerald-900 block mb-0.5">Hasil Akhir:</span>
                    <p className="text-emerald-950 font-medium leading-relaxed bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200">
                      {c.result}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{c.salary}</span>
                <span className="font-semibold text-emerald-700">Kes Selesai</span>
              </div>
            </div>
          ))}
        </div>

        {/* Client Reviews Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700">Penilaian {t.rating}</span>
                <span className="text-[10px] text-slate-500">{t.sector}</span>
              </div>

              <p className="text-xs text-slate-600 italic leading-relaxed">
                "{t.text}"
              </p>

              <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900">{t.client}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
