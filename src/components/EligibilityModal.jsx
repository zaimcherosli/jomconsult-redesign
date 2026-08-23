import React from 'react';
import { X } from 'lucide-react';
import EligibilityChecker from './EligibilityChecker';

export default function EligibilityModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-3xl border border-emerald-500/30 p-2 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-2">
          <EligibilityChecker inline={false} />
        </div>
      </div>
    </div>
  );
}
