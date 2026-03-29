# Security Master Plan: CRM Anti-Hacker (AIOX Standard)

**Versão:** 1.0.0
**Status:** Estratégico
**Arquiteto:** Aria (@architect)

## 1. Filosofia: Zero Trust Architecture (ZTA)
Nenhum acesso é confiado por padrão, seja interno ou externo. Cada requisição ao CRM deve ser autenticada, autorizada e auditada.

## 2. Camada 1: Identidade e Acesso (IAM)
- [ ] **MFA Adaptativo:** Implementar Multi-Factor Authentication via Supabase (E-mail/TOTP).
- [ ] **Session Hardening:** Configurar JWTs com tempo de vida curto (15 min) e Refresh Tokens seguros com rotação.
- [ ] **Detecção de Anomalias:** Monitorar logins de IPs suspeitos ou múltiplas falhas (Brute-force protection).

## 3. Camada 2: Proteção de Dados (Data Security)
- [ ] **Row Level Security (RLS) Rigoroso:** Nenhuma tabela do banco de dados deve ser acessível sem uma política de RLS vinculada ao uth.uid().
- [ ] **Criptografia em Repouso e Trânsito:** AES-256 (DB) e TLS 1.3 (API) garantidos pelo Supabase/Vercel.
- [ ] **Data Minimization:** Mascarar PII (Personal Identifiable Information) em logs e telas de visualização geral.

## 4. Camada 3: Aplicação e API (AppSec)
- [ ] **Content Security Policy (CSP):** Implementar headers de CSP para mitigar ataques de XSS e Clickjacking.
- [ ] **Sanitização de Input:** Validar e sanitizar todo dado vindo do n8n ou formulários via Zod/Yup.
- [ ] **Audit Log Imutável:** Criar uma tabela de udit_logs onde cada criação, edição ou deleção de Lead seja registrada via gatilhos (triggers) do PostgreSQL.

## 5. Camada 4: Infraestrutura e CI/CD (DevSecOps)
- [ ] **Secret Management:** Garantir que NENHUMA chave (Supabase Service Role, n8n Key) esteja no código. Uso exclusivo de GitHub Secrets.
- [ ] **Static Analysis (SAST):** Integrar CodeRabbit e SonarQube na pipeline para detectar vulnerabilidades antes do deploy.

## 6. Próximos Passos (Handoffs)
1.  **@dev (Dex):** Implementar Zod para validação de dados e configurar CSP inicial.
2.  **@data-engineer (Dara):** Desenhar as políticas de RLS e Triggers de Auditoria.
3.  **@devops (Gage):** Configurar Branch Protection e Secrets no GitHub.
