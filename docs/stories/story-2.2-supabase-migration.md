# Story 2.2: Migração para Supabase Real com Políticas de RLS

**Status:** In Progress
**Prioridade:** Crítica

## 1. Descrição
Migrar o armazenamento de Leads de mock para o PostgreSQL (Supabase) e implementar Row Level Security (RLS) para garantir o isolamento total de dados entre usuários.

## 2. Critérios de Aceite
- [ ] Tabela leads criada no Supabase com tipos corretos.
- [ ] RLS habilitado na tabela leads.
- [ ] Política \"Users can only access their own leads\" implementada.
- [ ] Script de migração SQL gerado para o usuário aplicar no painel do Supabase.

## 3. Detalhes Técnicos
- Coluna user_id obrigatória e vinculada ao uth.uid().
- Coluna id como igint auto-incremental.
- Timestamps de auditoria (created_at).

## 4. Tarefas
1. Criar design do schema SQL.
2. Gerar script de políticas RLS.
3. Disponibilizar script final.
