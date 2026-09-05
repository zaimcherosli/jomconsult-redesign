import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Adakah saya perlu membayar sebarang wang pendahuluan (Upfront Fee)?',
      a: 'Tidak sama sekali. JomConsult berpegang teguh kepada polisi 100% Khidmat Nasihat & Semakan Percuma tanpa sebarang caj pendahuluan. Kami tidak akan sesekali meminta anda memasukkan wang deposit atau yuran pemprosesan ke dalam mana-mana akaun peribadi.'
    },
    {
      q: 'Apakah dokumen yang diperlukan untuk semak kelayakan awal?',
      a: 'Untuk semakan awal yang pantas, anda hanya perlukan: (1) Slip gaji 3 bulan terkini, (2) Penyata bank yang mengesahkan kemasukan gaji, dan (3) Laporan CCRIS terkini jika ada.'
    },
    {
      q: 'Berapa lama masa yang diambil untuk proses kelulusan pinjaman?',
      a: 'Semakan awal kelayakan mengambil masa 15 hingga 30 minit. Untuk proses penyerahan dokumen ke institusi perbankan atau koperasi, kelulusan rasmi biasanya mengambil masa antara 2 hingga 5 hari bekerja bergantung kepada pakej yang dipilih.'
    },
    {
      q: 'Saya ada rekod CCRIS tertunggak atau akaun SAA, adakah masih ada peluang lulus?',
      a: 'Ya, masih ada peluang. Kebanyakan bank komersial menolak secara automatik, tetapi kami mempunyai rangkaian institusi kewangan pembangunan (DFI) dan koperasi berdaftar di bawah SKM yang mempunyai polisi fleksibel untuk menyelesaikan tunggakan melalui skim penstrukturan semula.'
    },
    {
      q: 'Adakah maklumat peribadi dan data kewangan saya selamat?',
      a: 'Semua maklumat dan dokumen yang dihantar kepada kami dikendalikan dengan piawaian keselamatan tertinggi dan mematuhi sepenuhnya Akta Perlindungan Data Peribadi 2010 (PDPA).'
    },
    {
      q: 'Siapakah yang layak menggunakan perkhidmatan JomConsult?',
      a: 'Kami menguruskan permohonan untuk Kakitangan Kerajaan Persekutuan & Negeri, Badan Berkanun, Syarikat Berkaitan Kerajaan (GLC), Kakitangan Swasta (MNC, Berhad, Sdn Bhd), serta Pemilik Perniagaan / SME berdaftar.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Soalan Lazim (FAQ)
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Jawapan Kepada Kemusykilan Anda
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600">
            Ketahui segala maklumat penting mengenai proses, keselamatan, dan syarat permohonan bersama kami.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50 transition-colors"
                >
                  <span className={`text-sm sm:text-base font-bold ${isOpen ? 'text-emerald-800' : 'text-slate-900'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-700' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Ada Soalan Lain Yang Belum Terjawab?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Penasihat kami sedia membantu anda secara terus di WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/601171191179?text=Salam%20JomConsult,%20saya%20ada%20pertanyaan%20mengenai%20kelayakan%20pinjaman."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shrink-0 transition-colors"
          >
            Tanya Terus Di WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
