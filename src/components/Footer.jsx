import React from 'react';
import { COMPANY_DATA } from '../data/companyData';
import { ArrowUpRight } from 'lucide-react';

export const Footer = ({ onNavigate, onOpenContact }) => {
  return (
    <footer style={{
      background: '#07090E',
      borderTop: '1px solid var(--border-subtle)',
      padding: '4.5rem 0 2rem'
    }}>
      <div className="container-xl">
        
        {/* Main Grid */}
        <div className="grid-4" style={{ gap: '2.5rem', marginBottom: '3.5rem' }}>
          
          {/* Col 1: Brand & Logo */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <img 
                src="/mourato-logo-transp.png" 
                alt="Mourato & Associados" 
                style={{ height: '44px', width: 'auto', objectFit: 'contain' }} 
              />
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                  MOURATO &amp; ASSOCIADOS
                </div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-light)' }}>
                  Corporate Advisory
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Boutique independente de inteligência financeira e corporativa, especializada na convergência entre mercado de capitais, desintermediação de spread bancário e governança consultiva.
            </p>

            <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>
              CNPJ: {COMPANY_DATA.cnpj} • {COMPANY_DATA.localizacao}
            </div>
          </div>

          {/* Col 2: Práticas */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FFFFFF', marginBottom: '1.2rem' }}>
              Práticas
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem' }}>
              <li>
                <button 
                  onClick={() => onNavigate('spread')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Otimização de Spread Bancário
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('spread')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Antecipação &amp; FIDCs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('spread')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Títulos Privados (CRI, CRA, Debêntures)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('spread')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Câmbio Comercial &amp; Hedge
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Consultoria */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FFFFFF', marginBottom: '1.2rem' }}>
              Consultoria &amp; Governança
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem' }}>
              <li>
                <button 
                  onClick={() => onNavigate('consultoria')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Reorganização Societária &amp; Holdings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('consultoria')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Contabilidade Consultiva &amp; Covenants
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('consultoria')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Planejamento Tributário Estratégico
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('consultoria')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  Valuation &amp; Assessoria em M&amp;A
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Relacionamento */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FFFFFF', marginBottom: '1.2rem' }}>
              Atendimento Direto
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Mandatos conduzidos com sigilo estrito e governança de dados garantida por acordo de confidencialidade.
            </p>
            <button 
              className="btn-primary-gold" 
              onClick={onOpenContact}
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem', width: '100%' }}
            >
              Falar com a Diretoria
              <ArrowUpRight size={14} />
            </button>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.76rem',
          color: '#64748B'
        }}>
          <div>
            © {new Date().getFullYear()} Mourato e Associados Ltda. Todos os direitos reservados. CNPJ: {COMPANY_DATA.cnpj}.
          </div>
          <div>
            São Paulo - SP • Atendimento Corporativo em Todo o Território Nacional.
          </div>
        </div>

      </div>
    </footer>
  );
};
