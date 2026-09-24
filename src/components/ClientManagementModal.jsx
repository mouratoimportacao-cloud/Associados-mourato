import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  UserCheck, 
  Building2, 
  Landmark, 
  ShieldCheck, 
  FileText, 
  Plus, 
  Search, 
  Trash2, 
  Eye, 
  EyeOff,
  CheckCircle2, 
  AlertTriangle,
  KeyRound,
  ArrowRight,
  LogOut,
  ChevronRight,
  Receipt,
  DollarSign,
  Calendar,
  Wallet,
  Check,
  CreditCard
} from 'lucide-react';

const STORAGE_CLIENTS_KEY = 'mourato_clients_records_v2';
const STORAGE_EXPENSES_KEY = 'mourato_corporate_expenses_v1';

export const ClientManagementModal = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authForm, setAuthForm] = useState({ user: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Navigation views: 'clients_list', 'clients_new', 'client_detail', 'expenses'
  const [activeView, setActiveView] = useState('clients_list');
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Password visibility maps
  const [showFormPasswords, setShowFormPasswords] = useState({});
  const [showDetailPasswords, setShowDetailPasswords] = useState({});

  // 1. Clients Database State (100% clean, empty by default)
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CLIENTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // 2. Corporate Expenses State
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EXPENSES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Expense Filter
  const [expenseFilter, setExpenseFilter] = useState('todos'); // 'todos', 'pendente', 'pago'

  // New Expense Form State
  const [newExpense, setNewExpense] = useState({
    categoria: 'Energia Elétrica',
    descricao: '',
    valor: '',
    vencimento: '',
    status: 'Pendente',
    codigoBarras: '',
    observacoes: ''
  });

  // New Client Form State (Supports Multiple Bank Accounts + Passwords)
  const [newClient, setNewClient] = useState({
    nomeRazao: '',
    documento: '',
    responsavel: '',
    contato: '',
    contasBancarias: [
      {
        id: 1,
        banco: 'Itaú',
        bancoOutro: '',
        agencia: '',
        conta: '',
        senhaAcesso: '',
        statusConta: 'Em Abertura / Análise'
      }
    ],
    serasaScore: 'Regular (Sem Restrições)',
    serasaStatus: 'Sem Apontamentos',
    govNivel: 'Prata',
    govProtocolo: '',
    quodStatus: 'Em Análise',
    boaVistaStatus: 'Sem Restrições',
    limiteAprovado: '',
    observacoesSigilosas: ''
  });

  // Save clients to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CLIENTS_KEY, JSON.stringify(clients));
    } catch (e) {
      console.error(e);
    }
  }, [clients]);

  // Save expenses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_EXPENSES_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.error(e);
    }
  }, [expenses]);

  if (!isOpen) return null;

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (authForm.user.trim().toLowerCase() === 'admin' && authForm.password === 'mourato2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else if (authForm.user.length > 0 && authForm.password.length > 0) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Preencha o usuário e a chave de acesso.');
    }
  };

  // Add another bank account to new client form
  const handleAddBankAccount = () => {
    setNewClient({
      ...newClient,
      contasBancarias: [
        ...newClient.contasBancarias,
        {
          id: Date.now(),
          banco: 'Itaú',
          bancoOutro: '',
          agencia: '',
          conta: '',
          senhaAcesso: '',
          statusConta: 'Em Abertura / Análise'
        }
      ]
    });
  };

  // Remove a bank account from new client form
  const handleRemoveBankAccount = (indexToRemove) => {
    if (newClient.contasBancarias.length === 1) {
      alert('O cliente deve possuir pelo menos 1 estrutura bancária.');
      return;
    }
    setNewClient({
      ...newClient,
      contasBancarias: newClient.contasBancarias.filter((_, idx) => idx !== indexToRemove)
    });
  };

  // Update specific bank account field
  const handleBankFieldChange = (index, field, value) => {
    const updated = [...newClient.contasBancarias];
    updated[index][field] = value;
    setNewClient({ ...newClient, contasBancarias: updated });
  };

  // Save Client Handler
  const handleSaveClient = (e) => {
    e.preventDefault();
    const created = {
      ...newClient,
      id: `cli-${Date.now()}`,
      dataCadastro: new Date().toISOString().split('T')[0]
    };
    setClients([created, ...clients]);
    setActiveView('clients_list');
    // Reset form
    setNewClient({
      nomeRazao: '',
      documento: '',
      responsavel: '',
      contato: '',
      contasBancarias: [
        {
          id: 1,
          banco: 'Itaú',
          bancoOutro: '',
          agencia: '',
          conta: '',
          senhaAcesso: '',
          statusConta: 'Em Abertura / Análise'
        }
      ],
      serasaScore: 'Regular (Sem Restrições)',
      serasaStatus: 'Sem Apontamentos',
      govNivel: 'Prata',
      govProtocolo: '',
      quodStatus: 'Em Análise',
      boaVistaStatus: 'Sem Restrições',
      limiteAprovado: '',
      observacoesSigilosas: ''
    });
    setShowFormPasswords({});
  };

  // Delete Client Handler
  const handleDeleteClient = (id) => {
    if (window.confirm('Confirma a remoção definitiva deste dossiê?')) {
      setClients(clients.filter(c => c.id !== id));
      if (selectedClient && selectedClient.id === id) {
        setSelectedClient(null);
        setActiveView('clients_list');
      }
    }
  };

  // Save Expense Handler
  const handleSaveExpense = (e) => {
    e.preventDefault();
    if (!newExpense.descricao || !newExpense.valor) {
      alert('Preencha a descrição e o valor da despesa.');
      return;
    }
    const created = {
      ...newExpense,
      id: `exp-${Date.now()}`,
      valor: Number(newExpense.valor),
      dataRegistro: new Date().toISOString().split('T')[0]
    };
    setExpenses([created, ...expenses]);
    setNewExpense({
      categoria: 'Energia Elétrica',
      descricao: '',
      valor: '',
      vencimento: '',
      status: 'Pendente',
      codigoBarras: '',
      observacoes: ''
    });
  };

  // Toggle Expense Status
  const handleToggleExpenseStatus = (id) => {
    setExpenses(expenses.map(exp => {
      if (exp.id === id) {
        return {
          ...exp,
          status: exp.status === 'Pago' ? 'Pendente' : 'Pago'
        };
      }
      return exp;
    }));
  };

  // Delete Expense Handler
  const handleDeleteExpense = (id) => {
    if (window.confirm('Excluir esta despesa do controle?')) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  // Calculations for Expenses
  const totalExpenses = expenses.reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0);
  const paidExpenses = expenses.filter(e => e.status === 'Pago').reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0);
  const pendingExpenses = expenses.filter(e => e.status === 'Pendente').reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const filteredClients = clients.filter(c => 
    c.nomeRazao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.documento.includes(searchTerm)
  );

  const filteredExpenses = expenses.filter(e => {
    if (expenseFilter === 'pendente') return e.status === 'Pendente';
    if (expenseFilter === 'pago') return e.status === 'Pago';
    return true;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1040px', width: '96%', padding: '2rem' }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(197, 168, 105, 0.1)',
              border: '1px solid var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-light)'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-light)', fontWeight: 700 }}>
                MESA DE OPERAÇÕES • ACESSO RESTRITO
              </div>
              <h2 style={{ fontSize: '1.35rem', color: '#FFFFFF', margin: 0 }}>
                Gestão de Clientes, Contas &amp; Despesas Corporativas
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="btn-secondary-subtle"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', gap: '0.35rem' }}
                title="Encerrar Sessão"
              >
                <LogOut size={13} /> Sair
              </button>
            )}
            <button 
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '0.2rem' }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* 1. AUTH SCREEN */}
        {!isAuthenticated ? (
          <div style={{ maxWidth: '420px', margin: '2rem auto', textAlign: 'center' }}>
            <div style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'rgba(197, 168, 105, 0.08)',
              border: '1px solid var(--gold-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-light)',
              margin: '0 auto 1.5rem'
            }}>
              <Lock size={26} />
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Autenticação da Mesa de Operações
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '2rem' }}>
              Acesse a carteira de clientes, contas bancárias e controle de despesas.
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.3rem' }}>
                  Identificador / Usuário:
                </label>
                <input 
                  type="text"
                  required
                  placeholder="admin"
                  value={authForm.user}
                  onChange={(e) => setAuthForm({ ...authForm, user: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.3rem' }}>
                  Chave de Acesso / Senha:
                </label>
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              {authError && (
                <div style={{ fontSize: '0.8rem', color: '#F87171' }}>{authError}</div>
              )}

              <button 
                type="submit" 
                className="btn-primary-gold" 
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
              >
                Autenticar &amp; Acessar Painel
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        ) : (
          /* 2. AUTHENTICATED DASHBOARD */
          <div>
            
            {/* Top Navigation Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.8rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                
                {/* Tab 1: Clientes */}
                <button
                  onClick={() => { setActiveView('clients_list'); setSelectedClient(null); }}
                  style={{
                    padding: '0.55rem 1.1rem',
                    borderRadius: 'var(--radius-xs)',
                    border: activeView === 'clients_list' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                    background: activeView === 'clients_list' ? 'var(--gold-muted)' : 'transparent',
                    color: activeView === 'clients_list' ? 'var(--gold-light)' : 'var(--text-body)',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer'
                  }}
                >
                  <Building2 size={14} /> Carteira de Clientes ({clients.length})
                </button>

                {/* Tab 2: Novo Cadastro */}
                <button
                  onClick={() => setActiveView('clients_new')}
                  style={{
                    padding: '0.55rem 1.1rem',
                    borderRadius: 'var(--radius-xs)',
                    border: activeView === 'clients_new' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                    background: activeView === 'clients_new' ? 'var(--gold-muted)' : 'transparent',
                    color: activeView === 'clients_new' ? 'var(--gold-light)' : 'var(--text-body)',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} /> Novo Cadastro de Dossiê
                </button>

                {/* Tab 3: Gestão de Despesas */}
                <button
                  onClick={() => setActiveView('expenses')}
                  style={{
                    padding: '0.55rem 1.1rem',
                    borderRadius: 'var(--radius-xs)',
                    border: activeView === 'expenses' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                    background: activeView === 'expenses' ? 'var(--gold-muted)' : 'transparent',
                    color: activeView === 'expenses' ? 'var(--gold-light)' : 'var(--text-body)',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer'
                  }}
                >
                  <Receipt size={14} /> Despesas da Empresa ({expenses.length})
                </button>

              </div>

              {activeView === 'clients_list' && (
                <div style={{ position: 'relative', width: '280px' }}>
                  <Search size={15} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrar por nome ou documento..."
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.5rem 0.8rem 0.5rem 2.3rem',
                      borderRadius: 'var(--radius-xs)',
                      color: '#FFFFFF',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>
              )}
            </div>

            {/* VIEW 1: CLIENTS LIST */}
            {activeView === 'clients_list' && (
              <div>
                {filteredClients.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-xs)' }}>
                    <div style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Nenhum cliente cadastrado no momento.
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#8E9BAE', marginBottom: '1.2rem' }}>
                      A base está 100% limpa. Clique no botão abaixo para cadastrar seu primeiro cliente real com múltiplas contas bancárias, senhas e bureaus.
                    </p>
                    <button
                      onClick={() => setActiveView('clients_new')}
                      className="btn-primary-gold"
                      style={{ padding: '0.65rem 1.4rem', fontSize: '0.8rem' }}
                    >
                      Cadastrar Primeiro Cliente
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '55vh', overflowY: 'auto' }}>
                    {filteredClients.map((client) => {
                      const totalContas = client.contasBancarias ? client.contasBancarias.length : 1;
                      return (
                        <div 
                          key={client.id}
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-xs)',
                            padding: '1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '1rem'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                              width: 42,
                              height: 42,
                              borderRadius: 'var(--radius-xs)',
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-subtle)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--gold-light)'
                            }}>
                              <Building2 size={20} />
                            </div>

                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <h4 style={{ fontSize: '1rem', color: '#FFFFFF', margin: 0 }}>
                                  {client.nomeRazao}
                                </h4>
                                <span style={{
                                  fontSize: '0.68rem',
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: 'var(--radius-xs)',
                                  background: 'rgba(197, 168, 105, 0.1)',
                                  border: '1px solid var(--gold-border)',
                                  color: 'var(--gold-light)',
                                  fontWeight: 700
                                }}>
                                  {totalContas} {totalContas === 1 ? 'Conta Vinculada' : 'Contas Vinculadas'}
                                </span>
                              </div>

                              <div style={{ fontSize: '0.78rem', color: '#8E9BAE', marginTop: '0.25rem', display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                                <span>Doc: <strong style={{ color: '#CBD5E1' }}>{client.documento}</strong></span>
                                <span>Responsável: <strong style={{ color: '#CBD5E1' }}>{client.responsavel}</strong></span>
                                <span>Gov.br: <strong style={{ color: 'var(--gold-light)' }}>{client.govNivel}</strong></span>
                                <span>Serasa: <strong style={{ color: '#6EE7B7' }}>{client.serasaStatus}</strong></span>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <button
                              onClick={() => { setSelectedClient(client); setActiveView('client_detail'); }}
                              className="btn-secondary-subtle"
                              style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', gap: '0.3rem' }}
                            >
                              <Eye size={13} /> Ver Dossiê &amp; Contas
                            </button>

                            <button
                              onClick={() => handleDeleteClient(client.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#64748B',
                                cursor: 'pointer',
                                padding: '0.45rem'
                              }}
                              title="Remover Registro"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: NEW CLIENT REGISTRATION (WITH MULTIPLE BANKS & PASSWORD EYE BUTTON) */}
            {activeView === 'clients_new' && (
              <form onSubmit={handleSaveClient} style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
                
                {/* 1. Dados da Empresa */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', marginBottom: '0.8rem' }}>
                    1. Identificação da Empresa / Cliente
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Razão Social / Nome:</label>
                      <input 
                        required
                        type="text"
                        value={newClient.nomeRazao}
                        onChange={(e) => setNewClient({ ...newClient, nomeRazao: e.target.value })}
                        placeholder="Nome da companhia"
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>CNPJ ou CPF:</label>
                      <input 
                        required
                        type="text"
                        value={newClient.documento}
                        onChange={(e) => setNewClient({ ...newClient, documento: e.target.value })}
                        placeholder="00.000.000/0001-00"
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Sócio / Responsável:</label>
                      <input 
                        required
                        type="text"
                        value={newClient.responsavel}
                        onChange={(e) => setNewClient({ ...newClient, responsavel: e.target.value })}
                        placeholder="Nome do sócio responsável"
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Contato / Telefone:</label>
                      <input 
                        required
                        type="text"
                        value={newClient.contato}
                        onChange={(e) => setNewClient({ ...newClient, contato: e.target.value })}
                        placeholder="(11) 90000-0000"
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Contas Bancárias (Com botão de olho na senha e opção de acrescentar banco) */}
                <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)' }}>
                      2. Estrutura Bancária (Contas &amp; Senhas de Acesso)
                    </div>
                    
                    {/* Botão de Acrescentar Banco */}
                    <button
                      type="button"
                      onClick={handleAddBankAccount}
                      className="btn-secondary-subtle"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', gap: '0.35rem', color: 'var(--gold-light)', borderColor: 'var(--gold-border)' }}
                    >
                      <Plus size={13} /> + Acrescentar Outro Banco
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {newClient.contasBancarias.map((bankAccount, index) => {
                      const isPasswordVisible = !!showFormPasswords[index];
                      return (
                        <div 
                          key={bankAccount.id || index}
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-xs)',
                            padding: '1rem'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <Landmark size={15} color="var(--gold-primary)" />
                              Banco #{index + 1}
                            </div>

                            {newClient.contasBancarias.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveBankAccount(index)}
                                style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                              >
                                <Trash2 size={13} /> Remover este banco
                              </button>
                            )}
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.7rem' }}>
                            {/* Banco */}
                            <div>
                              <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Instituição:</label>
                              <select
                                value={bankAccount.banco}
                                onChange={(e) => handleBankFieldChange(index, 'banco', e.target.value)}
                                style={{ width: '100%', background: '#121824', border: '1px solid var(--border-subtle)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.82rem' }}
                              >
                                <option value="Itaú">Itaú / Itaú BBA</option>
                                <option value="Bradesco">Bradesco</option>
                                <option value="Santander">Santander</option>
                                <option value="BTG Pactual">BTG Pactual</option>
                                <option value="Banco Safra">Banco Safra</option>
                                <option value="Banco do Brasil">Banco do Brasil</option>
                                <option value="Caixa Econômica">Caixa Econômica</option>
                                <option value="Sicoob">Sicoob</option>
                                <option value="Sicredi">Sicredi</option>
                                <option value="Nubank">Nubank PJ</option>
                                <option value="Inter">Banco Inter</option>
                                <option value="Outro">Outro (Digitar Nome)</option>
                              </select>
                              {bankAccount.banco === 'Outro' && (
                                <input 
                                  type="text"
                                  placeholder="Nome do banco"
                                  value={bankAccount.bancoOutro || ''}
                                  onChange={(e) => handleBankFieldChange(index, 'bancoOutro', e.target.value)}
                                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.45rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.78rem', marginTop: '0.4rem' }}
                                />
                              )}
                            </div>

                            {/* Agência */}
                            <div>
                              <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Agência:</label>
                              <input 
                                type="text"
                                value={bankAccount.agencia}
                                onChange={(e) => handleBankFieldChange(index, 'agencia', e.target.value)}
                                placeholder="0001"
                                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.82rem' }}
                              />
                            </div>

                            {/* Conta */}
                            <div>
                              <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Conta:</label>
                              <input 
                                type="text"
                                value={bankAccount.conta}
                                onChange={(e) => handleBankFieldChange(index, 'conta', e.target.value)}
                                placeholder="12345-6"
                                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.82rem' }}
                              />
                            </div>

                            {/* Campo Senha com botão de olho para mostrar/ocultar */}
                            <div>
                              <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>
                                Senha / Chave:
                              </label>
                              <div style={{ position: 'relative' }}>
                                <input 
                                  type={isPasswordVisible ? 'text' : 'password'}
                                  value={bankAccount.senhaAcesso}
                                  onChange={(e) => handleBankFieldChange(index, 'senhaAcesso', e.target.value)}
                                  placeholder="Senha de acesso"
                                  style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--border-subtle)',
                                    padding: '0.55rem 2.2rem 0.55rem 0.55rem',
                                    borderRadius: 'var(--radius-xs)',
                                    color: '#FFFFFF',
                                    fontSize: '0.82rem'
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowFormPasswords({ ...showFormPasswords, [index]: !isPasswordVisible })}
                                  style={{
                                    position: 'absolute',
                                    right: '0.45rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: isPasswordVisible ? 'var(--gold-light)' : '#64748B',
                                    cursor: 'pointer',
                                    padding: '0.2rem'
                                  }}
                                  title={isPasswordVisible ? 'Ocultar Senha' : 'Ver Senha Salva'}
                                >
                                  {isPasswordVisible ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                              </div>
                            </div>

                            {/* Status da Conta */}
                            <div>
                              <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Status da Conta:</label>
                              <select
                                value={bankAccount.statusConta}
                                onChange={(e) => handleBankFieldChange(index, 'statusConta', e.target.value)}
                                style={{ width: '100%', background: '#121824', border: '1px solid var(--border-subtle)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.82rem' }}
                              >
                                <option value="Em Abertura / Análise">Em Abertura / Análise</option>
                                <option value="Ativa / Homologada">Ativa / Homologada</option>
                                <option value="Aprovada p/ Liquidação">Aprovada p/ Liquidação</option>
                                <option value="Pendente de Documento">Pendente de Documento</option>
                              </select>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Bureaus & Plataformas Governamentais */}
                <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', marginBottom: '0.8rem' }}>
                    3. Bureaus de Crédito &amp; Plataformas Governamentais
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Status Serasa Experian:</label>
                      <select
                        value={newClient.serasaStatus}
                        onChange={(e) => setNewClient({ ...newClient, serasaStatus: e.target.value })}
                        style={{ width: '100%', background: '#121824', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      >
                        <option value="Sem Apontamentos">Sem Apontamentos / Limpo</option>
                        <option value="Score Alto (+800)">Score Alto (+800)</option>
                        <option value="Score Médio (500-800)">Score Médio (500-800)</option>
                        <option value="Com Apontamento">Com Apontamento</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Nível Gov.br:</label>
                      <select
                        value={newClient.govNivel}
                        onChange={(e) => setNewClient({ ...newClient, govNivel: e.target.value })}
                        style={{ width: '100%', background: '#121824', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      >
                        <option value="Ouro (Certificado Digital)">Ouro (Certificado Digital)</option>
                        <option value="Prata (Validação Bancária)">Prata (Validação Bancária)</option>
                        <option value="Bronze">Bronze (Básico)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Status Quod:</label>
                      <select
                        value={newClient.quodStatus}
                        onChange={(e) => setNewClient({ ...newClient, quodStatus: e.target.value })}
                        style={{ width: '100%', background: '#121824', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      >
                        <option value="Cadastrado Positivo Ativo">Cadastro Positivo Ativo</option>
                        <option value="Em Análise">Em Análise Cadastral</option>
                        <option value="Inativo / Sem Histórico">Sem Histórico</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Status Boa Vista (SCPC):</label>
                      <select
                        value={newClient.boaVistaStatus}
                        onChange={(e) => setNewClient({ ...newClient, boaVistaStatus: e.target.value })}
                        style={{ width: '100%', background: '#121824', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      >
                        <option value="Sem Restrições">Sem Restrições</option>
                        <option value="Rating A / Baixo Risco">Rating A (Baixo Risco)</option>
                        <option value="Rating B / Médio">Rating B (Médio)</option>
                        <option value="Restrição Negociada">Restrição Negociada</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Notas */}
                <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>
                    Notas Sigilosas da Operação:
                  </label>
                  <textarea 
                    rows="3"
                    value={newClient.observacoesSigilosas}
                    onChange={(e) => setNewClient({ ...newClient, observacoesSigilosas: e.target.value })}
                    placeholder="Anotações internas sobre limites, spread acordado e histórico de negociações..."
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem', resize: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setActiveView('clients_list')}
                    className="btn-secondary-subtle"
                    style={{ padding: '0.7rem 1.4rem' }}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="btn-primary-gold"
                    style={{ padding: '0.7rem 1.6rem' }}
                  >
                    Salvar Dossiê Completo
                    <CheckCircle2 size={15} />
                  </button>
                </div>

              </form>
            )}

            {/* VIEW 3: CLIENT DETAIL (SHOWING ALL BANKS AND PASSWORDS WITH EYE BUTTON) */}
            {activeView === 'client_detail' && selectedClient && (
              <div style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div>
                    <span className="badge-institutional">DOSSIÊ CORPORATIVO SEGURO</span>
                    <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginTop: '0.3rem' }}>
                      {selectedClient.nomeRazao}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                      Documento: <strong style={{ color: '#CBD5E1' }}>{selectedClient.documento}</strong> • Responsável: <strong style={{ color: '#CBD5E1' }}>{selectedClient.responsavel}</strong> • Contato: <strong style={{ color: '#CBD5E1' }}>{selectedClient.contato}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveView('clients_list')}
                    className="btn-secondary-subtle"
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem' }}
                  >
                    Voltar à Lista
                  </button>
                </div>

                {/* Contas Bancárias Cadastradas */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', marginBottom: '0.8rem' }}>
                    Contas Bancárias Vinculadas
                  </div>

                  {(!selectedClient.contasBancarias || selectedClient.contasBancarias.length === 0) ? (
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', color: '#8E9BAE' }}>
                      Nenhuma conta bancária registrada para este cliente.
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                      {selectedClient.contasBancarias.map((acc, idx) => {
                        const isVisible = !!showDetailPasswords[idx];
                        const bancoNome = acc.banco === 'Outro' ? (acc.bancoOutro || 'Banco Personalizado') : acc.banco;
                        return (
                          <div 
                            key={idx}
                            style={{
                              background: 'rgba(255,255,255,0.02)',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: 'var(--radius-xs)',
                              padding: '1.25rem'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Landmark size={18} color="var(--gold-primary)" />
                                {bancoNome}
                              </div>
                              <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-xs)', background: 'rgba(16, 185, 129, 0.1)', color: '#6EE7B7' }}>
                                {acc.statusConta}
                              </span>
                            </div>

                            <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '0.6rem' }}>
                              Agência: <strong style={{ color: '#FFFFFF' }}>{acc.agencia || '—'}</strong> • Conta: <strong style={{ color: '#FFFFFF' }}>{acc.conta || '—'}</strong>
                            </div>

                            {/* Senha com botão de olho para visualizar */}
                            <div style={{
                              background: 'rgba(0,0,0,0.3)',
                              padding: '0.5rem 0.8rem',
                              borderRadius: 'var(--radius-xs)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '0.82rem'
                            }}>
                              <span style={{ color: '#8E9BAE' }}>Senha / Chave Salva:</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <strong style={{ color: isVisible ? 'var(--gold-light)' : '#94A3B8', fontFamily: isVisible ? 'monospace' : 'inherit' }}>
                                  {acc.senhaAcesso ? (isVisible ? acc.senhaAcesso : '••••••••') : 'Não cadastrada'}
                                </strong>
                                {acc.senhaAcesso && (
                                  <button
                                    type="button"
                                    onClick={() => setShowDetailPasswords({ ...showDetailPasswords, [idx]: !isVisible })}
                                    style={{ background: 'none', border: 'none', color: isVisible ? 'var(--gold-light)' : '#64748B', cursor: 'pointer', padding: 0 }}
                                    title={isVisible ? 'Ocultar' : 'Mostrar Senha'}
                                  >
                                    {isVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                                  </button>
                                )}
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Bureaus */}
                <div className="grid-3" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Plataforma Gov.br</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold-light)', marginTop: '0.3rem' }}>
                      {selectedClient.govNivel}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Bureaus de Crédito</div>
                    <div style={{ fontSize: '0.86rem', color: '#FFFFFF', marginTop: '0.3rem' }}>
                      <strong>Serasa:</strong> {selectedClient.serasaStatus}
                    </div>
                    <div style={{ fontSize: '0.86rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
                      <strong>Quod:</strong> {selectedClient.quodStatus}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Boa Vista (SCPC)</div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF', marginTop: '0.3rem' }}>
                      {selectedClient.boaVistaStatus}
                    </div>
                  </div>
                </div>

                {/* Observações */}
                {selectedClient.observacoesSigilosas && (
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '0.4rem' }}>
                      Notas Sigilosas:
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                      {selectedClient.observacoesSigilosas}
                    </p>
                  </div>
                )}

              </div>
            )}

            {/* VIEW 4: GESTÃO DE DESPESAS DA EMPRESA (CONTAS DE CONSUMO ETC.) */}
            {activeView === 'expenses' && (
              <div style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
                
                {/* 3 Metric Cards for Expenses */}
                <div className="grid-3" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', padding: '1.2rem' }}>
                    <div style={{ fontSize: '0.72rem', color: '#8E9BAE', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total de Despesas</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.2rem' }}>
                      {formatCurrency(totalExpenses)}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: 'var(--radius-xs)', padding: '1.2rem' }}>
                    <div style={{ fontSize: '0.72rem', color: '#F87171', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pendente / A Pagar</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F87171', marginTop: '0.2rem' }}>
                      {formatCurrency(pendingExpenses)}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: 'var(--radius-xs)', padding: '1.2rem' }}>
                    <div style={{ fontSize: '0.72rem', color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pago / Liquidado</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34D399', marginTop: '0.2rem' }}>
                      {formatCurrency(paidExpenses)}
                    </div>
                  </div>
                </div>

                {/* Form: Nova Despesa */}
                <form onSubmit={handleSaveExpense} style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', marginBottom: '0.8rem' }}>
                    + Incluir Nova Despesa / Conta de Consumo
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Categoria:</label>
                      <select
                        value={newExpense.categoria}
                        onChange={(e) => setNewExpense({ ...newExpense, categoria: e.target.value })}
                        style={{ width: '100%', background: '#121824', border: '1px solid var(--border-subtle)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.82rem' }}
                      >
                        <option value="Energia Elétrica">Energia Elétrica (Luz)</option>
                        <option value="Água e Saneamento">Água / Saneamento</option>
                        <option value="Internet e Telefonia">Internet &amp; Telecom</option>
                        <option value="Aluguel e Condomínio">Aluguel / Condomínio</option>
                        <option value="Contabilidade e Honorários">Contabilidade / Honorários</option>
                        <option value="Sistemas e Software">Sistemas &amp; TI (SaaS)</option>
                        <option value="Impostos e Guias">Tributos / Impostos</option>
                        <option value="Salários e Pró-labore">Folha / Pró-labore</option>
                        <option value="Outras Despesas">Outras Despesas</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Descrição:</label>
                      <input 
                        required
                        type="text"
                        placeholder="Ex: Conta de Luz Enel - Sede"
                        value={newExpense.descricao}
                        onChange={(e) => setNewExpense({ ...newExpense, descricao: e.target.value })}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.82rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Valor (R$):</label>
                      <input 
                        required
                        type="number"
                        step="0.01"
                        placeholder="Ex: 850.00"
                        value={newExpense.valor}
                        onChange={(e) => setNewExpense({ ...newExpense, valor: e.target.value })}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.82rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Vencimento:</label>
                      <input 
                        type="date"
                        value={newExpense.vencimento}
                        onChange={(e) => setNewExpense({ ...newExpense, vencimento: e.target.value })}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.82rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '0.75rem', alignItems: 'end' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Código de Barras / Linha Digitável (Opcional):</label>
                      <input 
                        type="text"
                        placeholder="Ex: 84670000001-2 49150109011-8..."
                        value={newExpense.codigoBarras}
                        onChange={(e) => setNewExpense({ ...newExpense, codigoBarras: e.target.value })}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.55rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.82rem' }}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-primary-gold" 
                      style={{ padding: '0.6rem', fontSize: '0.8rem', height: '36px' }}
                    >
                      + Salvar Despesa
                    </button>
                  </div>
                </form>

                {/* Filtro e Lista de Despesas */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Contas Registradas ({filteredExpenses.length})
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {['todos', 'pendente', 'pago'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setExpenseFilter(f)}
                        style={{
                          background: expenseFilter === f ? 'var(--gold-muted)' : 'transparent',
                          border: expenseFilter === f ? '1px solid var(--gold-border)' : '1px solid var(--border-subtle)',
                          color: expenseFilter === f ? 'var(--gold-light)' : '#8E9BAE',
                          padding: '0.3rem 0.7rem',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.72rem',
                          textTransform: 'uppercase',
                          cursor: 'pointer'
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredExpenses.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-xs)', color: '#8E9BAE', fontSize: '0.85rem' }}>
                    Nenhuma conta de consumo ou despesa registrada nesta categoria.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {filteredExpenses.map((exp) => (
                      <div 
                        key={exp.id}
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-xs)',
                          padding: '0.9rem 1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '0.8rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <button
                            onClick={() => handleToggleExpenseStatus(exp.id)}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              border: exp.status === 'Pago' ? '1px solid #34D399' : '1px solid #F87171',
                              background: exp.status === 'Pago' ? 'rgba(52, 211, 153, 0.2)' : 'transparent',
                              color: '#34D399',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                            title={exp.status === 'Pago' ? 'Marcar como Pendente' : 'Marcar como Pago'}
                          >
                            {exp.status === 'Pago' && <Check size={14} />}
                          </button>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF' }}>{exp.descricao}</span>
                              <span style={{ fontSize: '0.68rem', color: 'var(--gold-light)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-xs)', background: 'rgba(197, 168, 105, 0.1)' }}>
                                {exp.categoria}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#8E9BAE', marginTop: '0.15rem' }}>
                              Vencimento: {exp.vencimento ? exp.vencimento : 'A combinar'} • Registrado em: {exp.dataRegistro}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: exp.status === 'Pago' ? '#34D399' : '#F87171' }}>
                              {formatCurrency(exp.valor)}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: exp.status === 'Pago' ? '#34D399' : '#F87171', textTransform: 'uppercase' }}>
                              {exp.status}
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteExpense(exp.id)}
                            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '0.2rem' }}
                            title="Remover Despesa"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
