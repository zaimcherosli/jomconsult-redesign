import React, { useState, useEffect, useRef } from 'react';
import EligibilityChecker from './EligibilityChecker';

function useCountUpOnScroll(endValue, duration = 1800, decimals = 0) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTimestamp = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * endValue;
      setVal(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setVal(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [started, endValue, duration]);

  return [elementRef, decimals > 0 ? val.toFixed(decimals) : Math.round(val)];
}

export default function HeroSection() {
  const [ratingRef, ratingVal] = useCountUpOnScroll(4.9, 1500, 1);
  const [amountRef, amountVal] = useCountUpOnScroll(18.5, 1800, 1);
  const [rateRef, rateVal] = useCountUpOnScroll(96.4, 1800, 1);

  return (
    <section className="relative pt-8 pb-14 md:pt-14 md:pb-20 bg-white overflow-hidden border-b border-slate-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copywriting & Trust */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              Agensi Penstrukturan Profil Pinjaman No. 1 di Malaysia
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Pinjaman Kerap <span className="text-rose-600 underline decoration-rose-400 decoration-wavy underline-offset-8">Reject?</span><br />
              <span className="text-emerald-700">Kami Tahu Cara Sistem Bank Berfikir.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Realitinya, bank bukan tolak diri anda — bank tolak <span className="text-slate-900 font-semibold">profil semasa anda</span>. Kami bantu menstruktur semula komitmen, mencantikkan nisbah DSR dan memilih bank yang tepat sebelum dihantar.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-slate-700">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-left">
                <span className="font-bold text-slate-900 block mb-0.5">Tiada Caj Upfront</span>
                <span>100% khidmat nasihat & semakan percuma.</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-left">
                <span className="font-bold text-slate-900 block mb-0.5">Kes DSR Tinggi</span>
                <span>Satukan hutang jadi jimat bayaran bulanan.</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-left">
                <span className="font-bold text-slate-900 block mb-0.5">Isu CCRIS & SAA</span>
                <span>Pelan pemulihan & penyusunan dokumen strategik.</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-left">
                <span className="font-bold text-slate-900 block mb-0.5">Patuh Bank Negara</span>
                <span>Melalui saluran institusi bank & koperasi berdaftar.</span>
              </div>
            </div>

            {/* Mobile-Optimized 3-Column Animated Stats Widget */}
            <div className="pt-2" ref={ratingRef}>
              <div ref={amountRef}>
                <div ref={rateRef} className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200 p-3.5 sm:p-4 rounded-2xl text-center shadow-sm">
                  
                  {/* Stat 1: Rating */}
                  <div className="p-1 sm:p-2">
                    <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                      {ratingVal}<span className="text-[11px] sm:text-xs font-normal text-slate-400 ml-0.5">/5.0</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-tight">
                      1,800+ Klien
                    </p>
                  </div>

                  {/* Stat 2: Total Disbursed */}
                  <div className="p-1 sm:p-2 border-x border-slate-200">
                    <div className="text-lg sm:text-2xl font-extrabold text-emerald-700 tracking-tight font-mono">
                      RM{amountVal}M+
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-tight">
                      Nilai Disusun
                    </p>
                  </div>

                  {/* Stat 3: Approval Rate */}
                  <div className="p-1 sm:p-2">
                    <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                      {rateVal}%
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-tight">
                      Kadar Lulus
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Multi-Step Form */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Badge Rapat Sebelah Kiri */}
              <div className="absolute -top-3.5 left-6 z-20 bg-amber-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow border border-amber-300">
                Semakan Pantas Dalam Talian
              </div>
              <EligibilityChecker inline={false} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
