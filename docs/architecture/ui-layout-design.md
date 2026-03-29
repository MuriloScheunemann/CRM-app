# Architecture: UI Layout e Navegação CRM Futurístico

## 1. Visão Geral
Refatoração da estrutura visual para suportar navegação multi-página persistente e grids de dados de alta precisão.

## 2. Estrutura de Componentes
- **LayoutRoot:** Componente pai que gerencia a disposição Sidebar vs Conteúdo.
- **Sidebar (Lateral):** Menu persistente com ícones e links neon.
- **Navigation (Simple Router):** Estado global para troca de views sem refresh.
- **DataGrid (Refined):** Padrão de layout para tabelas e canais kanban usando CSS Grid fixo.

## 3. Especificações Visuais (AIOX Standard)
- **Sidebar Width:** 260px (expandida) / 80px (colapsada).
- **Glassmorphism:** ackdrop-filter: blur(16px) em todos os painéis.
- **Grid Alignment:** Uso de display: grid com grid-template-columns fixos para garantir que os cabeçalhos de tabela alinhem com os dados.

## 4. Mapa de Navegação
1.  **Dashboard:** Visão geral (atual).
2.  **Companies:** Tabela de empresas.
3.  **Contacts:** Lista de stakeholders.
4.  **Activities:** Timeline de interações.

## 5. Próximos Passos (Handoffs)
1.  **@sm (River):** Criar histórias para Sidebar e Refatoração de Grids.
2.  **@dev (Dex):** Implementar o CSS do Layout e os componentes de navegação.
