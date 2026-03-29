# Story 1.1: Configuração do Cliente Supabase e Infraestrutura de Autenticação

**Status:** Ready for Review
**Prioridade:** Alta
**Estimativa:** 1h

## 1. Descrição
Como desenvolvedor, preciso configurar o cliente Supabase e as variáveis de ambiente para estabelecer a conexão segura com o provedor de autenticação.

## 2. Critérios de Aceite
- [x] Arquivo .env.local criado com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.
- [x] SDK @supabase/supabase-js instalado na pasta web.
- [x] Arquivo web/src/lib/supabase.ts inicializando o cliente corretamente.
- [x] Validação de que o cliente não falha se as chaves estiverem ausentes (erro amigável).

## 3. Detalhes Técnicos
- Seguir o padrão definido em docs/architecture/auth-security.md.
- Usar variáveis de ambiente com prefixo VITE_ conforme exigido pelo Vite.

## 4. Tarefas
- [x] Instalar dependência: pm install @supabase/supabase-js na pasta web.
- [x] Criar web/src/lib/supabase.ts.
- [x] Configurar .env.local (placeholders para o usuário preencher).

## Dev Agent Record
- **Agent:** @dev (Dex)
- **Status:** Complete
- **Date:** 2026-03-29
- **Completion Notes:**
  - Dependência `@supabase/supabase-js` instalada.
  - `web/src/lib/supabase.ts` criado com tratamento de erro básico para chaves ausentes.
  - `.env.local` criado na pasta `web` com placeholders.
- **File List:**
  - `web/src/lib/supabase.ts` (Novo)
  - `web/.env.local` (Novo)
  - `web/package.json` (Modificado)
  - `web/package-lock.json` (Modificado)
