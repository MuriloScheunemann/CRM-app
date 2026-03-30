# Story 5.1: Formulários de qualificação (Typeform-like) e segmentação

**Status:** Implemented  
**Prioridade:** Alta  

## Descrição

Como comercial, quero **criar formulários** com aparência futurista, **qualificar leads por segmento** com base nas respostas e **direcionar campanhas** aos mesmos segmentos.

## Critérios de aceite

- [x] Rota pública `/f/:slug` sem login, com fluxo uma-pergunta-por-vez.
- [x] Editor no CRM (menu Formulários): título, slug, tema (cores + fundo CSS), perguntas e opções com peso por segmento.
- [x] Lead criado com `leadSource: 'form'`, `formId`, `formSlug` e `segment` calculado.
- [x] Contatos exibem origem Formulário vs CRM.
- [x] Campanhas documentam alinhamento com segmentos dos formulários.
- [x] Documentação de arquitetura e story AIOX.

## Tarefas técnicas

1. `CrmLeadsProvider` + `react-router-dom` (`main.tsx`).
2. `PublicFormRunner`, `FormBuilder`, `FormsPage`, `qualifyFromForm`.
3. Extensão `LeadSchema` (campos opcionais).
4. Estilos `.form-runner` / `.form-builder` em `App.css`.
