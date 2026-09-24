import React from 'react';
import { ArrowRight, ArrowUpRight, Shield, Layers, TrendingUp } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

export const HeroSection = ({ onNavigate, onOpenContact }) => {
  return (
    <section style={{
      position: 'relative',
      padding: '5.5rem 0 4.5rem',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'radial-gradient(ellipse at 50% 10%, rgba(197, 168, 105, 0.05) 0%, transparent 70%)'
    }}>
      <div className="container-xl">
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Official Emblem Mark - Centerpiece Display */}
          <div style={{
            marginBottom: '2.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '1rem 2.5rem'
          }}>
            {/* Luminous Glow Backdrop */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(197, 168, 105, 0.18) 0%, rgba(197, 168, 105, 0.03) 60%, transparent 80%)',
              filter: 'blur(16px)',
              pointerEvents: 'none'
            }} />

            <img 
              src="/mourato-logo-transp.png" 
              alt="Mourato & Associados" 
              style={{ 
                height: '145px', 
                width: 'auto', 
                objectFit: 'contain',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 8px 24px rgba(197, 168, 105, 0.45)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.8))',
                transition: 'transform 0.4s ease'
              }} 
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.04)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>

          {/* Institutional Badge */}
          <div style={{ display: 'block', marginBottom: '1.25rem' }}>
            <span className="badge-institutional">
              ASSESSORIA BOUTIQUE INDEPENDENTE • CNPJ {COMPANY_DATA.cnpj}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>
            Da Engenharia de Spread Financeiro <br />
            <span className="text-gradient-gold">à Consultoria Empresarial &amp; Societária</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.1rem',
            color: '#CBD5E1',
            lineHeight: 1.7,
            maxWidth: '760px',
            margin: '0 auto 2.5rem'
          }}>
            A <strong style={{ color: '#FFFFFF' }}>Mourato &amp; Associados</strong> posiciona-se na intersecção entre o mercado de capitais e a gestão corporativa de alta complexidade. Desintermediamos o crédito bancário para reduzir seu custo de financiamento e estruturamos a governança contábil e societária da sua empresa.
          </p>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}>
            <button 
              className="btn-primary-gold"
              onClick={() => onNavigate('espectro')}
            >
              Compreender o Espectro de Atuação
              <ArrowRight size={15} />
            </button>

            <button 
              className="btn-secondary-subtle"
              onClick={() => onNavigate('simulador')}
            >
              Simular Otimização de Spread
              <ArrowUpRight size={15} />
            </button>
          </div>

        </div>

        {/* 3 Executive Pillars (Minimalist, Sober, Sophisticated) */}
        <div className="grid-3" style={{ marginTop: '1rem' }}>
          
          <div className="advisory-card">
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', marginBottom: '0.5rem', fontWeight: 700 }}>
              01 • Liquidez &amp; Mercado
            </div>
            <h3 style={{ marginBottom: '0.6rem', color: '#FFFFFF' }}>
              Engenharia de Spread
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
              Desoneração de taxas bancárias, substituição de linhas predatórias de varejo por funding de atacado (FIDCs e debêntures) e antecipação com deságio otimizado.
            </p>
          </div>

          <div className="advisory-card">
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', marginBottom: '0.5rem', fontWeight: 700 }}>
              02 • Estrutura &amp; Governança
            </div>
            <h3 style={{ marginBottom: '0.6rem', color: '#FFFFFF' }}>
              Consultoria Estratégica
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
              Reorganização societária (Holdings), contabilidade consultiva orientada a covenants, eficiência tributária e preparação para M&amp;A ou sucessão.
            </p>
          </div>

          <div className="advisory-card">
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', marginBottom: '0.5rem', fontWeight: 700 }}>
              03 • Diferencial Competitivo
            </div>
            <h3 style={{ marginBottom: '0.6rem', color: '#FFFFFF' }}>
              A Abordagem Integrada
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
              A consultoria saneia e valoriza o balanço da empresa, reduzindo o risco percebido e destravando os menores spreads de crédito do mercado financeiro.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
