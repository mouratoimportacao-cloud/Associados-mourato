import React from 'react';
import { 
  Building2, 
  ArrowLeftRight, 
  TrendingUp, 
  ShieldCheck, 
  Calculator, 
  FileCheck2, 
  Briefcase, 
  PhoneCall, 
  ExternalLink 
} from 'lucide-react';
import { PLATFORM_MODULES } from '../data/modulesData';
import { CONTRACT_DATA } from '../data/contractData';

export const Header = ({ activeModule, setActiveModule, onOpenOnboarding }) => {
  const getIcon = (name) => {
    switch (name) {
      case 'Building2': return <Building2 size={16} />;
      case 'ArrowLeftRight': return <ArrowLeftRight size={16} />;
      case 'TrendingUp': return <TrendingUp size={16} />;
      case 'ShieldCheck': return <ShieldCheck size={16} />;
      case 'Calculator': return <Calculator size={16} />;
      case 'FileCheck2': return <FileCheck2 size={16} />;
      case 'Briefcase': return <Briefcase size={16} />;
      default: return null;
    }
  };

  return (
    <header className="header-sticky">
      {/* Top Bar with Legal Cert & Registration */}
      <div style={{
        background: 'linear-gradient(90deg, #090e17 0%, #111a2d 50%, #090e17 100%)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
        padding: '0.35rem 1.5rem',
        fontSize: '0.75rem',
        color: '#94A3B8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#E5C365', fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }}></span>
            JUCESP REGISTRADA
          </span>
          <span>NIRE: <strong style={{ color: '#F8FAFC' }}>{CONTRACT_DATA.empresa.nire}</strong></span>
          <span>CNPJ: <strong style={{ color: '#F8FAFC' }}>{CONTRACT_DATA.empresa.cnpj}</strong></span>
          <span>Capital: <strong style={{ color: '#34D399' }}>R$ 1.000.000,00</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Sede: Av. São Luís, 187 - República, SP</span>
          <button 
            onClick={() => setActiveModule('auditoria-compliance')}
            style={{
              background: 'none',
              border: 'none',
              color: '#D4AF37',
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontWeight: 600
            }}
          >
            Ver Certidão JUCESP <ExternalLink size={12} />
          </button>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="header-container">
        <div 
          onClick={() => setActiveModule('visao-geral')} 
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
        >
          {/* Bespoke Crest SVG */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #141e33 0%, #080d1a 100%)',
            border: '1.5px solid rgba(212, 175, 55, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.5), 0 0 15px rgba(212,175,55,0.2)'
          }}>
            <svg viewBox="0 0 100 100" width="34" height="34">
              <path d="M 50 4 L 92 25 L 92 70 L 50 94 L 8 70 L 8 25 Z" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
              <path d="M 28 72 L 28 32 L 40 52 L 50 38 L 60 52 L 72 32 L 72 72 L 62 72 L 62 46 L 54 60 L 46 60 L 38 46 L 38 72 Z" fill="#F8E29E" />
              <polygon points="50,14 55,20 50,26 45,20" fill="#FFFFFF" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#FFFFFF'
              }}>
                MOURATO <span style={{ color: '#D4AF37', fontWeight: 600 }}>&amp;</span> ASSOCIADOS
              </span>
            </div>
            <div style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              fontWeight: 700,
              marginTop: '-2px'
            }}>
              Do Spread Financeiro à Consultoria Empresarial
            </div>
          </div>
        </div>

        {/* CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button 
            className="btn-outline-gold"
            onClick={() => setActiveModule('simulador-interativo')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', padding: '0.6rem 1.1rem' }}
          >
            <Calculator size={15} />
            Simulador de Spread
          </button>

          <button 
            className="btn-gold"
            onClick={onOpenOnboarding}
            style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
          >
            <Briefcase size={15} />
            Solicitar Advisory
          </button>
        </div>
      </div>

      {/* Modular Navigation Bar */}
      <div style={{ background: 'rgba(11, 17, 30, 0.95)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="container-xl">
          <nav className="nav-modules-bar" aria-label="Módulos da Plataforma">
            {PLATFORM_MODULES.map((mod) => {
              const isActive = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`nav-module-item ${isActive ? 'active' : ''}`}
                >
                  <span style={{ color: isActive ? '#D4AF37' : '#94A3B8' }}>
                    {getIcon(mod.iconName)}
                  </span>
                  <span>{mod.shortTitle}</span>
                  {isActive && (
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#D4AF37',
                      display: 'inline-block'
                    }}></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
