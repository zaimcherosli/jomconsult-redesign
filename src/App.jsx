import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BankNetwork from './components/BankNetwork';
import ProblemAnalysis from './components/ProblemAnalysis';
import ServicesSection from './components/ServicesSection';
import SavingsCalculator from './components/SavingsCalculator';
import ProcessTimeline from './components/ProcessTimeline';
import CaseStudies from './components/CaseStudies';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import EligibilityModal from './components/EligibilityModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenChecker = () => {
    const element = document.getElementById('semak-kelayakan');
    if (element && window.innerWidth >= 1024) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Clean Single Navbar */}
      <Navbar onOpenChecker={handleOpenChecker} />

      {/* Main Content Area */}
      <main className="flex-grow">
        <HeroSection />
        <BankNetwork />
        <ProblemAnalysis onOpenChecker={handleOpenChecker} />
        <ServicesSection onOpenChecker={handleOpenChecker} />
        <SavingsCalculator onOpenChecker={handleOpenChecker} />
        <ProcessTimeline onOpenChecker={handleOpenChecker} />
        <CaseStudies onOpenChecker={handleOpenChecker} />
        <FAQSection />
        <CTASection onOpenChecker={handleOpenChecker} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />
      <EligibilityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
