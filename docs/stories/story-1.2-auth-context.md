# Story 1.2: Implementação do AuthContext e Hooks de Autenticação

**Status:** Ready for Review
**Prioridade:** Alta
**Estimativa:** 1.5h

## 1. Descrição
Como desenvolvedor, preciso criar um Contexto de Autenticação (React Context API) para gerenciar o estado do usuário globalmente e fornecer hooks para login, logout e verificação de sessão.

## 2. Critérios de Aceite
- [x] Arquivo web/src/context/AuthContext.tsx criado.
- [x] Exportação de um useAuth hook para acessar o contexto.
- [x] O contexto deve capturar o evento onAuthStateChange do Supabase para atualizar o estado automaticamente.
- [x] Estado inicial deve verificar se já existe uma sessão ativa ao carregar a aplicação.
- [x] Tipagem TypeScript completa para o usuário e funções do contexto.

## 3. Detalhes Técnicos
- Utilizar o cliente Supabase criado na Story 1.1 (import { supabase } from '../lib/supabase').
- Envolver a aplicação no App.tsx com o AuthProvider.

## 4. Tarefas
- [x] Criar pasta web/src/context.
- [x] Implementar AuthContext.tsx com as funções signUp, signIn, signOut e o estado user.
- [x] Implementar o hook useAuth.
- [x] Atualizar web/src/App.tsx para incluir o AuthProvider.

## Dev Agent Record
- **Agent:** @dev (Dex)
- **Status:** Complete
- **Date:** 2026-03-29
- **Completion Notes:**
  - Context API implementada com sucesso.
  - Listener de `onAuthStateChange` configurado para reatividade total.
  - `App.tsx` refatorado para suportar o provider.
- **File List:**
  - `web/src/context/AuthContext.tsx` (Novo)
  - `web/src/App.tsx` (Modificado)
