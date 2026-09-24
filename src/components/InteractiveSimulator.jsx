import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  TrendingUp, 
  Sparkles, 
  Download, 
  CheckCircle, 
  ArrowRight,
  DollarSign,
  Percent,
  Layers
} from 'lucide-react';

export const InteractiveSimulator = ({ onOpenOnboarding }) => {
  // Simulator State
  const [operationVolume, setOperationVolume] = useState(3000000); // R$ 3.000.000
  const [currentSpread, setCurrentSpread] = useState(6.8); // 6.8% a.a. acima do CDI
  const [mouratoSpread, setMouratoSpread] = useState(2.6); // 2.6% a.a. acima do CDI
  const [tenorMonths, setTenorMonths] = useState(24); // 24 meses
  const [includeConsulting, setIncludeConsulting] = useState(true);

  // Calculations
  const stats = useMemo(() => {
    const spreadDeltaPercent = Math.max(0, currentSpread - mouratoSpread);
    const annualSavings = (operationVolume * spreadDeltaPercent) / 100;
    const totalContractSavings = annualSavings * (tenorMonths / 12);
    
    // Impact of consulting on tax/operational efficiency (estimated ~3.5% of volume in savings/optimizations)
    const consultingValueGain = includeConsulting ? operationVolume * 0.038 : 0;
    const grandTotalBenefit = totalContractSavings + consultingValueGain;
    const estimatedRoi = includeConsulting ? Math.round((grandTotalBenefit / (operationVolume * 0.025)) * 100) : 0;

    return {
      spreadDeltaPercent: spreadDeltaPercent.toFixed(1),
      annualSavings,
      totalContractSavings,
      consultingValueGain,
      grandTotalBenefit,
      estimatedRoi
    };
  }, [operationVolume, currentSpread, mouratoSpread, tenorMonths, includeConsulting]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="modulo-simulador" style={{ padding: '4.5rem 0' }}>
      <div className="container-xl">
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <span className="badge-gold" style={{ marginBottom: '0.8rem' }}>
            <Calculator size={14} />
            SIMULADOR INTERATIVO EXECUTIVO
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', marginBottom: '1rem' }}>
            Calcule o Impacto Real: <br />
            <span className="text-gradient-gold">Economia de Spread</span> &amp; <span className="text-gradient-emerald">Ganho de Consultoria</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>
            Ajuste o volume de capital, o spread cobrado pelo seu banco e veja quanto dinheiro deixa de queimar na mesa bancária para retornar ao caixa da sua empresa.
          </p>
        </div>

        <div className="grid-cols-2" style={{ gap: '2rem', alignItems: 'start' }}>
          
          {/* Controls Panel */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Layers size={18} color="#D4AF37" />
              Parâmetros da Operação Financeira
            </h3>

            {/* Volume Slider */}
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 600 }}>
                  Volume de Capital / Crédito ou Antecipação Anual:
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F8E29E' }}>
                  {formatCurrency(operationVolume)}
                </span>
              </div>
              <input 
                type="range" 
                min="200000" 
                max="25000000" 
                step="100000"
                value={operationVolume}
                onChange={(e) => setOperationVolume(Number(e.target.value))}
                className="custom-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', marginTop: '0.4rem' }}>
                <span>R$ 200 mil</span>
                <span>R$ 10 milhões</span>
                <span>R$ 25 milhões</span>
              </div>
            </div>

            {/* Current Bank Spread */}
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 600 }}>
                  Spread do seu Banco Atual (CDI + % a.a.):
                </label>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F87171' }}>
                  +{currentSpread}% a.a.
                </span>
              </div>
              <input 
                type="range" 
                min="3.0" 
                max="14.0" 
                step="0.2"
                value={currentSpread}
                onChange={(e) => setCurrentSpread(Number(e.target.value))}
                className="custom-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', marginTop: '0.4rem' }}>
                <span>+3% (Baixo)</span>
                <span>+7% (Média varejo PJ)</span>
                <span>+14% (Crítico/Alto)</span>
              </div>
            </div>

            {/* Mourato Negotiated Spread */}
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 600 }}>
                  Spread Otimizado Mourato &amp; Associados (Atacado):
                </label>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34D399' }}>
                  +{mouratoSpread}% a.a.
                </span>
              </div>
              <input 
                type="range" 
                min="1.0" 
                max="5.0" 
                step="0.1"
                value={mouratoSpread}
                onChange={(e) => setMouratoSpread(Number(e.target.value))}
                className="custom-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', marginTop: '0.4rem' }}>
                <span>+1.0% (Grandes Estruturações)</span>
                <span>+2.6% (Média PME Atacado)</span>
                <span>+5.0%</span>
              </div>
            </div>

            {/* Prazo */}
            <div style={{ marginBottom: '1.8rem' }}>
              <label style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 600, display: 'block', marginBottom: '0.6rem' }}>
                Prazo da Estruturação (Meses):
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {[12, 24, 36, 48].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenorMonths(m)}
                    style={{
                      padding: '0.6rem',
                      borderRadius: '8px',
                      border: tenorMonths === m ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                      background: tenorMonths === m ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)',
                      color: tenorMonths === m ? '#F8E29E' : '#94A3B8',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {m} meses
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox Consulting */}
            <div style={{
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              padding: '1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              cursor: 'pointer'
            }}
            onClick={() => setIncludeConsulting(!includeConsulting)}
            >
              <input 
                type="checkbox" 
                checked={includeConsulting} 
                onChange={(e) => setIncludeConsulting(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: '#D4AF37', cursor: 'pointer' }}
              />
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Incluir Sinergia com Consultoria de Gestão &amp; Societária
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  Revisão de custos fiscais, balancetes e governança para blindar margens.
                </div>
              </div>
            </div>

          </div>

          {/* Results Summary Card */}
          <div className="glass-panel-gold" style={{ padding: '2.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <span className="badge-emerald">RESULTADO PROJETADO</span>
              <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Horizonte: {tenorMonths} meses</span>
            </div>

            <h3 style={{ fontSize: '1.2rem', color: '#CBD5E1', marginBottom: '0.2rem' }}>
              Economia Líquida em Spread Bancário:
            </h3>
            
            <div style={{
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              fontWeight: 800,
              fontFamily: "'Cinzel', serif",
              color: '#34D399',
              lineHeight: 1.1,
              marginBottom: '1rem'
            }}>
              {formatCurrency(stats.totalContractSavings)}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
              color: '#F8E29E',
              marginBottom: '1.8rem',
              background: 'rgba(212, 175, 55, 0.1)',
              padding: '0.6rem 1rem',
              borderRadius: '8px'
            }}>
              <TrendingDown size={18} />
              <span>Redução de <strong>{stats.spreadDeltaPercent}% a.a.</strong> nas taxas marginais bancárias.</span>
            </div>

            {/* Breakdown List */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.2rem', marginBottom: '2rem' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
                <span style={{ color: '#94A3B8' }}>Economia Anual Recorrente:</span>
                <strong style={{ color: '#F8FAFC' }}>{formatCurrency(stats.annualSavings)}/ano</strong>
              </div>

              {includeConsulting && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
                  <span style={{ color: '#94A3B8' }}>Otimização Fiscal &amp; Gestão (Consultoria):</span>
                  <strong style={{ color: '#60A5FA' }}>+{formatCurrency(stats.consultingValueGain)}</strong>
                </div>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.8rem',
                borderTop: '1px dashed rgba(212,175,55,0.3)',
                fontSize: '1.05rem',
                fontWeight: 700
              }}>
                <span style={{ color: '#FFFFFF' }}>Retorno Global para a Empresa:</span>
                <span style={{ color: '#F8E29E' }}>{formatCurrency(stats.grandTotalBenefit)}</span>
              </div>
            </div>

            {/* Final CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button 
                className="btn-gold" 
                onClick={onOpenOnboarding}
                style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}
              >
                Solicitar Estudo de Viabilidade Oficial
                <ArrowRight size={18} />
              </button>
              
              <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#64748B' }}>
                Simulação orientativa baseada nas condições médias de mercado de atacado intermediadas sob o CNAE 6619-3/99.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
