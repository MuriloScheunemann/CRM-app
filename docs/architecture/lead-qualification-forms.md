# Arquitetura: Formulários de qualificação (estilo Typeform)

## Objetivo

Permitir captura pública de respostas, **pontuar segmentos B2B** por opção escolhida e **criar lead** no CRM com `segment` qualificado. Campanhas reutilizam os mesmos **segmentos** definidos em `constants/segments.ts`.

## Fluxo de dados

1. **Definição** (`FormDefinition` em `types/forms.ts`): perguntas do tipo escolha, opções com `segmentPoints` (parcial por segmento).
2. **Runtime público** (`/f/:slug`): `PublicFormRunner` exibe uma pergunta por vez; ao final coleta nome, e-mail e empresa.
3. **Qualificação** (`lib/qualifyFromForm.ts`): soma pontos por segmento; desempate pela ordem canônica em `CRM_SEGMENTS`.
4. **Persistência (demo)**: `CrmLeadsContext` grava leads e definições de formulário em `localStorage` (`b2b_crm_leads_v3`, `b2b_crm_forms_v1`).
5. **Campanhas**: `CampaignManager` filtra por segmento; leads de formulário aparecem no mesmo funil com `leadSource: 'form'`.

## Extensões futuras

- Persistir em Supabase (tabelas `forms`, `form_submissions`).
- Webhook n8n no submit (paralelo à criação do lead).
- Tipos de pergunta adicionais (escala, NPS).
