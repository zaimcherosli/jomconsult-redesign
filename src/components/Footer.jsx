import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-sm">
              <img 
                src="/logo.png" 
                alt="JomConsult.com.my Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Agensi perundingan dan penstrukturan profil pinjaman di Malaysia. Kami membantu merancang strategi DSR, pemulihan CCRIS, dan padanan institusi perbankan yang tepat untuk kelulusan optimum.
            </p>

            <div className="inline-block p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              100% Khidmat Nasihat Percuma. Tiada Bayaran Pendahuluan.
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Navigasi Pantas</h4>
            <ul className="space-y-2">
              <li><a href="#punca-reject" className="hover:text-emerald-400 transition-colors">Kenapa Pinjaman Ditolak?</a></li>
              <li><a href="#servis" className="hover:text-emerald-400 transition-colors">Penyatuan Hutang (Debt Consolidation)</a></li>
              <li><a href="#servis" className="hover:text-emerald-400 transition-colors">Pinjaman Peribadi Swasta & Kerajaan</a></li>
              <li><a href="#kalkulator" className="hover:text-emerald-400 transition-colors">Kalkulator Penjimatan Bulanan</a></li>
              <li><a href="#cara-kerja" className="hover:text-emerald-400 transition-colors">4 Langkah Proses Kelulusan</a></li>
              <li><a href="#testimoni" className="hover:text-emerald-400 transition-colors">Kisah Kejayaan Klien</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Soalan Lazim (FAQ)</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Maklumat Pejabat & Hubungi</h4>
            
            <div className="space-y-2.5 text-slate-300">
              <div>
                <span className="font-semibold text-white block mb-0.5">Alamat:</span>
                <span>22-2, Jalan Opera G U2/G, Taman TTDI Jaya, 40150 Shah Alam, Selangor.</span>
              </div>

              <div>
                <span className="font-semibold text-white block mb-0.5">Talian Pejabat:</span>
                <a href="tel:0378324539" className="hover:text-emerald-400 transition-colors">
                  03-7832 4539
                </a>
              </div>

              <div>
                <span className="font-semibold text-white block mb-0.5">WhatsApp HQ:</span>
                <a href="https://wa.me/601171191179" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  011-7119 1179
                </a>
              </div>

              <div>
                <span className="font-semibold text-white block mb-0.5">Emel Rasmi:</span>
                <a href="mailto:hello@jomconsult.com.my" className="hover:text-emerald-400 transition-colors">
                  hello@jomconsult.com.my
                </a>
              </div>

              <div>
                <span className="font-semibold text-white block mb-0.5">Waktu Operasi:</span>
                <span>Isnin - Jumaat: 10:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & PDPA Disclaimer */}
        <div className="pt-8 space-y-4">
          <p className="text-[11px] text-slate-300 leading-relaxed text-center sm:text-left">
            <strong>Penafian:</strong> JomConsult (Jom Consult Solutions) merupakan agensi perundingan dan penasihat kewangan bebas. Kami bukan institusi perbankan atau pemberi pinjam wang berlesen langsung, sebaliknya bertindak sebagai perunding strategi permohonan ke institusi perbankan komersial, institusi kewangan pembangunan (DFI), dan koperasi berdaftar sah di bawah Suruhanjaya Koperasi Malaysia (SKM) serta Bank Negara Malaysia (BNM). Kami tidak pernah mengenakan sebarang wang pendahuluan (upfront fees). Segala kelulusan pinjaman adalah tertakluk kepada budi bicara mutlak dan terma syarat pihak institusi pembiaya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-[11px]">
            <p>© {currentYear} Jom Consult Solutions. Hak Cipta Terpelihara.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-300">Dasar Privasi (PDPA)</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Terma & Syarat</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
