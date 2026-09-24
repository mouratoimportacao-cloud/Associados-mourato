import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Coins, 
  BarChart3, 
  Building, 
  CheckCircle2, 
  Award,
  Scale
} from 'lucide-react';
import { CONTRACT_DATA } from '../data/contractData';

export const HeroSection = ({ onNavigate, onOpenOnboarding }) => {
  return (
    <section style={{
      position: 'relative',
      padding: '4.5rem 0 3.5rem',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Rings */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Institutional Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
            <span className="badge-gold" style={{ padding: '0.45rem 1.2rem', gap: '0.6rem' }}>
              <Award size={15} color="#D4AF37" />
              CAPITAL REGISTRADO: R$ 1.000.000,00 • JUCESP NIRE 35270804594
            </span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            color: '#FFFFFF'
          }}>
            Assessoria de Alta Performance: <br />
            <span className="text-gradient-gold">Da Engenharia de Spread</span> à <br />
            <span className="text-gradient-blue">Consultoria Empresarial</span>
          </h1>

          {/* Subtitle explicitly answering user's core request */}
          <p style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
            color: '#94A3B8',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
            maxWidth: '740px',
            margin: '0 auto 2.5rem'
          }}>
            A <strong style={{ color: '#F8FAFC' }}>Mourato & Associados</strong> opera na convergência entre o 
            <span style={{ color: '#34D399', fontWeight: 600 }}> mercado financeiro de atacado (otimização de spread bancário e funding)</span> e a 
            <span style={{ color: '#60A5FA', fontWeight: 600 }}> consultoria societária, contábil e de gestão</span>. 
            Reduzimos o custo do seu capital e blindamos a governança da sua empresa.
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem'
          }}>
            <button 
              className="btn-gold" 
              onClick={() => onNavigate('espectro-completo')}
              style={{ fontSize: '1rem', padding: '0.95rem 1.8rem' }}
            >
              Compreender o Espectro (Spread à Consultoria)
              <ArrowRight size={18} />
            </button>

            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('simulador-interativo')}
              style={{ fontSize: '1rem', padding: '0.95rem 1.8rem' }}
            >
              <Coins size={18} color="#D4AF37" />
              Simular Redução de Spread
            </button>
          </div>
        </div>

        {/* 4 Pillars Stats Grid */}
        <div className="grid-cols-4" style={{ gap: '1.25rem' }}>
          
          {/* Card 1 */}
          <div className="glass-panel interactive-card" style={{ padding: '1.5rem', borderLeft: '3px solid #D4AF37' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#D4AF37', letterSpacing: '0.05em' }}>
                Solidez Patrimonial
              </span>
              <Building size={20} color="#D4AF37" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F8FAFC', fontFamily: "'Cinzel', serif" }}>
              R$ 1.000.000
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '0.3rem' }}>
              Capital Social 100% integralizado em moeda corrente nacional.
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel interactive-card" style={{ padding: '1.5rem', borderLeft: '3px solid #34D399' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#34D399', letterSpacing: '0.05em' }}>
                Engenharia de Spread
              </span>
              <Coins size={20} color="#34D399" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F8FAFC', fontFamily: "'Cinzel', serif" }}>
              -35% a -65%
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '0.3rem' }}>
              Corte médio do spread bancário e otimização de taxas de antecipação.
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel interactive-card" style={{ padding: '1.5rem', borderLeft: '3px solid #60A5FA' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#60A5FA', letterSpacing: '0.05em' }}>
                Consultoria & Gestão
              </span>
              <BarChart3 size={20} color="#60A5FA" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F8FAFC', fontFamily: "'Cinzel', serif" }}>
              360° Corporativo
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '0.3rem' }}>
              Reestruturação societária, contabilidade consultiva e governança.
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-panel interactive-card" style={{ padding: '1.5rem', borderLeft: '3px solid #A78BFA' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#A78BFA', letterSpacing: '0.05em' }}>
                Conformidade JUCESP
              </span>
              <ShieldCheck size={20} color="#A78BFA" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F8FAFC', fontFamily: "'Cinzel', serif" }}>
              5 CNAEs Plenos
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '0.3rem' }}>
              Atividades financeiras, contábeis e de consultoria legalmente homologadas.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
