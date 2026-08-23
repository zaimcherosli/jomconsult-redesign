import React from 'react';

export default function TopBanner() {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-emerald-400">JomConsult Loan Agency:</span>
          <span>100% Khidmat Nasihat Percuma. Tiada Sebarang Bayaran Pendahuluan (No Upfront Fee).</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-slate-400 text-[11px]">
          <span>Patuh Akta PDPA (Data Sulit)</span>
          <span>•</span>
          <span>Syarikat Berdaftar SSM</span>
          <span>•</span>
          <span>Semakan Pantas 15 Minit</span>
        </div>
      </div>
    </div>
  );
}
