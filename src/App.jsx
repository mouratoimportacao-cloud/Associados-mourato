import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SpreadVsConsultoriaSpectrum } from './components/SpreadVsConsultoriaSpectrum';
import { SpreadOperationsModule } from './components/SpreadOperationsModule';
import { ConsultingModule } from './components/ConsultingModule';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { ContractComplianceAudit } from './components/ContractComplianceAudit';
import { AdvisoryOnboardingModal } from './components/AdvisoryOnboardingModal';
import { Footer } from './components/Footer';
import { CONTRACT_DATA } from './data/contractData';
import { 
  Building2, 
  ArrowLeftRight, 
  TrendingUp, 
  ShieldCheck, 
  Calculator, 
  FileCheck2, 
  Briefcase,
  CheckCircle,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function App() {
  const [activeModule, setActiveModule] = useState('visao-geral');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const handleNavigate = (moduleId) => {
    setActiveModule(moduleId);
    const element = document.getElementById(`modulo-${moduleId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header 
        activeModule={activeModule}
        setActiveModule={handleNavigate}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        {/* Module 1: Hero & Visão Geral */}
        <div id="modulo-visao-geral">
          <HeroSection 
            onNavigate={handleNavigate}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />

          {/* Official Brand Identity Showcase Section */}
          <section style={{
            background: 'linear-gradient(180deg, rgba(6, 9, 17, 0.4) 0%, rgba(16, 25, 42, 0.7) 100%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '2.5rem 0'
          }}>
            <div className="container-xl">
              <div style={{
                background: 'rgba(11, 18, 32, 0.85)',
                border: '1.5px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '20px',
                padding: '2rem 2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '2rem',
                boxShadow: '0 12px 35px rgba(0,0,0,0.6)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  {/* The Official Logo Uploaded by the User */}
                  <div style={{
                    background: '#FFFFFF',
                    padding: '12px 20px',
                    borderRadius: '16px',
                    border: '2px solid #D4AF37',
                    boxShadow: '0 8px 24px rgba(212, 175, 55, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src="/mourato-logo.png" 
                      alt="Logo Oficial Mourato & Associados" 
                      style={{ height: '70px', width: 'auto', objectFit: 'contain' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                      <span className="badge-gold">IDENTIDADE CORPORATIVA OFICIAL</span>
                      <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <CheckCircle size={14} /> Marca Homologada
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', fontWeight: 800 }}>
                      Mourato &amp; Associados Ltda
                    </h3>
                    <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '580px', marginTop: '0.2rem' }}>
                      Atuação estruturada em 2 braços operacionais perfeitamente sinérgicos: 
                      <strong style={{ color: '#34D399' }}> Engenharia de Spread &amp; Liquidez PJ</strong> e 
                      <strong style={{ color: '#60A5FA' }}> Consultoria em Gestão Empresarial, Contabilidade &amp; Societário</strong>.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button 
                    className="btn-gold"
                    onClick={() => handleNavigate('espectro-completo')}
                  >
                    Ver Como Atuamos
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Module 2: O Espectro Completo: Do Spread à Consultoria */}
        <SpreadVsConsultoriaSpectrum 
          onNavigateToSimulator={() => handleNavigate('simulador-interativo')}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />

        {/* Module 3: Operações de Spread & Intermediação Financeira */}
        <SpreadOperationsModule 
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />

        {/* Module 4: Consultoria em Gestão Empresarial & Societária */}
        <ConsultingModule 
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />

        {/* Module 5: Simulador Interativo */}
        <InteractiveSimulator 
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />

        {/* Module 6: Certidão JUCESP, Contrato & Due Diligence */}
        <ContractComplianceAudit />

        {/* Final Banner CTA */}
        <section style={{
          padding: '4rem 0',
          background: 'linear-gradient(135deg, rgba(16, 25, 42, 0.9) 0%, rgba(9, 14, 25, 0.95) 100%)',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <div className="container-xl" style={{ textAlign: 'center' }}>
            <span className="badge-gold" style={{ marginBottom: '1rem' }}>
              <Sparkles size={14} />
              ESTRUTURAÇÃO IMEDIATA
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem', color: '#FFFFFF' }}>
              Pronto para Reduzir seu Spread ou Blindar sua Gestão?
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 2.2rem' }}>
              Entre em contato direto com a mesa executiva da <strong>Mourato &amp; Associados</strong>. Avaliamos a viabilidade da sua demanda com sigilo e rigor técnico.
            </p>
            <button 
              className="btn-gold"
              onClick={() => setIsOnboardingOpen(true)}
              style={{ fontSize: '1.05rem', padding: '1rem 2.2rem' }}
            >
              <Briefcase size={18} />
              Iniciar Solicitação de Advisory
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Onboarding / Advisory Modal */}
      <AdvisoryOnboardingModal 
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </div>
  );
}

export default App;
