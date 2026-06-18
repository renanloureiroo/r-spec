# Foco de QA — Backend (contrato de API / integração)

Fluxo de QA específico da camada de **backend**, **sem navegador**. Substitui as Etapas 2–5 (browser/a11y/visual) da skill `execute-qa` por validação direta da API. O contrato de saída continua o mesmo: `qa.md` + `bugs.md` no formato compartilhado.

## Preparação
- Suba o serviço (ver *Configuração por projeto*: ex.: `npm run dev`).
- Escolha o cliente HTTP: testes de integração (ex.: Supertest sobre a app montada por `createApp()` sem `listen`), `curl`, ou o MCP de API do projeto (ex.: Insomnia).

## O que validar (por endpoint da feature)
- **Contrato:** status codes corretos (`200`/`201`/`204`/`400`/`401`/`403`/`404`/`500`), shape da resposta e headers conforme TechSpec/OpenAPI.
- **Caminho feliz:** entrada válida → resposta e efeito colateral (persistência) esperados.
- **Caminhos de erro:** entrada inválida → `400`; sem auth → `401`; sem permissão → `403`; recurso ausente → `404`; falha interna tratada **sem vazar stack**.
- **Casos de borda:** paginação, filtros, limites/tamanho de payload, idempotência onde aplicável, concorrência básica.
- **Validação na borda:** payloads malformados rejeitados antes da regra de negócio.
- **Segurança rápida:** sem secrets vazados na resposta; CORS/headers adequados.

## Evidência
Sem screenshots — salve em `./tasks/[NN]-[nome-da-feature]/qa/` os artefatos textuais: requisição/resposta (método, URL, body, status), trechos de log relevantes, ou export do cliente HTTP. Referencie no `bugs.md`/`qa.md` (ex.: `qa/bug-01.http` ou `qa/bug-01.log`).

## Não se aplica
- Etapas de browser (Playwright `browser_*`), a11y de UI e checagens visuais — pule em projetos só-backend. Em **fullstack**, faça também o ramo frontend.
