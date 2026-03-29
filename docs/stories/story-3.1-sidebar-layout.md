# Story 3.1: Implementação da Sidebar e Estrutura de Layout Root

**Status:** Approved
**Prioridade:** Alta
**Estimativa:** 2h

## 1. Descrição
Como usuário, quero um menu lateral persistente que me permita navegar entre as diferentes áreas do CRM (Painel, Empresas, Contatos, Atividades) de forma rápida e intuitiva.

## 2. Critérios de Aceite
- [ ] Componente Sidebar.tsx criado com visual Glassmorphism e links neon.
- [ ] Layout global atualizado para incluir a Sidebar à esquerda e o conteúdo à direita.
- [ ] Estado de navegação implementado para trocar as visualizações no Dashboard.
- [ ] Sidebar responsiva (colapsa ou oculta em telas pequenas).

## 3. Detalhes Técnicos
- Seguir o design definido em docs/architecture/ui-layout-design.md.
- Usar display: flex ou grid no App.tsx para a divisão lateral.

## 4. Tarefas
1. Criar web/src/components/Sidebar.tsx.
2. Refatorar web/src/App.tsx para usar o novo padrão de Layout.
3. Adicionar estilos de Sidebar no App.css.
