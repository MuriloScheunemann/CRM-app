# Story 4.1: Configuração e Integração de Provedores de E-mail (SMTP/IMAP)

**Status:** Approved
**Prioridade:** Alta
**Estimativa:** 2h

## 1. Descrição
Como usuário do CRM, quero poder configurar meus próprios serviços de e-mail (Gmail, Hostinger, etc.) para que o sistema possa realizar disparos em meu nome.

## 2. Critérios de Aceite
- [ ] UI de configuração de SMTP criada (Host, Porta, Usuário, Senha, SSL/TLS).
- [ ] Funcionalidade de \"Testar Conexão\" enviando um e-mail de teste via n8n.
- [ ] Armazenamento seguro das credenciais na tabela de configurações (com criptografia sugerida).
- [ ] Suporte a placeholders para os provedores mais comuns.

## 3. Detalhes Técnicos
- Seguir a arquitetura definida em docs/architecture/email-campaign-system.md.
- Utilizar um Webhook específico no n8n para validar a conexão SMTP.

## 4. Tarefas
1. Criar componente de formulário EmailSettingsForm.tsx.
2. Implementar rota/view de Configurações no Dashboard.
3. Conectar o formulário ao Supabase para persistência.
