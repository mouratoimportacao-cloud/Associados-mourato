import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

export const GovernanceCompliance = () => {
  const principles = [
    {
      title: "Sigilo & Acordo de Confidencialidade (NDA)",
      desc: "Todas as informações contábeis, bancárias e estratégicas compartilhadas por clientes são protegidas por rigoroso termo de confidencialidade antes do início de qualquer análise."
    },
    {
      title: "Independência & Ausência de Conflito",
      desc: "Nossa assessoria atua desvinculada de interesses de bancos de varejo específicos, preservando total fidelidade ao melhor interesse financeiro da companhia cliente."
    },
    {
      title: "Conformidade Regulatória & LGPD",
      desc: "Processos alinhados às melhores práticas da Lei Geral de Proteção de Dados (LGPD) e às diretrizes regulatórias aplicáveis do mercado financeiro e corporativo nacional."
    },
    {
      title: "Rigor Técnico & Diligência",
      desc: "As modelagens financeiras e os pareceres de reestruturação são elaborados por especialistas com histórico em mercado de capitais e governança corporativa."
    }
  ];

  return (
    <section id="governanca" style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container-xl">
        
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
          <span className="badge-institutional" style={{ marginBottom: '0.8rem' }}>
            INTEGRIDADE INSTITUCIONAL
          </span>
          <h2 style={{ marginBottom: '1rem' }}>
            Governança, Compliance &amp; Padrões de Confidencialidade
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.65 }}>
            A confiança é o pilar fundamental da Mourato &amp; Associados. Conduzimos cada mandato com discrição absoluta, governança de dados e compromisso inegociável com a segurança do cliente.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid-2" style={{ gap: '1.75rem', marginBottom: '3rem' }}>
          {principles.map((pr, idx) => (
            <div key={idx} className="advisory-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                <ShieldCheck size={18} color="var(--gold-primary)" />
                <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF' }}>{pr.title}</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
                {pr.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Legal Identity Strip */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xs)',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.86rem',
          color: '#94A3B8'
        }}>
          <div>
            <strong style={{ color: '#FFFFFF' }}>Identificação Corporativa:</strong> {COMPANY_DATA.razaoSocial}
          </div>
          <div>
            <strong style={{ color: '#FFFFFF' }}>CNPJ:</strong> {COMPANY_DATA.cnpj}
          </div>
          <div>
            <strong style={{ color: '#FFFFFF' }}>Sede:</strong> {COMPANY_DATA.localizacao}
          </div>
        </div>

      </div>
    </section>
  );
};
