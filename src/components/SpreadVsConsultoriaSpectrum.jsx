import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Coins, 
  Check, 
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SPECTRUM_COMPARISON } from '../data/modulesData';

export const SpreadVsConsultoriaSpectrum = ({ onNavigateToSimulator, onOpenOnboarding }) => {
  const [activeTab, setActiveTab] = useState('synergy'); // 'spread', 'synergy', 'consultoria'

  return (
    <section id="modulo-espectro" style={{ padding: '4rem 0', background: 'rgba(9, 14, 25, 0.6)' }}>
      <div className="container-xl">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
          <span className="badge-blue" style={{ marginBottom: '0.8rem' }}>
            <ArrowLeftRight size={14} />
            DIFERENCIAL COMPETITIVO CLARO
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', marginBottom: '1rem' }}>
            O Espectro Completo: <br />
            <span className="text-gradient-gold">Da Engenharia de Spread</span> à <span className="text-gradient-blue">Consultoria Estratégica</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Entenda detalhadamente a abrangência da <strong>Mourato & Associados</strong>. Não atuamos como intermediários isolados nem como consultores acadêmicos. Entregamos a <strong>liquidez imediata no spread</strong> com a <strong>sustentabilidade de longo prazo na consultoria</strong>.
          </p>
        </div>

        {/* Interactive Segmented Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(16, 25, 42, 0.9)',
          padding: '0.5rem',
          borderRadius: '16px',
          maxWidth: '680px',
          margin: '0 auto 2.5rem',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
          <button
            onClick={() => setActiveTab('spread')}
            style={{
              flex: 1,
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'spread' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'transparent',
              color: activeTab === 'spread' ? '#FFFFFF' : '#94A3B8',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.25s'
            }}
          >
            <Coins size={16} />
            1. Ponta do Spread
          </button>

          <button
            onClick={() => setActiveTab('synergy')}
            style={{
              flex: 1,
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'synergy' ? 'linear-gradient(135deg, #D4AF37 0%, #9E741B 100%)' : 'transparent',
              color: activeTab === 'synergy' ? '#090E17' : '#94A3B8',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.25s'
            }}
          >
            <Sparkles size={16} />
            ★ A Sinergia Híbrida
          </button>

          <button
            onClick={() => setActiveTab('consultoria')}
            style={{
              flex: 1,
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'consultoria' ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' : 'transparent',
              color: activeTab === 'consultoria' ? '#FFFFFF' : '#94A3B8',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.25s'
            }}
          >
            <ShieldCheck size={16} />
            2. Ponta da Consultoria
          </button>
        </div>

        {/* Tab 1: Spread Content */}
        {activeTab === 'spread' && (
          <div className="glass-panel" style={{ padding: '2.5rem', borderLeft: '4px solid #10B981', animation: 'fadeIn 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge-emerald">{SPECTRUM_COMPARISON.spread.tag}</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>{SPECTRUM_COMPARISON.spread.title}</h3>
              </div>
              <button className="btn-secondary" onClick={onNavigateToSimulator}>
                Calcular Meu Spread Atual <ArrowRight size={16} />
              </button>
            </div>

            <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginBottom: '2rem', maxWidth: '900px' }}>
              {SPECTRUM_COMPARISON.spread.description}
            </p>

            {/* Metrics */}
            <div className="grid-cols-4" style={{ gap: '1rem', marginBottom: '2.5rem' }}>
              {SPECTRUM_COMPARISON.spread.metrics.map((m, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase' }}>{m.label}</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34D399', marginTop: '0.3rem' }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Features list */}
            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1.8rem', borderRadius: '14px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#FFFFFF' }}>Capacidades Operacionais na Ponta do Spread:</h4>
              <div className="grid-cols-2" style={{ gap: '0.8rem' }}>
                {SPECTRUM_COMPARISON.spread.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34D399', flexShrink: 0 }}>
                      <Check size={14} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Synergy (The Core) */}
        {activeTab === 'synergy' && (
          <div className="glass-panel-gold" style={{ padding: '2.5rem', animation: 'fadeIn 0.3s' }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
              <span className="badge-gold">O EFEITO MULTIPLICADOR MOURATO</span>
              <h3 style={{ fontSize: '1.9rem', marginTop: '0.6rem', color: '#FFFFFF' }}>
                Por que a União de Spread + Consultoria é Insuperável?
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '1rem', marginTop: '0.5rem' }}>
                {SPECTRUM_COMPARISON.synergy.description}
              </p>
            </div>

            {/* 4-Step Virtuous Cycle */}
            <div className="grid-cols-4" style={{ gap: '1.25rem', marginBottom: '2.5rem' }}>
              {SPECTRUM_COMPARISON.synergy.flow.map((item) => (
                <div 
                  key={item.step} 
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--gold-gradient)',
                    color: '#060911',
                    fontWeight: 800,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
                  }}>
                    {item.step}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.6rem', color: '#F8FAFC' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Practical Synthesis Banner */}
            <div style={{
              background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              padding: '1.5rem 2rem',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFC' }}>
                  Quer saber se a sua empresa precisa de Spread, Consultoria ou da Solução Integrada?
                </div>
                <div style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                  Nossos sócios e especialistas analisam seu balanço e contratos vigentes sem custo inicial.
                </div>
              </div>

              <button className="btn-gold" onClick={onOpenOnboarding}>
                Agendar Diagnóstico Gratuito
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Consultoria Content */}
        {activeTab === 'consultoria' && (
          <div className="glass-panel" style={{ padding: '2.5rem', borderLeft: '4px solid #3B82F6', animation: 'fadeIn 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge-blue">{SPECTRUM_COMPARISON.consultoria.tag}</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>{SPECTRUM_COMPARISON.consultoria.title}</h3>
              </div>
              <button className="btn-secondary" onClick={onOpenOnboarding}>
                Falar com Especialista Societário <ArrowRight size={16} />
              </button>
            </div>

            <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginBottom: '2rem', maxWidth: '900px' }}>
              {SPECTRUM_COMPARISON.consultoria.description}
            </p>

            {/* Metrics */}
            <div className="grid-cols-4" style={{ gap: '1rem', marginBottom: '2.5rem' }}>
              {SPECTRUM_COMPARISON.consultoria.metrics.map((m, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase' }}>{m.label}</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#60A5FA', marginTop: '0.3rem' }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Features list */}
            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1.8rem', borderRadius: '14px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#FFFFFF' }}>Capacidades Estruturais na Ponta da Consultoria:</h4>
              <div className="grid-cols-2" style={{ gap: '0.8rem' }}>
                {SPECTRUM_COMPARISON.consultoria.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', flexShrink: 0 }}>
                      <Check size={14} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
