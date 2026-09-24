import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  Coins, 
  Layers, 
  ArrowRight,
  Phone,
  Mail,
  Building
} from 'lucide-react';

export const AdvisoryOnboardingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    empresa: '',
    cnpj: '',
    contatoNome: '',
    telefone: '',
    email: '',
    track: 'hibrido', // 'spread', 'consultoria', 'hibrido', 'contabilidade'
    volume: 'R$ 1M a R$ 5M',
    observacoes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2.5rem' }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: '10px',
                background: 'var(--gold-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#060911'
              }}>
                <Briefcase size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>Solicitar Advisory Executivo</h3>
                <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Mourato &amp; Associados • Atendimento Direto ao Empresário</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Service Track Selector */}
              <div>
                <label style={{ fontSize: '0.85rem', color: '#CBD5E1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                  Qual é o objetivo principal da sua empresa?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  {[
                    { id: 'spread', label: '1. Spread & Crédito', desc: 'Reduzir juros e captar funding' },
                    { id: 'consultoria', label: '2. Consultoria Gestão', desc: 'Governança e reestruturação' },
                    { id: 'hibrido', label: '3. Modelo Híbrido ★', desc: 'Spread + Consultoria Estratégica' },
                    { id: 'contabilidade', label: '4. Contábil & Fiscal', desc: 'Balanço e recuperação tributária' }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setFormData({ ...formData, track: item.id })}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: formData.track === item.id ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
                        background: formData.track === item.id ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.02)',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: formData.track === item.id ? '#F8E29E' : '#FFFFFF' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid 2 Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'block', marginBottom: '0.3rem' }}>Razão Social / Nome da Empresa:</label>
                  <input 
                    required
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    placeholder="Ex: Alfa Distribuidora Ltda"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '0.7rem 0.9rem',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'block', marginBottom: '0.3rem' }}>CNPJ (opcional):</label>
                  <input 
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    placeholder="00.000.000/0001-00"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '0.7rem 0.9rem',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>
              </div>

              {/* Grid 2 Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'block', marginBottom: '0.3rem' }}>Nome do Sócio / Responsável:</label>
                  <input 
                    required
                    type="text"
                    value={formData.contatoNome}
                    onChange={(e) => setFormData({ ...formData, contatoNome: e.target.value })}
                    placeholder="Seu nome"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '0.7rem 0.9rem',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'block', marginBottom: '0.3rem' }}>WhatsApp com DDD:</label>
                  <input 
                    required
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    placeholder="(11) 90000-0000"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '0.7rem 0.9rem',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'block', marginBottom: '0.3rem' }}>E-mail Corporativo:</label>
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="diretoria@suaempresa.com.br"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'block', marginBottom: '0.3rem' }}>Volume de Capital ou Faturamento Anual Estimado:</label>
                <select
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#131e33',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="Até R$ 500k">Até R$ 500.000 / ano</option>
                  <option value="R$ 500k a R$ 2M">De R$ 500.000 a R$ 2.000.000 / ano</option>
                  <option value="R$ 2M a R$ 10M">De R$ 2.000.000 a R$ 10.000.000 / ano</option>
                  <option value="Acima de R$ 10M">Acima de R$ 10.000.000 / ano</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn-gold" 
                style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
              >
                <Send size={16} />
                Enviar Solicitação de Advisory
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#64748B' }}>
                <ShieldCheck size={14} color="#10B981" />
                <span>Sigilo contratual absoluto e conformidade LGPD garantidos.</span>
              </div>

            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10B981',
              margin: '0 auto 1.5rem'
            }}>
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>
              Solicitação Registrada com Sucesso!
            </h3>
            
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              Agradecemos pelo contato, <strong style={{ color: '#F8FAFC' }}>{formData.contatoNome}</strong>. Os sócios e especialistas da <strong>Mourato &amp; Associados</strong> entrarão em contato no WhatsApp informado para agendar o alinhamento executivo.
            </p>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              maxWidth: '460px',
              margin: '0 auto 2rem',
              textAlign: 'left',
              fontSize: '0.85rem'
            }}>
              <div style={{ color: '#D4AF37', fontWeight: 700, marginBottom: '0.4rem' }}>Resumo do Pré-Agendamento:</div>
              <div><strong>Empresa:</strong> {formData.empresa}</div>
              <div><strong>Esteira Escolhida:</strong> {formData.track.toUpperCase()}</div>
              <div><strong>Volume Informado:</strong> {formData.volume}</div>
              <div><strong>Contato:</strong> {formData.telefone} • {formData.email}</div>
            </div>

            <button className="btn-gold" onClick={handleReset}>
              Concluir &amp; Voltar à Plataforma
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
