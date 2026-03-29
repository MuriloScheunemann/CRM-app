# PRD: Ecossistema de Campanhas e Integração de E-mail B2B

## 1. Visão Geral
Implementar um sistema completo de e-mail marketing dentro do CRM, permitindo integração com múltiplos provedores, segmentação avançada de leads e criação de campanhas visuais.

## 2. Requisitos de Integração (Email Services)
- [ ] **Suporte Multi-Provedor:** Configuração de SMTP/IMAP para Gmail, Hostinger, Outlook.
- [ ] **Validação de Conexão:** Teste de conexão em tempo real.
- [ ] **Gestão de Credenciais:** Armazenamento seguro de senhas de app e chaves de API.

## 3. Requisitos de Segmentação B2B
- [ ] **Filtros Dinâmicos:** Separar leads por Indústria, Status, Valor de Pipeline ou Tags personalizadas.
- [ ] **Grupos de Campanha:** Criar listas estáticas e dinâmicas baseadas nos segmentos.

## 4. Requisitos de Campanhas e Design
- [ ] **Campaign Editor:** Editor de e-mail com suporte a HTML/Estilização moderna.
- [ ] **Visual Builder:** Templates \"visualmentes lindos\" (modernos e responsivos).
- [ ] **Disparo em Massa:** Motor de envio que respeita limites de provedores.
- [ ] **Rastreamento:** (Opcional) Abrir e-mails e cliques.

## 5. Próximos Passos
1.  **Handoff para @architect (Aria):** Desenho da infraestrutura de SMTP e workers de envio.
2.  **Handoff para @data-engineer (Dara):** Schema para campanhas, templates e configurações de e-mail.
3.  **Handoff para @dev (Dex):** Implementação da UI do Campaign Builder.
