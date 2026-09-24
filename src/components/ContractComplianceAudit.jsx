import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  ExternalLink, 
  Building, 
  UserCheck, 
  FileText, 
  Award, 
  CheckCircle, 
  Lock,
  Layers,
  MapPin,
  Calendar,
  Hash
} from 'lucide-react';
import { CONTRACT_DATA } from '../data/contractData';

export const ContractComplianceAudit = () => {
  const [activeTab, setActiveTab] = useState('certidao'); // 'certidao', 'cnaes', 'clausulas', 'administracao'

  return (
    <section id="modulo-auditoria-compliance" style={{ padding: '4.5rem 0', background: 'rgba(9, 14, 25, 0.9)' }}>
      <div className="container-xl">
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3rem' }}>
          <span className="badge-gold" style={{ marginBottom: '0.8rem' }}>
            <FileCheck2 size={14} />
            CONFORMIDADE SOCIETÁRIA &amp; AUDITORIA JUCESP
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', marginBottom: '1rem' }}>
            Transparência &amp; Chancela Jurídica Oficial
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6 }}>
            Consulte a certidão de inteiro teor da <strong>Mourato &amp; Associados Ltda</strong>, registrada perante a Junta Comercial do Estado de São Paulo (JUCESP) com Capital Social de R$ 1.000.000,00 e objeto social plenamente habilitado.
          </p>
        </div>

        {/* Verification Ribbon */}
        <div style={{
          background: 'linear-gradient(90deg, #111a2d 0%, #162440 50%, #111a2d 100%)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '16px',
          padding: '1.5rem 2rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1.5px solid #10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10B981'
            }}>
              <ShieldCheck size={28} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 700 }}>
                  Certidão de Inteiro Teor Autenticada
                </h4>
                <span className="badge-emerald" style={{ fontSize: '0.7rem' }}>ICP-BRASIL VÁLIDA</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                Protocolo JUCESP: <strong style={{ color: '#F8FAFC' }}>{CONTRACT_DATA.empresa.protocoloJucesp}</strong> • Controle: <strong style={{ color: '#F8E29E' }}>{CONTRACT_DATA.empresa.codigoAutenticacao}</strong>
              </div>
            </div>
          </div>

          <a 
            href={`https://${CONTRACT_DATA.empresa.portalValidacao}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-outline-gold"
            style={{ fontSize: '0.85rem' }}
          >
            Verificar no Portal JUCESP
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          marginBottom: '2rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          {[
            { id: 'certidao', label: '1. Dados Cadastrais & Empresa', icon: Building },
            { id: 'cnaes', label: '2. CNAEs & Objeto Social', icon: Layers },
            { id: 'administracao', label: '3. Quadro Societário (QSA)', icon: UserCheck },
            { id: 'clausulas', label: '4. Cláusulas do Contrato', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.4rem',
                  borderRadius: '12px',
                  border: isActive ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
                  background: isActive ? 'rgba(212, 175, 55, 0.15)' : 'rgba(16, 25, 42, 0.6)',
                  color: isActive ? '#F8E29E' : '#94A3B8',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s'
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Certidão & Dados Cadastrais */}
        {activeTab === 'certidao' && (
          <div className="glass-panel" style={{ padding: '2.5rem', animation: 'fadeIn 0.3s' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.8rem', color: '#FFFFFF' }}>
              Ficha Cadastral Oficial da Sociedade
            </h3>

            <div className="grid-cols-2" style={{ gap: '1.5rem' }}>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Razão Social</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.3rem' }}>
                  {CONTRACT_DATA.empresa.razaoSocial}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nome Fantasia</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8E29E', marginTop: '0.3rem' }}>
                  {CONTRACT_DATA.empresa.nomeFantasia}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CNPJ (Receita Federal)</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#34D399', marginTop: '0.3rem' }}>
                  {CONTRACT_DATA.empresa.cnpj}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>NIRE JUCESP</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#60A5FA', marginTop: '0.3rem' }}>
                  {CONTRACT_DATA.empresa.nire}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Capital Social Subscrito e Integralizado</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D4AF37', marginTop: '0.3rem', fontFamily: "'Cinzel', serif" }}>
                  {CONTRACT_DATA.empresa.capitalSocialExtenso}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                  {CONTRACT_DATA.empresa.quotas}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sede Social</span>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF', marginTop: '0.3rem' }}>
                  {CONTRACT_DATA.endereco.localizacaoCompleta}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: CNAEs & Objeto Social */}
        {activeTab === 'cnaes' && (
          <div className="glass-panel" style={{ padding: '2.5rem', animation: 'fadeIn 0.3s' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', color: '#FFFFFF' }}>
              Objeto Social &amp; CNAEs Homologados
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '2rem' }}>
              A sociedade possui autorização legal e cadastral para prestar serviços auxiliares de intermediação financeira, consultoria de gestão e contabilidade.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {CONTRACT_DATA.cnaes.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '14px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <span style={{
                        background: 'var(--gold-gradient)',
                        color: '#060911',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        padding: '0.3rem 0.7rem',
                        borderRadius: '6px'
                      }}>
                        CNAE {item.codigo}
                      </span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {item.titulo}
                      </span>
                    </div>
                    <span className="badge-blue">{item.tipo}</span>
                  </div>

                  <p style={{ color: '#CBD5E1', fontSize: '0.92rem', marginTop: '0.3rem', lineHeight: 1.55 }}>
                    {item.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: QSA / Administração */}
        {activeTab === 'administracao' && (
          <div className="glass-panel" style={{ padding: '2.5rem', animation: 'fadeIn 0.3s' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.8rem', color: '#FFFFFF' }}>
              Quadro de Sócios e Administradores (QSA)
            </h3>

            {CONTRACT_DATA.socios.map((socio, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'rgba(16, 25, 42, 0.7)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  borderRadius: '16px',
                  padding: '2rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span className="badge-gold">SÓCIO ADMINISTRADOR TITULAR</span>
                    <h4 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginTop: '0.4rem' }}>
                      {socio.nome}
                    </h4>
                    <div style={{ fontSize: '0.88rem', color: '#94A3B8' }}>
                      {socio.nacionalidade}, {socio.estadoCivil}, Empresário • Natural de {socio.naturalidade}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Participação no Capital</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34D399', fontFamily: "'Cinzel', serif" }}>
                      100%
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#D4AF37' }}>
                      {socio.valorQuotas}
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '1.2rem',
                  borderRadius: '12px',
                  borderLeft: '3px solid #D4AF37',
                  fontSize: '0.92rem',
                  color: '#CBD5E1',
                  lineHeight: 1.6
                }}>
                  <strong style={{ color: '#F8E29E' }}>Poderes Contratuais: </strong>
                  {socio.poderes}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Cláusulas */}
        {activeTab === 'clausulas' && (
          <div className="glass-panel" style={{ padding: '2.5rem', animation: 'fadeIn 0.3s' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.8rem', color: '#FFFFFF' }}>
              Síntese das Cláusulas do Contrato Social Consolidado
            </h3>

            <div className="grid-cols-2" style={{ gap: '1.25rem' }}>
              {CONTRACT_DATA.clausulasPrincipais.map((clausula, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '14px',
                    padding: '1.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4AF37', textTransform: 'uppercase' }}>
                      Cláusula {clausula.numero}:
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {clausula.titulo}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.55 }}>
                    {clausula.conteudo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
