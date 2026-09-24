import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  Coins, 
  Briefcase, 
  Phone, 
  Mail,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CONTRACT_DATA } from '../data/contractData';
import { PLATFORM_MODULES } from '../data/modulesData';

export const Footer = ({ onNavigate, onOpenOnboarding }) => {
  return (
    <footer style={{
      background: '#04070D',
      borderTop: '1px solid rgba(212, 175, 55, 0.25)',
      padding: '4.5rem 0 2rem',
      position: 'relative'
    }}>
      <div className="container-xl">
        
        {/* Top 4-Column Grid */}
        <div className="grid-cols-4" style={{ gap: '2.5rem', marginBottom: '3.5rem' }}>
          
          {/* Brand Col with the Official Logo */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div style={{
                background: '#FFFFFF',
                padding: '4px 8px',
                borderRadius: '8px',
                border: '1.5px solid #D4AF37',
                display: 'inline-flex',
                boxShadow: '0 4px 12px rgba(212,175,55,0.2)'
              }}>
                <img 
                  src="/mourato-logo.png" 
                  alt="Mourato & Associados" 
                  style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
                />
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Banca corporativa especializada na convergência entre a engenharia de spread financeiro, intermediação de crédito PJ, consultoria de gestão e contabilidade societária.
            </p>

            <div style={{ fontSize: '0.78rem', color: '#E5C365', fontWeight: 600 }}>
              Capital Social: R$ 1.000.000,00 Integralizado
            </div>
          </div>

          {/* Quick Nav Modules */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
              Módulos da Plataforma
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {PLATFORM_MODULES.slice(0, 5).map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => onNavigate(m.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: 0,
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#F8E29E'}
                    onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                  >
                    <ChevronRight size={14} color="#D4AF37" />
                    {m.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Legal JUCESP */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
              Conformidade &amp; Registro
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem', color: '#94A3B8' }}>
              <div>
                <strong style={{ color: '#F8FAFC' }}>Razão Social:</strong><br />
                {CONTRACT_DATA.empresa.razaoSocial}
              </div>
              <div>
                <strong style={{ color: '#F8FAFC' }}>CNPJ:</strong> {CONTRACT_DATA.empresa.cnpj}
              </div>
              <div>
                <strong style={{ color: '#F8FAFC' }}>NIRE:</strong> {CONTRACT_DATA.empresa.nire}
              </div>
              <div>
                <strong style={{ color: '#F8FAFC' }}>Protocolo:</strong> {CONTRACT_DATA.empresa.protocoloJucesp}
              </div>
              <button 
                onClick={() => onNavigate('auditoria-compliance')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4AF37',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginTop: '0.4rem'
                }}
              >
                Auditar Certidão JUCESP <ExternalLink size={12} />
              </button>
            </div>
          </div>

          {/* Sede & Direct Contact */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
              Sede Corporativa
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: '#94A3B8' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} color="#D4AF37" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>
                  {CONTRACT_DATA.endereco.localizacaoCompleta}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="#10B981" />
                <span>Atividades iniciadas em 09/12/2020</span>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <button 
                  className="btn-gold" 
                  onClick={onOpenOnboarding}
                  style={{ width: '100%', fontSize: '0.85rem', padding: '0.65rem 1rem' }}
                >
                  <Briefcase size={14} />
                  Falar com Sócio Diretor
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Disclaimer */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#64748B'
        }}>
          <div>
            © {new Date().getFullYear()} MOURATO E ASSOCIADOS LTDA. Todos os direitos reservados.
          </div>
          <div>
            Desenvolvido conforme Contrato Social Registrado sob NIRE 35270804594 e Autenticação JUCESP 299506304.
          </div>
        </div>

      </div>
    </footer>
  );
};
