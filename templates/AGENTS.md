<!--
  Template de AGENTS.md — copie para a RAIZ do seu projeto e preencha.
  Este arquivo é o "mapa" que os agentes leem: tipo do projeto, stack, comandos,
  regras do projeto e quais skills de convenção carregar. Este AGENTS.md (raiz) é o
  mapa de convenções UNIVERSAL: Cursor, Codex e Gemini/Antigravity o leem nativamente;
  o Claude Code o alcança por um CLAUDE.md apontando para "@AGENTS.md". Já os subagents
  e as skills de convenção têm FONTE ÚNICA em `.agents/`, espelhada por symlink para os
  harnesses com pasta própria — `.cursor/` (Cursor) e `.claude/` (Claude Code).

  OBRIGATÓRIO: declare o "Tipo de projeto" (frontend / backend / fullstack) logo
  abaixo — as skills de processo (execute-review, execute-qa) e os subagents de
  review usam esse campo para escolher o ramo/foco correto. Sem ele, o agente não
  sabe se deve revisar/QA como frontend, backend ou os dois.

  Ao adaptar: apague estes blocos de comentário e os exemplos que não se aplicarem.
-->

# AGENTS.md — [Nome do Projeto]

Guia para agentes de IA trabalharem neste repositório. Leia antes de planejar, implementar ou revisar.

## Tipo de projeto

<!--
  Declare o tipo do projeto. As skills de processo (execute-review, execute-qa) e os
  subagents de review usam ESTE campo para escolher o ramo/foco correto. Mantenha um
  único valor.
-->

- **Tipo:** [ `frontend` | `backend` | `fullstack` ]

> - **frontend** → review/QA focam UI, a11y e data fetching; QA usa Playwright (browser).
> - **backend** → review/QA focam API/HTTP, validação, erros e segurança; QA valida contrato de API sem navegador.
> - **fullstack** → aplica os dois ramos, segmentando pelo que cada mudança toca (ex.: `frontend/` vs `backend/`).

## Stack

<!-- Resuma a stack para o agente carregar as skills certas. -->

- **Linguagem/runtime:** [ex.: TypeScript + Node 20 (ESM)]
- **Backend:** [ex.: Express]
- **Frontend:** [ex.: React + Vite + Tailwind]
- **Testes:** [ex.: Vitest (unit/integração) + Playwright (E2E)]
- **Gerenciador de pacotes:** [ex.: npm]

## Comandos

<!-- Comandos principais do projeto. -->

| Ação | Comando |
| ---- | ------- |
| Dev (sobe a app) | `[npm run dev]` |
| Testes | `[npm test]` |
| Coverage | `[npm run test:coverage]` |
| Typecheck | `[npm run typecheck]` |
| E2E | `[npm run test:e2e]` |
| Lint | `[npm run lint]` |

- **URL local da app:** `[http://localhost:5173]`
- **Branch base:** `[main]`

## Regras do projeto

<!-- As regras inegociáveis. Estas são exemplos comuns — ajuste à sua política. -->

- **Idioma do código:** [ex.: todo o código em inglês — variáveis, funções, comentários]
- **Idioma da documentação:** [ex.: pt-BR]
- **Nomenclatura:** [ex.: camelCase para vars/funções, PascalCase para tipos/classes, kebab-case para arquivos]
- **Funções:** [ex.: começam com verbo, ação única, ≤ 50 linhas, ≤ 3 parâmetros]
- **Sem números mágicos:** use constantes nomeadas
- **Sem `any`** (ou política de tipagem do projeto)
- **Tratamento de erro:** [padrão do projeto]
- **Logging:** [padrão do projeto]
- **Commits/PRs:** [convenção, ex.: Conventional Commits]

> Regras mais detalhadas também podem viver em `.claude/rules/`, `.cursor/rules/` ou em skills dedicadas — referencie-as aqui.

## Skills de arquitetura e padrões (carregar conforme a tarefa)

<!--
  IMPORTANTE: o r-spec entrega apenas as skills de PROCESSO (create-prd … execute-bugfix).
  As skills de CONVENÇÃO (padrões de React, de API Express, de testes, etc.) são
  ESPECÍFICAS do seu projeto — VOCÊ as cria, com a sua stack e as suas regras, em
  `.agents/skills/<nome>/` ou `.claude/skills/<nome>/`. As skills de processo as carregam
  automaticamente a partir desta seção, conforme o "Tipo de projeto" acima.

  Crie pelo menos uma skill de convenção por camada que o projeto tem:
    - frontend  → ex.: `react-frontend-conventions` (componentes, hooks, a11y, data fetching)
    - backend   → ex.: `express-rest-conventions` (rotas, validação, erros, segurança)
  Veja exemplos reais em `example/.agents/skills/` (ex.: `react-frontend-expert`).
  Substitua as linhas abaixo pelas SUAS skills.
-->

Consulte o `SKILL.md` da skill em `.agents/skills/<nome>/` (ou `.claude/skills/<nome>/`) antes de implementar ou revisar.

| Skill | Acionar para… | Não usar se… |
| ----- | ------------- | ------------ |
| `code-standards` | Nomenclatura, CQS, early return, tamanho de métodos/classes | — |
| `nodejs-typescript-conventions` | TS/Node, ESM, async/await, sem `any` | Projeto JS puro |
| `react-frontend-conventions` | Componentes React, TSX, hooks, Tailwind | Sem React |
| `express-rest-http` | Rotas Express, HTTP, status, OpenAPI | Servidor não-Express |
| `vitest-testing` | Testes com Vitest, mocks `vi`, AAA | Stack de testes diferente |
| `repo-folder-structure` | Onde criar features, pages, controllers/services | Layout diferente |
| `ui-ux-pro-max` | Design/revisão de UI, paletas, tipografia, a11y | Tarefa só backend |

**Ordem sugerida por tarefa:**

- **Backend HTTP:** `express-rest-http` → `repo-folder-structure` → `nodejs-typescript-conventions` → `code-standards`
- **Frontend:** `ui-ux-pro-max` → `react-frontend-conventions` → `repo-folder-structure` → `nodejs-typescript-conventions` → `code-standards`
- **Testes:** `vitest-testing` + a skill da camada testada

## Subagents de review (opcional)

<!--
  Subagents rodam em CONTEXTO ISOLADO e revisam uma task SEM o viés de quem a implementou.
  A FONTE única fica em `.agents/agents/<nome>.md`: Codex/Gemini/Antigravity a leem direto,
  e Cursor e Claude Code recebem espelho por symlink (`.cursor/agents/` e `.claude/agents/`).
  Escolha o subagent conforme o "Tipo de projeto" e a camada da task.
  Exemplos prontos para copiar/adaptar em `example/.agents/agents/`.
-->

| Subagent | Use para… | Tipo de projeto |
| -------- | --------- | --------------- |
| `frontend-reviewer` | Review independente de tasks de **frontend** (UI/hooks/a11y) | `frontend` ou `fullstack` |
| `backend-reviewer` | Review independente de tasks de **backend** (API/HTTP/DB) | `backend` ou `fullstack` |
| `task-reviewer` | Review genérico (uma camada só, ou projeto sem distinção clara) | qualquer |

- **frontend** → use `frontend-reviewer`.
- **backend** → use `backend-reviewer`.
- **fullstack** → escolha pelo que a task tocou: `frontend-reviewer` para tasks de UI, `backend-reviewer` para tasks de API. Se a task cruza as duas camadas, rode os dois.
- Roda **por task**, depois do `execute-task` e antes do `execute-review` (review consolidado da feature).

> **Orquestrador `execute-tasks` (opcional):** se você usa a skill `execute-tasks` (executa todas as tasks da feature em ondas, via subagentes), além do reviewer acima defina também o subagente **implementador** `task-executor` — ele implementa cada task sob coordenação do orquestrador, que aciona o reviewer e fala com você. Fonte em `.agents/agents/task-executor.md`, espelhada por symlink como os demais.

## MCPs

<!-- MCPs disponíveis/esperados neste projeto. -->

- **Context7** — documentação atualizada de linguagens/frameworks/libs.
- **Playwright** (`browser_*`) — E2E, acessibilidade e validação visual no navegador.

## Persistência do plano (opcional)

<!-- Se o seu harness tem "modo plano", defina onde salvar o plano aceito. -->

- Ao aceitar um plano, salve-o em `[.codex/plans/<timestamp>-<slug>.md]` e atualize-o se mudar.

## Notas de testes E2E (opcional)

<!-- Particularidades de E2E do projeto (portas, mocks de API, fixtures). -->

- [ex.: `playwright.config.ts` sobe backend e frontend via `webServer`; intercepte chamadas externas com `page.route`.]
