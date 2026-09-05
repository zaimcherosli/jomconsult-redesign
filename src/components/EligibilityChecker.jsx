import React, { useState } from 'react';

export default function EligibilityChecker({ inline = false }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    employment: 'Swasta / Korporat',
    salary: 'RM3,000 - RM5,000',
    loanAmount: 'RM50,000 - RM100,000',
    mainIssue: 'Komitmen Tinggi (DSR Terlebih)',
    name: '',
    phone: '',
    agreed: true
  });

  const [submitted, setSubmitted] = useState(false);

  const employmentOptions = [
    { label: 'Kakitangan Kerajaan / Badan Berkanun', tag: 'Kadar Paling Rendah' },
    { label: 'Swasta / MNC / Korporat', tag: 'Kelulusan 48 Jam' },
    { label: 'Peniaga / Bekerja Sendiri / SME', tag: 'Modal Kerja' },
    { label: 'Syarikat Berkaitan Kerajaan (GLC)', tag: 'Pakej Khas' },
  ];

  const salaryOptions = [
    'Bawah RM2,500',
    'RM2,500 - RM4,000',
    'RM4,001 - RM7,000',
    'RM7,001 - RM12,000',
    'Lebih RM12,000'
  ];

  const loanAmountOptions = [
    'RM10,000 - RM30,000',
    'RM30,001 - RM70,000',
    'RM70,001 - RM150,000',
    'RM150,001 - RM300,000+'
  ];

  const issueOptions = [
    'Komitmen Tinggi (DSR Terlebih)',
    'CCRIS Ada Tunggakan / Special Attention Account (SAA)',
    'Banyak Bank Pernah Reject Serentak',
    'Nak Satukan Semua Hutang (Debt Consolidation)',
    'Tiada Masalah Serius / Baru Nak Cuba'
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      if (!formData.name.trim() || !formData.phone.trim()) {
        alert('Sila masukkan Nama dan Nombor WhatsApp untuk menerima analisa kelayakan.');
        return;
      }
      setSubmitted(true);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = `Salam Penasihat JomConsult, saya telah semak kelayakan di laman web:\n\n` +
      `*Nama:* ${formData.name}\n` +
      `*No. Telefon:* ${formData.phone}\n` +
      `*Sektor:* ${formData.employment}\n` +
      `*Gaji Bersih:* ${formData.salary}\n` +
      `*Jumlah Diperlukan:* ${formData.loanAmount}\n` +
      `*Isu Semasa:* ${formData.mainIssue}\n\n` +
      `Mohon bantu analisa profil kredit saya secara percuma. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/601171191179?text=${encoded}`, '_blank');
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setFormData({
      employment: 'Swasta / Korporat',
      salary: 'RM3,000 - RM5,000',
      loanAmount: 'RM50,000 - RM100,000',
      mainIssue: 'Komitmen Tinggi (DSR Terlebih)',
      name: '',
      phone: '',
      agreed: true
    });
  };

  return (
    <div id="semak-kelayakan" className={`w-full ${inline ? '' : 'p-6 md:p-8'} rounded-2xl bg-white border border-slate-200 shadow-xl relative`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
            Semak Kelayakan Pinjaman Percuma
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Keputusan indikasi awal & perancangan strategi dalam 15 minit tanpa rekod permohonan rosak.
          </p>
        </div>

        {!submitted && (
          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Langkah {step} dari 3
            </span>
          </div>
        )}
      </div>

      {/* Step Progress Bar */}
      {!submitted && (
        <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6 overflow-hidden">
          <div 
            className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Form Content */}
      {!submitted ? (
        <div className="space-y-6">
          {/* STEP 1: Sektor Pekerjaan */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-800">
                1. Pilih Sektor Pekerjaan Semasa Anda:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {employmentOptions.map((opt) => {
                  const isSelected = formData.employment === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, employment: opt.label })}
                      className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20' 
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200/80 text-slate-600'}`}>
                          {opt.tag}
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className={`text-xs font-semibold ${isSelected ? 'text-emerald-950 font-bold' : 'text-slate-700'}`}>
                          {opt.label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Gaji & Jumlah Pinjaman */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  2. Anggaran Pendapatan Bersih Bulanan:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {salaryOptions.map((sal) => (
                    <button
                      key={sal}
                      type="button"
                      onClick={() => setFormData({ ...formData, salary: sal })}
                      className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                        formData.salary === sal
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {sal}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  3. Jumlah Pinjaman / Penyatuan Hutang Yang Diperlukan:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {loanAmountOptions.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setFormData({ ...formData, loanAmount: amount })}
                      className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                        formData.loanAmount === amount
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Isu & Maklumat Kontak */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  4. Masalah atau Cabaran Utama Rekod Anda:
                </label>
                <div className="space-y-2">
                  {issueOptions.map((issue) => (
                    <label
                      key={issue}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        formData.mainIssue === issue
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mainIssue"
                        checked={formData.mainIssue === issue}
                        onChange={() => setFormData({ ...formData, mainIssue: issue })}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs">{issue}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Penuh / Nama Panggilan:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Amirul Azman"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombor WhatsApp:
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 012-3456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                Maklumat anda 100% dirahsiakan di bawah Akta PDPA dan tidak sesekali dikongsi kepada pihak ketiga.
              </div>
            </div>
          )}

          {/* Action Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Sebelumnya
              </button>
            ) : <div></div>}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all ml-auto shadow-sm"
            >
              {step === 3 ? 'Dapatkan Analisa Kelayakan' : 'Seterusnya'}
            </button>
          </div>
        </div>
      ) : (
        /* SUBMISSION SUCCESS & WHATSAPP ACTION */
        <div className="text-center py-6 space-y-5">
          <div className="w-14 h-14 bg-emerald-100 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-700 font-extrabold text-2xl">
            ✓
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-900">Profil Anda Siap Dirumus</h4>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
              Terima kasih <span className="font-semibold text-emerald-700">{formData.name}</span>. Berdasarkan profil <span className="text-slate-900 font-medium">{formData.employment}</span> dengan julat gaji <span className="text-slate-900 font-medium">{formData.salary}</span>, ada beberapa strategi bank & koperasi yang sesuai untuk dicadangkan.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Sasaran Pinjaman:</span>
              <span className="font-semibold text-slate-900">{formData.loanAmount}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Cabaran Semasa:</span>
              <span className="font-semibold text-amber-700">{formData.mainIssue}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Anggaran Tempoh Analisa:</span>
              <span className="font-semibold text-emerald-700">15 Minit (Percuma)</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full max-w-md mx-auto py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all"
            >
              Hantar Terus Ke WhatsApp Penasihat JomConsult
            </button>
            <p className="text-[11px] text-slate-500">
              Penasihat kewangan kami akan membalas segera dengan analisa percuma.
            </p>

            <button
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-800 block mx-auto mt-4"
            >
              Kira Semula Profil Lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
