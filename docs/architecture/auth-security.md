# Architecture: Autenticação e Segurança CRM Futurístico

## 1. Visão Geral Técnica
Implementação de um sistema de Identidade e Acesso (IAM) utilizando Supabase Auth integrado ao ecossistema Vite/React/TypeScript.

## 2. Componentes de Arquitetura
- **Auth Provider:** Supabase (PostgreSQL Auth).
- **Client Side:** @supabase/supabase-js para gerenciamento de sessão.
- **State Management:** React Context API (AuthContext).
- **Route Guard:** ProtectedRoute component para validação de sessão em tempo de execução.

## 3. Fluxo de Dados (Segurança)
1.  **Autenticação:** Usuário envia credenciais -> Supabase valida -> Retorna JWT + Refresh Token.
2.  **Persistência:** O SDK do Supabase gerencia o armazenamento seguro (localStorage/Cookies) e o ciclo de vida do Refresh Token.
3.  **Autorização (RLS):** Toda query ao banco de dados incluirá o JWT do usuário, validado pelas políticas de RLS do PostgreSQL.

## 4. Estrutura de Implementação (Proposta)
- web/src/context/AuthContext.tsx: Provedor global de estado.
- web/src/components/ProtectedRoute.tsx: Componente para proteção de rotas privadas.
- web/src/lib/supabase.ts: Configuração do cliente Supabase.

## 5. Próximos Passos
1.  **Handoff para @dev:** Implementação dos componentes base.
2.  **Configuração de Env:** Adição de SUPABASE_URL e SUPABASE_ANON_KEY.
