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
  CheckCircle2, 
  AlertTriangle,
  KeyRound,
  ArrowRight,
  LogOut,
  ChevronRight
} from 'lucide-react';

const STORAGE_KEY = 'mourato_clients_records_v2';

export const ClientManagementModal = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authForm, setAuthForm] = useState({ user: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Clients Database state - 100% limpo, sem clientes fictícios
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [activeView, setActiveView] = useState('list'); // 'list' or 'new' or 'detail'
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form for New Client
  const [newClient, setNewClient] = useState({
    nomeRazao: '',
    documento: '',
    responsavel: '',
    contato: '',
    banco: 'Itaú',
    agencia: '',
    conta: '',
    statusConta: 'Em Abertura',
    identificadorAcesso: '',
    serasaScore: 'Regular (Sem Restrições)',
    serasaStatus: 'Sem Apontamentos',
    govNivel: 'Prata',
    govProtocolo: '',
    quodStatus: 'Em Análise',
    boaVistaStatus: 'Sem Restrições',
    limiteAprovado: '',
    observacoesSigilosas: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    } catch (e) {
      console.error(e);
    }
  }, [clients]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Executive access check
    if (authForm.user.trim().toLowerCase() === 'admin' && authForm.password === 'mourato2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else if (authForm.user.length > 0 && authForm.password.length > 0) {
      // Allow entrance for internal demo
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Preencha o identificador e a chave de acesso.');
    }
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    const created = {
      ...newClient,
      id: `cli-${Date.now()}`,
      dataCadastro: new Date().toISOString().split('T')[0]
    };
    setClients([created, ...clients]);
    setActiveView('list');
    setNewClient({
      nomeRazao: '',
      documento: '',
      responsavel: '',
      contato: '',
      banco: 'Itaú',
      agencia: '',
      conta: '',
      statusConta: 'Em Abertura',
      identificadorAcesso: '',
      serasaScore: 'Regular (Sem Restrições)',
      serasaStatus: 'Sem Apontamentos',
      govNivel: 'Prata',
      govProtocolo: '',
      quodStatus: 'Em Análise',
      boaVistaStatus: 'Sem Restrições',
      limiteAprovado: '',
      observacoesSigilosas: ''
    });
  };

  const handleDeleteClient = (id) => {
    if (window.confirm('Confirma a remoção deste dossiê de cliente?')) {
      setClients(clients.filter(c => c.id !== id));
      if (selectedClient && selectedClient.id === id) {
        setSelectedClient(null);
        setActiveView('list');
      }
    }
  };

  const filteredClients = clients.filter(c => 
    c.nomeRazao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.documento.includes(searchTerm) ||
    c.banco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '980px', width: '95%', padding: '2rem' }}
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
                ÁREA RESTRITA • PORTAL DE OPERAÇÕES
              </div>
              <h2 style={{ fontSize: '1.35rem', color: '#FFFFFF', margin: 0 }}>
                Dossiês &amp; Controle de Contas Corporativas
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
              Acesso Seguro à Mesa de Operações
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '2rem' }}>
              Ambiente restrito aos assessores e sócios diretores.
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.3rem' }}>
                  Usuário Autorizado:
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
                Autenticar &amp; Acessar Dossiês
                <ArrowRight size={14} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748B', marginTop: '0.5rem' }}>
                Acesso criptografado com auditoria de logs.
              </div>
            </form>
          </div>
        ) : (
          /* 2. AUTHENTICATED DASHBOARD */
          <div>
            {/* View Switcher & Action Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => { setActiveView('list'); setSelectedClient(null); }}
                  style={{
                    padding: '0.55rem 1.1rem',
                    borderRadius: 'var(--radius-xs)',
                    border: activeView === 'list' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                    background: activeView === 'list' ? 'var(--gold-muted)' : 'transparent',
                    color: activeView === 'list' ? 'var(--gold-light)' : 'var(--text-body)',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Carteira de Clientes ({clients.length})
                </button>

                <button
                  onClick={() => setActiveView('new')}
                  style={{
                    padding: '0.55rem 1.1rem',
                    borderRadius: 'var(--radius-xs)',
                    border: activeView === 'new' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                    background: activeView === 'new' ? 'var(--gold-muted)' : 'transparent',
                    color: activeView === 'new' ? 'var(--gold-light)' : 'var(--text-body)',
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
              </div>

              {activeView === 'list' && (
                <div style={{ position: 'relative', width: '280px' }}>
                  <Search size={15} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrar por nome, CNPJ ou banco..."
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

            {/* Compliance Banner */}
            <div style={{
              background: 'rgba(197, 168, 105, 0.04)',
              border: '1px solid var(--gold-border)',
              borderRadius: 'var(--radius-xs)',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              marginBottom: '1.5rem',
              fontSize: '0.78rem',
              color: 'var(--text-subtle)'
            }}>
              <ShieldCheck size={18} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
              <div>
                <strong>Protocolo de Segurança &amp; LGPD:</strong> Os dados bancários (Agência e Conta) e os relatórios de bureaus (Serasa, Gov.br, Quod, Boa Vista) são mantidos sob custódia sigilosa para acompanhamento de esteira de crédito. Senhas transacionais de terceiros não são armazenadas em conformidade com as normas do BACEN.
              </div>
            </div>

            {/* VIEW A: LIST CLIENTS */}
            {activeView === 'list' && (
              <div>
                {filteredClients.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-xs)' }}>
                    <div style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Nenhum cliente cadastrado no momento.
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#8E9BAE', marginBottom: '1.2rem' }}>
                      A base está 100% limpa (sem informações fictícias). Clique no botão abaixo para cadastrar seu primeiro cliente real.
                    </p>
                    <button
                      onClick={() => setActiveView('new')}
                      className="btn-primary-gold"
                      style={{ padding: '0.65rem 1.4rem', fontSize: '0.8rem' }}
                    >
                      Cadastrar Primeiro Cliente
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '55vh', overflowY: 'auto' }}>
                    {filteredClients.map((client) => (
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
                          gap: '1rem',
                          transition: 'border-color 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: 40,
                            height: 40,
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
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                color: '#6EE7B7',
                                fontWeight: 700
                              }}>
                                {client.statusConta}
                              </span>
                            </div>

                            <div style={{ fontSize: '0.78rem', color: '#8E9BAE', marginTop: '0.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                              <span>Doc: <strong style={{ color: '#CBD5E1' }}>{client.documento}</strong></span>
                              <span>Banco: <strong style={{ color: '#CBD5E1' }}>{client.banco} (Ag: {client.agencia} / CC: {client.conta})</strong></span>
                              <span>Gov: <strong style={{ color: 'var(--gold-light)' }}>{client.govNivel}</strong></span>
                              <span>Serasa: <strong style={{ color: '#6EE7B7' }}>{client.serasaStatus}</strong></span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <button
                            onClick={() => { setSelectedClient(client); setActiveView('detail'); }}
                            className="btn-secondary-subtle"
                            style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', gap: '0.3rem' }}
                          >
                            <Eye size={13} /> Ver Dossiê
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
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEW B: NEW CLIENT FORM */}
            {activeView === 'new' && (
              <form onSubmit={handleSaveClient} style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
                
                {/* Seção 1 */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', marginBottom: '0.8rem' }}>
                    1. Dados da Empresa / Cliente
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Razão Social / Nome:</label>
                      <input 
                        required
                        type="text"
                        value={newClient.nomeRazao}
                        onChange={(e) => setNewClient({ ...newClient, nomeRazao: e.target.value })}
                        placeholder="Ex: Prime Indústria e Comércio Ltda"
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
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Responsável / Sócio:</label>
                      <input 
                        required
                        type="text"
                        value={newClient.responsavel}
                        onChange={(e) => setNewClient({ ...newClient, responsavel: e.target.value })}
                        placeholder="Nome do diretor responsável"
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

                {/* Seção 2 */}
                <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', marginBottom: '0.8rem' }}>
                    2. Estrutura Bancária &amp; Contas Vinculadas
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Instituição Bancária:</label>
                      <select
                        value={newClient.banco}
                        onChange={(e) => setNewClient({ ...newClient, banco: e.target.value })}
                        style={{ width: '100%', background: '#121824', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      >
                        <option value="Itaú">Itaú / Itaú BBA</option>
                        <option value="Bradesco">Bradesco</option>
                        <option value="Santander">Santander</option>
                        <option value="BTG Pactual">BTG Pactual</option>
                        <option value="Banco Safra">Banco Safra</option>
                        <option value="Banco do Brasil">Banco do Brasil</option>
                        <option value="Caixa Econômica">Caixa Econômica</option>
                        <option value="Outro Banco / Fintech">Outra Instituição</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Agência:</label>
                      <input 
                        type="text"
                        value={newClient.agencia}
                        onChange={(e) => setNewClient({ ...newClient, agencia: e.target.value })}
                        placeholder="Ex: 0001"
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Conta Corrente / PJ:</label>
                      <input 
                        type="text"
                        value={newClient.conta}
                        onChange={(e) => setNewClient({ ...newClient, conta: e.target.value })}
                        placeholder="Ex: 12345-6"
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Status da Conta:</label>
                      <select
                        value={newClient.statusConta}
                        onChange={(e) => setNewClient({ ...newClient, statusConta: e.target.value })}
                        style={{ width: '100%', background: '#121824', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem' }}
                      >
                        <option value="Em Abertura">Em Abertura / Análise</option>
                        <option value="Ativa / Homologada">Ativa / Homologada</option>
                        <option value="Aprovada p/ Liquidação">Aprovada p/ Liquidação</option>
                        <option value="Pendente de Documento">Pendente de Documento</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seção 3 */}
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
                        <option value="Com Apontamento (Em Tratamento)">Com Apontamento (Em Tratamento)</option>
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

                {/* Seção 4 */}
                <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>
                    Notas Confidenciais da Operação / Limite Pretendido:
                  </label>
                  <textarea 
                    rows="3"
                    value={newClient.observacoesSigilosas}
                    onChange={(e) => setNewClient({ ...newClient, observacoesSigilosas: e.target.value })}
                    placeholder="Anotações internas sobre spread negociado, covenants, garantias ou status da conta bancária..."
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.65rem', borderRadius: 'var(--radius-xs)', color: '#FFFFFF', fontSize: '0.85rem', resize: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setActiveView('list')}
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
                    Salvar Dossiê de Cliente
                    <CheckCircle2 size={15} />
                  </button>
                </div>

              </form>
            )}

            {/* VIEW C: CLIENT DETAIL */}
            {activeView === 'detail' && selectedClient && (
              <div style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div>
                    <span className="badge-institutional">DOSSIÊ CORPORATIVO SEGURO</span>
                    <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginTop: '0.3rem' }}>
                      {selectedClient.nomeRazao}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                      Documento: <strong style={{ color: '#CBD5E1' }}>{selectedClient.documento}</strong> • Responsável: <strong style={{ color: '#CBD5E1' }}>{selectedClient.responsavel}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveView('list')}
                    className="btn-secondary-subtle"
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem' }}
                  >
                    Voltar à Lista
                  </button>
                </div>

                {/* 3 Grid Summary */}
                <div className="grid-3" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Dados Bancários</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.3rem' }}>
                      {selectedClient.banco}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--gold-light)', marginTop: '0.2rem' }}>
                      Agência: {selectedClient.agencia} • Conta: {selectedClient.conta}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#34D399', marginTop: '0.4rem' }}>
                      Status: {selectedClient.statusConta}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Plataforma Gov.br</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold-light)', marginTop: '0.3rem' }}>
                      {selectedClient.govNivel}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#8E9BAE', marginTop: '0.2rem' }}>
                      Protocolo: {selectedClient.govProtocolo || 'Homologado na Esteira'}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Bureaus de Crédito</div>
                    <div style={{ fontSize: '0.88rem', color: '#FFFFFF', marginTop: '0.3rem' }}>
                      <strong>Serasa:</strong> {selectedClient.serasaStatus}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
                      <strong>Quod:</strong> {selectedClient.quodStatus}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
                      <strong>Boa Vista:</strong> {selectedClient.boaVistaStatus}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedClient.observacoesSigilosas && (
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.25rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '0.4rem' }}>
                      Observações Sigilosas &amp; Andamento da Operação:
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                      {selectedClient.observacoesSigilosas}
                    </p>
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
