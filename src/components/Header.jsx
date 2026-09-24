import React from 'react';
import { COMPANY_DATA } from '../data/companyData';
import { ArrowUpRight } from 'lucide-react';

export const Header = ({ onNavigate, onOpenContact }) => {
  return (
    <header className="header-institutional">
      {/* Discreet Institutional Top Line */}
      <div style={{
        background: '#070A0F',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '0.35rem 1.75rem',
        fontSize: '0.72rem',
        letterSpacing: '0.08em',
        color: '#8E9BAE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>MOURATO &amp; ASSOCIADOS LTDA</span>
          <span>•</span>
          <span>CNPJ: <strong style={{ color: '#CBD5E1' }}>{COMPANY_DATA.cnpj}</strong></span>
          <span>•</span>
          <span>{COMPANY_DATA.localizacao}</span>
        </div>

        <div>
          <span>ASSESSORIA CORPORATIVA &amp; ESTRUTURAÇÃO FINANCEIRA</span>
        </div>
      </div>

      {/* Main Bar with Official Logo */}
      <div className="header-inner">
        
        {/* Brand Logo & Wordmark */}
        <div 
          onClick={() => onNavigate('hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', cursor: 'pointer' }}
        >
          <img 
            src="/mourato-logo-transp.png" 
            alt="Mourato & Associados" 
            style={{ 
              height: '62px', 
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 14px rgba(197, 168, 105, 0.4))',
              transition: 'transform 0.3s ease'
            }} 
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          <div>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: '1.35rem',
              fontWeight: 800,
              letterSpacing: '0.07em',
              color: '#FFFFFF'
            }}>
              MOURATO <span style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>&amp;</span> ASSOCIADOS
            </div>
            <div style={{
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--gold-light)',
              fontWeight: 600,
              marginTop: '-2px'
            }}>
              Corporate Advisory &amp; Financial Engineering
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
            Simulador Financeiro
          </button>
          <button className="nav-link-btn" onClick={() => onNavigate('governanca')}>
            Governança &amp; Compliance
          </button>
        </nav>

        {/* Action Button */}
        <div>
          <button 
            className="btn-primary-gold" 
            onClick={onOpenContact}
            style={{ padding: '0.65rem 1.35rem', fontSize: '0.8rem' }}
          >
            Agendamento Executivo
            <ArrowUpRight size={14} />
          </button>
        </div>

      </div>
    </header>
  );
};
