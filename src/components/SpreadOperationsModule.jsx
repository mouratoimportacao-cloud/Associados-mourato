import React, { useState } from 'react';
import { 
  TrendingUp, 
  Coins, 
  FileText, 
  Building2, 
  ArrowUpRight, 
  ShieldAlert, 
  CheckCircle2, 
  Banknote,
  Repeat,
  Clock,
  Landmark
} from 'lucide-react';

export const SpreadOperationsModule = ({ onOpenOnboarding }) => {
  const [selectedOperation, setSelectedOperation] = useState(0);

  const operations = [
    {
      title: "Intermediação de Spread Bancário PJ",
      icon: Landmark,
      badge: "Redução de Juros",
      tagline: "Substituição de dívida cara de varejo por funding estruturado institucional.",
      cnae: "6619-3/99 e 7490-1/04",
      highlights: [
        "Negociação direta com mesas de crédito de atacado e bancos de médio porte",
        "Redução da taxa final de CDI + 6%~12% para patamares de CDI + 1.8%~3.5%",
        "Alongamento do cronograma de amortização de 12 para até 60 meses com carência",
        "Desoneração de garantias reais e mitigação de travas bancárias"
      ],
      practicalScenario: "Empresa de comércio com R$ 5M em duplicatas e capital de giro pagava 2.8% a.m. de spread. A Mourato & Associados reestruturou a operação para 1.35% a.m., gerando mais de R$ 750 mil de liquidez direta no fluxo de caixa anual."
    },
    {
      title: "Antecipação de Recebíveis & FIDCs",
      icon: Banknote,
      badge: "Liquidez Imediata",
      tagline: "Deságio reduzido em duplicatas, contratos de fornecimento e cartões.",
      cnae: "6619-3/99",
      highlights: [
        "Acesso a mais de 15 fundos de investimento em direitos creditórios (FIDCs)",
        "Taxas de deságio substancialmente inferiores às adquirentes tradicionais",
        "Operação sem reciprocidade bancária (sem exigir contratação de seguros forçados)",
        "Liquidação D+0 ou D+1 diretamente na conta corrente da empresa"
      ],
      practicalScenario: "Indústria com ciclo financeiro estendido de 90 dias antecipava com factoring a 3.4% a.m. Estruturamos cessão de recebíveis via FIDC a 1.45% a.m. sem comprometer o limite de crédito bancário."
    },
    {
      title: "Captação Estruturada (CRI, CRA & Debêntures)",
      icon: TrendingUp,
      badge: "Expansão & Capex",
      tagline: "Emissão de títulos privados para empresas em fase de expansão ou aquisição.",
      cnae: "7490-1/04",
      highlights: [
        "Montagem completa do dossiê de crédito e modelagem financeira de covenants",
        "Acesso a investidores institucionais, family offices e fundos de crédito privado",
        "Volumes a partir de R$ 5 milhões com amortização bullet ou semestral",
        "Sem necessidade de alienação de controle societário"
      ],
      practicalScenario: "Rede de logística necessitava de R$ 12M para compra de frota e centros de distribuição. Coordenamos a emissão de debêntures privadas atreladas a IPCA + 6.2%, garantindo 24 meses de carência total."
    },
    {
      title: "Arbitragem de Câmbio & Comércio Exterior",
      icon: Repeat,
      badge: "Global & FX",
      tagline: "Eliminação de spreads cambiais abusivos em importações e exportações.",
      cnae: "6619-3/99",
      highlights: [
        "Spread de fechamento de câmbio pronto ou futuro reduzido a frações de centavo",
        "Hedge cambial (Trava de dólar / NDF) para proteger a margem do importador/exportador",
        "Operações de FINIMP e Adiantamento sobre Contrato de Câmbio (ACC/ACE)",
        "Conexão com corretoras e bancos de câmbio homologados pelo BACEN"
      ],
      practicalScenario: "Importador pagava spread de 1.8% sobre a cotação PTAX em cada remessa internacional. Com o desk da Mourato & Associados, o spread caiu para 0.25%, economizando R$ 380 mil por trimestre."
    }
  ];

  return (
    <section id="modulo-operacoes-spread" style={{ padding: '4.5rem 0', background: 'rgba(7, 11, 20, 0.85)' }}>
      <div className="container-xl">
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3rem' }}>
          <span className="badge-emerald" style={{ marginBottom: '0.8rem' }}>
            <TrendingUp size={14} />
            MÓDULO DE ENGENHARIA FINANCEIRA
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', marginBottom: '1rem' }}>
            Operações de Spread &amp; Intermediação Bancária
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6 }}>
            Atuamos amparados nos CNAEs 6619-3/99 e 7490-1/04 para destravar as melhores taxas do mercado de capitais para a sua empresa, convertendo ineficiência bancária em caixa real.
          </p>
        </div>

        {/* 4 Operations Grid */}
        <div className="grid-cols-4" style={{ gap: '1rem', marginBottom: '2rem' }}>
          {operations.map((op, idx) => {
            const Icon = op.icon;
            const isSelected = selectedOperation === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedOperation(idx)}
                style={{
                  textAlign: 'left',
                  background: isSelected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 25, 42, 0.6)',
                  border: isSelected ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.08)',
                  padding: '1.4rem',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  boxShadow: isSelected ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: isSelected ? '#10B981' : 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? '#060911' : '#34D399'
                  }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: isSelected ? '#34D399' : '#64748B' }}>
                    {op.badge}
                  </span>
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.3rem' }}>
                  {op.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  CNAE: {op.cnae}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Operation Detail View */}
        {operations[selectedOperation] && (
          <div className="glass-panel" style={{ padding: '2.5rem', borderLeft: '4px solid #10B981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge-emerald">{operations[selectedOperation].badge}</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '0.5rem', color: '#FFFFFF' }}>
                  {operations[selectedOperation].title}
                </h3>
                <p style={{ color: '#F8E29E', fontSize: '1rem', marginTop: '0.3rem' }}>
                  {operations[selectedOperation].tagline}
                </p>
              </div>

              <button className="btn-gold" onClick={onOpenOnboarding}>
                Estruturar Esta Operação
                <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Highlights List */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.05rem', color: '#CBD5E1', marginBottom: '1rem' }}>
                Entregas Técnicas do Módulo de Spread:
              </h4>
              <div className="grid-cols-2" style={{ gap: '0.9rem' }}>
                {operations[selectedOperation].highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem' }}>
                    <div style={{ marginTop: '2px', color: '#34D399', flexShrink: 0 }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Study Card */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D4AF37', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <span>Caso Prático &amp; Aplicação Real no Mercado:</span>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                "{operations[selectedOperation].practicalScenario}"
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
