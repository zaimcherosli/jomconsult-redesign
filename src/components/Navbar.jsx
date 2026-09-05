import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onOpenChecker }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Punca Reject', href: '#punca-reject' },
    { name: 'Servis', href: '#servis' },
    { name: 'Kalkulator', href: '#kalkulator' },
    { name: 'Cara Kerja', href: '#cara-kerja' },
    { name: 'Testimoni', href: '#testimoni' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-200 ${scrolled ? 'border-b border-slate-200/80 shadow-sm py-2.5' : 'border-b border-slate-100 py-3.5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Official Brand Logo */}
        <a href="#" className="flex items-center shrink-0">
          <img 
            src="/logo.png" 
            alt="JomConsult.com.my Logo" 
            className="h-10 sm:h-11 w-auto object-contain hover:opacity-90 transition-opacity"
          />
        </a>

        {/* Desktop Navigation - Short, Single-Line, Clean Spacing */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions - Minimal & Clean */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/601171191179?text=Salam%20JomConsult,%20saya%20nak%20dapatkan%20nasihat%20semakan%20kelayakan%20loan."
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors whitespace-nowrap"
          >
            WhatsApp
          </a>

          <button
            onClick={onOpenChecker}
            className="px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm whitespace-nowrap"
          >
            Semak Kelayakan
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-emerald-600 py-2 border-b border-slate-50"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChecker();
              }}
              className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 text-center shadow-sm"
            >
              Semak Kelayakan Percuma
            </button>

            <a
              href="https://wa.me/601171191179?text=Salam%20JomConsult,%20saya%20nak%20semak%20kelayakan%20pinjaman."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 text-center"
            >
              WhatsApp Penasihat
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
