import React from 'react';

export default function BankNetwork() {
  const banks = [
    { name: 'Maybank', type: 'Bank Komersial' },
    { name: 'CIMB Bank', type: 'Bank Komersial' },
    { name: 'RHB Bank', type: 'Bank Komersial' },
    { name: 'Bank Rakyat', type: 'Perbankan Islam / Koperasi' },
    { name: 'BSN', type: 'DFI / Kerajaan' },
    { name: 'Public Bank', type: 'Bank Komersial' },
    { name: 'AmBank', type: 'Bank Komersial' },
    { name: 'Affin Bank', type: 'Bank Komersial' },
    { name: 'Koperasi SKM', type: 'Kakitangan Awam & GLC' }
  ];

  return (
    <div className="border-b border-slate-200 bg-slate-50 py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="shrink-0 text-center md:text-left">
            <div className="text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              Rangkaian Padanan Kami
            </div>
            <p className="text-xs text-slate-500 max-w-xs">
              Kami memadankan profil anda secara tepat dengan polisi kredit lebih 15+ institusi perbankan dan koperasi sah di Malaysia.
            </p>
          </div>

          {/* Bank Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
            {banks.map((bank, index) => (
              <div 
                key={index}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm"
              >
                <span>{bank.name}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
