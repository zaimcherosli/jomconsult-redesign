import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      
      {/* Tooltip prompt */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-slate-900 text-white text-xs py-2.5 px-4 rounded-2xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Penasihat kami <strong>Online</strong> (Semakan Percuma)</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1.5"
            aria-label="Tutup"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Official Animated WhatsApp Button */}
      <a
        href="https://wa.me/601171191179?text=Salam%20JomConsult,%20saya%20nak%20semak%20kelayakan%20pinjaman%20saya."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-transform group relative animate-whatsapp-float"
        aria-label="WhatsApp Penasihat JomConsult"
      >
        {/* Official WhatsApp SVG Logo */}
        <svg 
          viewBox="0 0 32 32" 
          className="w-8 h-8 sm:w-9 sm:h-9 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.3-1.9A13.9 13.9 0 1 0 16 2zm0 25.5a11.5 11.5 0 0 1-5.9-1.6l-.4-.3-4.4 1.1 1.2-4.2-.3-.5A11.5 11.5 0 1 1 16 27.5zm6.3-8.6c-.3-.2-2-.9-2.3-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a9.2 9.2 0 0 1-2.7-1.7 10.1 10.1 0 0 1-1.9-2.3c-.2-.3 0-.5.2-.7s.3-.4.5-.5.2-.4.3-.6 0-.4 0-.5-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.2 2.8 6.4 6.4 0 0 0 1.4 3.5 14.5 14.5 0 0 0 5.6 5c2.4 1 2.9.9 3.5.8a3 3 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.2-.1-.4-.2-.7-.4z"/>
        </svg>
        
        {/* Active Ping Badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] font-bold text-white items-center justify-center">1</span>
        </span>
      </a>

    </div>
  );
}
