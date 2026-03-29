# CRM Futuristico com AIOX + n8n

Este projeto foi preparado com AIOX e possui uma interface CRM futuristica em React.

## Estrutura

- `web/`: frontend CRM (Vite + React + TypeScript)
- `.aiox-core/`: base de operacao e padroes do AIOX

## Executar o CRM

```bash
cd web
npm install
npm run dev
```

## Build de producao

```bash
cd web
npm run build
```

## Integracao com n8n

Na tela do CRM existe um formulario de `Webhook URL`.

1. No n8n, crie um workflow com node `Webhook` (metodo `POST`).
2. Copie a URL do webhook.
3. Cole no campo da aplicacao e clique em `Sincronizar com n8n`.

Payload enviado:

- `source`: identificador da aplicacao
- `sentAt`: timestamp ISO
- `totals`: metricas do funil
- `leads`: lista atual de leads filtrados
