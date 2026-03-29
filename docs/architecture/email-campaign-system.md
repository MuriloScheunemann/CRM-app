# Architecture: Ecossistema de E-mail e Campanhas B2B

## 1. Visão Geral Técnica
Sistema distribuído que utiliza o CRM como painel de controle, Supabase para persistência e n8n como engine de execução de disparos.

## 2. Fluxo de Envio (Pipeline)
1.  **Dashboard CRM:** Usuário cria template e seleciona segmento.
2.  **Supabase:** Salva a Campanha e resolve a lista de destinatários via Query SQL.
3.  **n8n Webhook:** Recebe o payload da campanha (HTML + Lista de Contatos).
4.  **n8n SMTP Node:** Realiza a conexão com Hostinger/Gmail e dispara as mensagens individualmente com controle de throttling.

## 3. Motor de Segmentação
- **Lógica:** Implementação de um SegmentBuilder no frontend que gera condições para a cláusula WHERE do PostgreSQL.
- **Exemplo:** status = 'Lead' AND segment = 'Fintech'.

## 4. Design de E-mail (Visual Builder)
- **Tooling:** Integração de um editor JSON-to-HTML (como GrapesJS ou similar) para permitir que o usuário arraste blocos neon e crie e-mails futuristas.
- **Sandboxing:** Templates salvos como JSON para fácil edição e exportados para HTML no momento do envio.

## 5. Próximos Passos (Handoffs)
1.  **@data-engineer (Dara):** Criar tabelas email_templates, campaigns e segments.
2.  **@sm (River):** Criar histórias para a UI do editor de campanhas.
3.  **@dev (Dex):** Implementar a integração com o webhook do n8n.
