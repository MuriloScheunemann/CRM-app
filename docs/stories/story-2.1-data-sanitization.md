# Story 2.1: Implementação de Zod para Sanitização e Validação de Dados

**Status:** Approved
**Prioridade:** Crítica
**Estimativa:** 1h

## 1. Descrição
Como arquiteto de segurança, preciso garantir que todos os dados inseridos ou sincronizados no CRM (n8n, formulários) sejam validados e sanitizados para impedir ataques de Cross-Site Scripting (XSS) e SQL Injection.

## 2. Critérios de Aceite
- [ ] Biblioteca zod instalada na pasta web.
- [ ] Schema de validação para Lead criado em web/src/types/schemas.ts.
- [ ] Função de sincronização com n8n atualizada para validar o payload antes do envio.
- [ ] Feedback visual no console/UI caso os dados não sigam o schema.

## 3. Detalhes Técnicos
- Seguir o Security Master Plan (§4).
- Garantir que nenhum dado \"sujo\" entre no estado da aplicação.

## 4. Tarefas
1. Instalar zod na pasta web.
2. Criar schema de validação para Leads.
3. Aplicar validação no handleSyncN8n.
