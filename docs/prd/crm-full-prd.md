# PRD: CRM Futurístico Hub (Visão Profissional)

## 1. Visão Geral
Transformar o protótipo inicial em uma plataforma CRM robusta, com navegação intuitiva, segurança de nível enterprise e interface futurística consistente.

## 2. Requisitos de Navegação (Novo)
- [ ] **Menu Lateral (Sidebar):** Navegação persistente com acesso rápido a:
    - **Painel:** Visão geral de KPIs e Pipeline.
    - **Empresas:** Gestão de contas corporativas.
    - **Contatos:** Gestão de leads e stakeholders.
    - **Atividades:** Log de interações e tarefas.
- [ ] **Navegação Reativa:** Troca de telas sem reload (SPA) usando React State ou Router.

## 3. Requisitos de UX/UI (Refinamento)
- [ ] **Correção de Alinhamento:** Revisar grids da Pipeline Visual e Tabelas de Clientes para alinhamento profissional.
- [ ] **Consistência Neon:** Garantir que todos os componentes sigam o padrão Cyberpunk/Glassmorphism.
- [ ] **Responsividade:** Sidebar colapsável em telas menores.

## 4. Requisitos de Autenticação (Integrado)
- [x] Camada de autenticação com Supabase Auth. ✅
- [x] Proteção de rotas privadas. ✅
- [x] Modo de demonstração para stakeholders. ✅

## 5. Próximos Passos
1.  **Handoff para @architect (Aria):** Desenhar o layout com Sidebar e Grid otimizado.
2.  **Handoff para @sm (River):** Quebrar em tarefas de refatoração de CSS e Componentes.
