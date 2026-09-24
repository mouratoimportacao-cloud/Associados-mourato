import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SpreadVsConsultoriaSpectrum } from './components/SpreadVsConsultoriaSpectrum';
import { SpreadOperationsModule } from './components/SpreadOperationsModule';
import { ConsultingModule } from './components/ConsultingModule';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { GovernanceCompliance } from './components/GovernanceCompliance';
import { AdvisoryOnboardingModal } from './components/AdvisoryOnboardingModal';
import { Footer } from './components/Footer';
import { ArrowUpRight } from 'lucide-react';

export function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Institutional Header */}
      <Header 
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <main style={{ flex: 1 }}>
        
        {/* Hero Section */}
        <div id="hero">
          <HeroSection 
            onNavigate={handleNavigate}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </div>

        {/* The Core Spectrum: Spread à Consultoria */}
        <SpreadVsConsultoriaSpectrum 
          onNavigateToSimulator={() => handleNavigate('simulador')}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Practice I: Capital Markets & Spread */}
        <SpreadOperationsModule 
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Practice II: Strategic Advisory & Consulting */}
        <ConsultingModule 
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Interactive Financial Simulator */}
        <InteractiveSimulator 
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Governance & Compliance (Strictly Confidential, No Sensitive Contract Disclosures) */}
        <GovernanceCompliance />

        {/* Bottom Call to Action */}
        <section style={{
          padding: '5rem 0',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(197, 168, 105, 0.06) 0%, transparent 70%)',
          borderBottom: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <div className="container-xl" style={{ maxWidth: '720px' }}>
            <span className="badge-institutional" style={{ marginBottom: '1rem' }}>
              ATENDIMENTO EXCLUSIVO
            </span>
            <h2 style={{ marginBottom: '1rem', color: '#FFFFFF' }}>
              Inicie um Diálogo Estratégico com Nossos Sócios
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2.5rem' }}>
              Seja para repactuar o spread das suas operações de crédito ou estruturar a governança societária da sua companhia, agende uma reunião reservada sob termo de confidencialidade.
            </p>
            <button 
              className="btn-primary-gold"
              onClick={() => setIsContactOpen(true)}
              style={{ padding: '0.95rem 2rem', fontSize: '0.92rem' }}
            >
              Agendar Conversa Reservada
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modal de Agendamento */}
      <AdvisoryOnboardingModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}

export default App;
