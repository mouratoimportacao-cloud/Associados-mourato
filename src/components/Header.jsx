import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Header = ({ onNavigate, onOpenContact, onOpenLogin }) => {
  return (
    <header className="header-institutional">
      {/* Discreet Institutional Top Line */}
      <div style={{
        background: '#05070B',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        padding: '0.35rem 2rem',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        color: '#64748B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span>MANDATOS RESERVADOS</span>
          <span>•</span>
          <span>CNPJ: <strong style={{ color: '#CBD5E1' }}>38.377.738/0001-45</strong></span>
          <span>•</span>
          <span>SÃO PAULO — ATUAÇÃO NACIONAL</span>
        </div>

        <div style={{ letterSpacing: '0.12em', color: 'var(--gold-light)' }}>
          QUALIDADE • CONFIANÇA • EXCELÊNCIA
        </div>
      </div>

      {/* Main Bar with High-Definition Seal */}
      <div className="header-inner" style={{ padding: '0.75rem 2rem' }}>
        
        {/* Brand Seal & Monogram */}
        <div 
          onClick={() => onNavigate('hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
        >
          <img 
            src="/mourato-seal-circle.png" 
            alt="Mourato & Associados" 
            style={{ 
              height: '54px', 
              width: '54px', 
              objectFit: 'contain',
              borderRadius: '50%',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6), 0 0 12px rgba(197, 168, 105, 0.3)',
              transition: 'transform 0.3s ease'
            }} 
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          <div>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: '1.2rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#FFFFFF'
            }}>
              MOURATO <span style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>&amp;</span> ASSOCIADOS
            </div>
            <div style={{
              fontSize: '0.64rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--gold-light)',
              fontWeight: 600,
              marginTop: '-2px'
            }}>
              Assessoria Corporativa &amp; Estruturação
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <button className="nav-link-btn" onClick={() => onNavigate('espectro')}>
            O Espectro
          </button>
          <button className="nav-link-btn" onClick={() => onNavigate('spread')}>
            Mercado de Capitais &amp; Spread
          </button>
          <button className="nav-link-btn" onClick={() => onNavigate('consultoria')}>
            Consultoria Estratégica
          </button>
          <button className="nav-link-btn" onClick={() => onNavigate('simulador')}>
            Simulador de Capital
          </button>
          <button className="nav-link-btn" onClick={() => onNavigate('governanca')}>
            Governança &amp; Sigilo
          </button>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button 
            className="btn-secondary-subtle" 
            onClick={onOpenLogin}
            style={{ padding: '0.65rem 1.1rem', fontSize: '0.78rem', gap: '0.4rem', display: 'flex', alignItems: 'center' }}
          >
            Login
          </button>

          <button 
            className="btn-primary-gold" 
            onClick={onOpenContact}
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem' }}
          >
            Audiência Privada
            <ArrowUpRight size={13} />
          </button>
        </div>

      </div>
    </header>
  );
};
