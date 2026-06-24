# AGENTS.md — Painel Clima

Guia para agentes de IA trabalharem neste repositório. Leia antes de planejar, implementar ou revisar.

## Tipo de projeto

- **Tipo:** `fullstack`

> Projeto com `frontend/` (React) e `backend/` (Express). As skills de processo (`execute-review`, `execute-qa`) e os subagents de review aplicam o ramo correspondente, segmentando pelo que cada mudança toca (`frontend/` vs `backend/`).

## Stack

<!-- Resuma a stack para o agente carregar as skills certas. -->

- **Linguagem/runtime:** Typescript, Node 20+
- **Backend:** Express
- **Frontend:** React, Vite, Tailwind
- **Testes:** Vitest (unit/integração) + Playwright (E2E)
- **Gerenciador de pacotes:** npm

## Comandos

<!-- Comandos principais do projeto. -->

`backend/` e `frontend/` são pacotes npm independentes (sem workspace na raiz) — rode os comandos dentro de cada pasta. O **E2E** fica num pacote próprio na **raiz** do `examples/`.

| Ação                | backend/                | frontend/             | raiz (`examples/`)  |
| ------------------- | ----------------------- | --------------------- | ------------------- |
| Dev (sobe a app)    | `npm run dev`           | `npm run dev`         | —                   |
| Build               | `npm run build`         | `npm run build`       | —                   |
| Typecheck           | —                       | `npm run typecheck`   | —                   |
| Lint                | —                       | `npm run lint`        | —                   |
| Testes unitários    | `npm test`              | —                     | —                   |
| Testes (watch)      | `npm run test:watch`    | —                     | —                   |
| Coverage            | `npm run test:coverage` | —                     | —                   |
| E2E (Playwright)    | —                       | —                     | `npm run test:e2e`  |

- **URL local da app:** `http://localhost:5173` (frontend) · API em `http://localhost:3000` (backend)
- **Branch base:** `main`
- **E2E:** `playwright.config.ts` na raiz sobe back+front via `webServer`; specs em `tests/e2e/`. Rode `npm install` na raiz e `npx playwright install chromium` na 1ª vez.
- **Testes unitários/coverage (backend):** Vitest (`environment: 'node'`, `globals: true`) + Supertest para testar a app Express. Config em `backend/vitest.config.ts`; coverage via `@vitest/coverage-v8` (relatório em `backend/coverage/`). Specs em `*.test.ts`/`*.spec.ts` dentro de `backend/src/`. A app é montada por `createApp()` em `src/app.ts` (sem `listen`) para permitir testes sem subir o servidor.
- **Testes unitários (frontend):** ainda não há runner.

## Regras do projeto

<!-- As regras inegociáveis deste projeto. -->

- **Idioma do código:** todo o código em inglês — variáveis, funções, tipos, comentários.
- **Idioma da documentação:** pt-BR.
- **Testes:** descrições de `describe`/`it` em português; `it` sempre no padrão imperativo **"deve…"** (ex.: `it('deve retornar 404 quando a cidade não existe')`).
- **Nomenclatura de arquivos:** sempre **kebab-case** (ex.: `weather-panel.tsx`, `city-search.controller.ts`).
- **Tipagem:** sem `any` — tipe explicitamente (use `unknown` + narrowing quando necessário).
- **Sem números mágicos:** extraia para constantes nomeadas com significado; nada de strings/números soltos no meio do código.
- **Logging (backend):** logue em cada statement/branch relevante para deixar o fluxo rastreável.
- **Commits:** commit semântico (Conventional Commits — `feat:`, `fix:`, `chore:`, …).

> Regras mais detalhadas também podem viver em `.claude/rules/`, `.cursor/rules/` ou em skills dedicadas — referencie-as aqui.

## Skills de arquitetura e padrões (carregar conforme a tarefa)

Consulte o `SKILL.md` da skill em `.claude/skills/<nome>/` (ou `.agents/skills/<nome>/`) antes de implementar ou revisar. Estas são as skills de **convenção** instaladas no projeto.

> As skills do pipeline SDD (`create-prd`, `create-techspec`, `create-tasks`, `execute-task`, `execute-review`, `execute-qa`, `execute-bugfix`) também vivem em `.claude/skills/`, mas são skills de **processo** — você as aciona por fase, não as consulta como convenção. Não as liste aqui.

| Skill                     | Acionar para…                                                                                  | Não usar se…                       |
| ------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------- |
| `express-rest-api`        | Rotas Express, middleware, validação, status/erro HTTP em APIs REST                            | Tarefa só frontend                 |
| `nodejs-backend-patterns` | Arquitetura de serviço Node: middleware, tratamento de erro, auth, integração com DB, API design | Tarefa só frontend                 |
| `react-frontend-expert`   | Componentes/hooks React+TS, páginas, data fetching (TanStack Query), forms, routing, a11y      | Tarefa só backend; testes (não cobre) |

**Ordem sugerida por tarefa:**

- **Backend HTTP:** `express-rest-api` → `nodejs-backend-patterns`
- **Frontend:** `react-frontend-expert` (+ siga o `DESIGN.md` para UI)

## Subagents de review (Claude Code)

Subagents em `.claude/agents/` revisam uma task em **contexto isolado** (sem o viés de quem implementou), por task, depois do `execute-task` e antes do `execute-review`. Como o projeto é `fullstack`, escolha pelo que a task tocou:

| Subagent | Use para… |
| -------- | --------- |
| `frontend-reviewer` | Tasks de **frontend** (`frontend/`) — carrega `react-frontend-expert` e o `DESIGN.md`. |
| `backend-reviewer` | Tasks de **backend** (`backend/`) — carrega `express-rest-api` / `nodejs-backend-patterns`. |
| `task-reviewer` | Review genérico, quando a task não se encaixa claramente em uma camada. |

> Task que cruza as duas camadas: rode `frontend-reviewer` e `backend-reviewer`.

> **Orquestrador `execute-tasks`:** para executar todas as tasks da feature de uma vez (em ondas, via subagentes), o projeto também define o subagente **implementador** `task-executor` — ele implementa cada task e aplica as correções do review, enquanto o orquestrador aciona o reviewer da camada e marca o `tasks.md`.

## MCPs

<!-- MCPs disponíveis/esperados neste projeto. -->

- **Context7** — documentação atualizada de linguagens/frameworks/libs.
- **Playwright** (`browser_*`) — E2E, acessibilidade e validação visual no navegador.

## Notas de testes E2E (opcional)

<!-- Particularidades de E2E do projeto (portas, mocks de API, fixtures). -->

- `frontend/playwright.config.ts` sobe backend e frontend via `webServer`; intercepte chamadas externas com `page.route`.

# DESIGN.md

- Toda a UI que você trabalhar, você sempre tem que seguir o ./DESIGN.md completamente
- Leia sempre o DESIGN.md antes de começar tanto planejamento quanto execução de tarefas de UI
