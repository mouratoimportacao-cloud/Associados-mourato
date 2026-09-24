import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  PieChart, 
  FileSpreadsheet, 
  Users2, 
  Building, 
  Scale, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export const ConsultingModule = ({ onOpenOnboarding }) => {
  const [activeConsultingTab, setActiveConsultingTab] = useState(0);

  const consultingTracks = [
    {
      title: "Consultoria em Gestão Empresarial & Turnaround",
      cnae: "7020-4/00",
      icon: Briefcase,
      badge: "Gestão Estratégica",
      overview: "Diagnóstico profundo de gargalos operacionais, recomposição de margens de contribuição e implantação de controles de tesouraria de padrão internacional.",
      pillars: [
        "Mapeamento 360° de centros de custo e corte de desperdícios invisíveis",
        "Implementação de DRE Gerencial, Fluxo de Caixa Direto e Orçamento Base Zero (OBZ)",
        "Desenho de KPIs executivos com dashboards dinâmicos para a diretoria",
        "Estratégia de precificação científica para blindagem do lucro operacional"
      ],
      impact: "Média de elevação de 22% no EBITDA em 9 meses de acompanhamento consultivo."
    },
    {
      title: "Contabilidade Consultiva & Societária",
      cnae: "6920-6/01",
      icon: FileSpreadsheet,
      badge: "Contabilidade & Balanço",
      overview: "Transformamos a contabilidade de uma mera emissora de guias de impostos em uma alavanca estratégica de crédito e valorização da marca.",
      pillars: [
        "Fechamentos mensais pontuais com balancetes auditados para bancos e investidores",
        "Reclassificação contábil rigorosa de ativos e passivos para elevação do Score de Crédito",
        "Adequação às normas CPC / IFRS para operações de captação e due diligence",
        "BPO contábil e fiscal com backoffice dedicado e segurança cibernética"
      ],
      impact: "Elimina inconsistências que reprovam crédito bancário em até 95% dos casos."
    },
    {
      title: "Planejamento Tributário & Eficiência Fiscal",
      cnae: "6920-6/01",
      icon: PieChart,
      badge: "Recuperação & Eficiência",
      overview: "Redução legal e legítima da pesada carga tributária brasileira através de teses administrativas pacificadas e cruzamento digital de SPED.",
      pillars: [
        "Estudo comparativo de regimes (Lucro Real vs. Lucro Presumido vs. Simples Nacional)",
        "Revisão dos últimos 60 meses de tributos federais e estaduais (PIS, COFINS, ICMS, IRPJ/CSLL)",
        "Aproveitamento lícito de créditos acumulados e subvenções de investimento",
        "Compliance preventivo contra autuações e contingências fiscais"
      ],
      impact: "Geração de fôlego financeiro equivalente a 3% a 7% do faturamento anual da empresa."
    },
    {
      title: "Reestruturação Societária, M&A & Holdings",
      cnae: "7020-4/00",
      icon: Scale,
      badge: "Patrimônio & Futuro",
      overview: "Estruturação de holdings patrimoniais, acordos de sócios blindados, preparação para venda (M&A) e sucessão familiar pacífica e econômica.",
      pillars: [
        "Criação de Holding Familiar e Operacional para proteção e redução de ITCMD",
        "Valuation fundamentado pelo método de Fluxo de Caixa Descontado (DCF)",
        "Elaboração de Acordo de Sócios com regras claras de saída, tag along e drag along",
        "Assessoria completa sell-side e buy-side em fusões, aquisições e joint ventures"
      ],
      impact: "Redução de até 80% nos custos de inventário e blindagem jurídica do patrimônio dos fundadores."
    }
  ];

  return (
    <section id="modulo-consultoria-gestao" style={{ padding: '4.5rem 0', background: 'rgba(10, 15, 27, 0.95)' }}>
      <div className="container-xl">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3rem' }}>
          <span className="badge-blue" style={{ marginBottom: '0.8rem' }}>
            <ShieldCheck size={14} />
            MÓDULO DE CONSULTORIA CORPORATIVA
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', marginBottom: '1rem' }}>
            Consultoria em Gestão Empresarial, Contabilidade &amp; Societário
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6 }}>
            Com respaldo dos CNAEs 7020-4/00 e 6920-6/01, nossos consultores e contadores seniores reorganizam a espinha dorsal do seu negócio para garantir longevidade, conformidade e governança.
          </p>
        </div>

        {/* 4 Tracks Navigation Cards */}
        <div className="grid-cols-4" style={{ gap: '1rem', marginBottom: '2rem' }}>
          {consultingTracks.map((trk, idx) => {
            const Icon = trk.icon;
            const isSelected = activeConsultingTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveConsultingTab(idx)}
                style={{
                  textAlign: 'left',
                  background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(16, 25, 42, 0.6)',
                  border: isSelected ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.08)',
                  padding: '1.4rem',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  boxShadow: isSelected ? '0 0 20px rgba(59, 130, 246, 0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: isSelected ? '#3B82F6' : 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? '#FFFFFF' : '#60A5FA'
                  }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: isSelected ? '#60A5FA' : '#64748B' }}>
                    {trk.badge}
                  </span>
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.3rem' }}>
                  {trk.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  CNAE: {trk.cnae}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Track Detailed View */}
        {consultingTracks[activeConsultingTab] && (
          <div className="glass-panel" style={{ padding: '2.5rem', borderLeft: '4px solid #3B82F6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge-blue">{consultingTracks[activeConsultingTab].badge}</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '0.5rem', color: '#FFFFFF' }}>
                  {consultingTracks[activeConsultingTab].title}
                </h3>
                <p style={{ color: '#CBD5E1', fontSize: '1rem', marginTop: '0.3rem', maxWidth: '800px' }}>
                  {consultingTracks[activeConsultingTab].overview}
                </p>
              </div>

              <button className="btn-gold" onClick={onOpenOnboarding}>
                Contratar Esta Consultoria
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Pillars */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                Pilares e Metodologia de Execução:
              </h4>
              <div className="grid-cols-2" style={{ gap: '0.9rem' }}>
                {consultingTracks[activeConsultingTab].pillars.map((pil, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem' }}>
                    <div style={{ marginTop: '2px', color: '#60A5FA', flexShrink: 0 }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span>{pil}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Impact Indicator */}
            <div style={{
              background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              padding: '1.2rem 1.6rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ fontWeight: 800, color: '#93C5FD', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                Métrica de Transformação:
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
                {consultingTracks[activeConsultingTab].impact}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
