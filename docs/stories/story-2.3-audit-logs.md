# Story 2.3: Configuração de Auditoria Imutável (Audit Logs)

**Status:** In Progress
**Prioridade:** Alta

## 1. Descrição
Implementar um sistema de logs de auditoria automatizado via Triggers no PostgreSQL para registrar todas as operações de escrita (INSERT, UPDATE, DELETE) na tabela de Leads.

## 2. Critérios de Aceite
- [ ] Tabela udit_logs criada no schema public.
- [ ] Função de trigger process_audit_log() implementada.
- [ ] Trigger aplicado à tabela leads.
- [ ] Garantia de que os logs de auditoria são imutáveis (usuários não podem deletar logs).

## 3. Detalhes Técnicos
- Registro de: ID do registro afetado, Nome da tabela, Ação (INSERT/UPDATE/DELETE), Payload (JSONB), Usuário (auth.uid()) e Timestamp.

## 4. Tarefas
1. Criar tabela de Auditoria.
2. Criar função de Trigger.
3. Aplicar Trigger à tabela Leads.
