// Estrutura das Práticas Executivas - Mourato & Associados
export const ADVISORY_PRACTICES = {
  spread: {
    id: "mercado-capitais-spread",
    title: "Mercado de Capitais & Engenharia de Spread",
    category: "Estruturação & Liquidez",
    lead: "Redução do custo marginal de capital e desintermediação bancária para empresas de médio e grande porte.",
    overview: "Atuamos diretamente na substituição do crédito bancário tradicional de varejo por instrumentos estruturados e linhas de atacado. Reduzimos o spread (CDI + spread) e destravamos operações com cronogramas e garantias adequadas à capacidade do caixa.",
    capabilities: [
      {
        title: "Otimização de Spread Bancário",
        description: "Repactuação e reestruturação de linhas de capital de giro e dívida corporativa com taxas negociadas em mesas institucionais."
      },
      {
        title: "Antecipação de Recebíveis & Acesso a FIDCs",
        description: "Cessão de direitos creditórios e deságio de atacado sem exigência de reciprocidades predatórias de bancos comerciais."
      },
      {
        title: "Captações Estruturadas (CRI, CRA, Debêntures)",
        description: "Emissão e colocação de títulos de dívida corporativa privada com prazos alongados e carência compatível com o ciclo de retorno."
      },
      {
        title: "Câmbio Comercial & Comércio Exterior",
        description: "Arbitragem de spread cambial para importadores e exportadores, além de mecanismos de proteção cambial (Hedge/NDF)."
      }
    ],
    indicators: [
      { label: "Redução Típica de Spread", value: "30% a 55%" },
      { label: "Instrumentos", value: "Atacado / FIDCs / DCM" },
      { label: "Padrão de Atendimento", value: "Corporate & Middle Market" }
    ]
  },

  consultoria: {
    id: "consultoria-estrategica",
    title: "Consultoria em Gestão, Contabilidade & Societário",
    category: "Governança & Estratégia",
    lead: "Assessoria consultiva de alta densidade para reorganização societária, eficiência fiscal e blindagem de margem.",
    overview: "Apoiamos acionistas e diretorias na condução de reorganizações societárias, implantação de contabilidade consultiva orientada a covenants e modelagem tributária preventiva, preparando a empresa para ciclos de crescimento sustentado ou transações corporativas.",
    capabilities: [
      {
        title: "Reestruturação Societária & Acordo de Sócios",
        description: "Desenho de estruturas societárias holding, regulação de governança patrimonial e blindagem das relações intersocietárias."
      },
      {
        title: "Contabilidade Consultiva & Inteligência de Balanço",
        description: "Elaboração e auditoria contábil com foco na adequação de índices para elevação de rating de crédito institucional."
      },
      {
        title: "Planejamento Tributário Estratégico",
        description: "Diagnóstico profundo de regimes e aproveitamento lícito de benefícios fiscais, gerando alívio sustentável no fluxo de caixa."
      },
      {
        title: "Valuation & Assessoria em M&A",
        description: "Avaliação econômico-financeira por Fluxo de Caixa Descontado (DCF) e assessoria técnica em fusões, aquisições e desinvestimentos."
      }
    ],
    indicators: [
      { label: "Foco de Atuação", value: "Governança & EBITDA" },
      { label: "Conformidade", value: "Rigor Técnico & Diligência" },
      { label: "Relação", value: "Advisory Continuado" }
    ]
  },

  synergy: {
    title: "A Abordagem Integrada: Do Spread à Consultoria",
    lead: "Por que uma firma integrada entrega valor superior a consultorias teóricas ou bancos isolados?",
    steps: [
      {
        phase: "01",
        name: "Saneamento & Governança Contábil",
        desc: "Nossos consultores organizam as demonstrações contábeis e ajustam os indicadores de endividamento da empresa."
      },
      {
        phase: "02",
        name: "Elevação do Rating Corporativo",
        desc: "Com números auditados e governança transparente, a percepção de risco de crédito junto ao mercado diminui."
      },
      {
        phase: "03",
        name: "Captura de Spreads Reduzidos",
        desc: "Nossa mesa de mercado de capitais aproveita a qualidade do crédito para negociar as menores taxas de spread disponíveis."
      },
      {
        phase: "04",
        name: "Preservação de Caixa & Perenidade",
        desc: "Os recursos poupados no spread retroalimentam o plano de expansão estruturado pela consultoria estratégica."
      }
    ]
  }
};
