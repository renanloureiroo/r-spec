<!--
  Template de AGENTS.md — copie para a RAIZ do seu projeto e preencha.
  Este arquivo é o "mapa" que os agentes leem: stack, comandos, regras do projeto
  e quais skills de convenção carregar. Lido nativamente por Codex/Cursor/etc.
  No Claude Code, aponte para ele a partir do CLAUDE.md (ex.: "Siga @AGENTS.md").
  Ao adaptar: apague estes blocos de comentário e os exemplos que não se aplicarem.
-->

# AGENTS.md — [Nome do Projeto]

Guia para agentes de IA trabalharem neste repositório. Leia antes de planejar, implementar ou revisar.

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
  Liste as skills de CONVENÇÃO instaladas no projeto (em .agents/skills/, .claude/skills/, etc.).
  O agente deve consultar o SKILL.md correspondente ANTES de implementar/revisar.
  Substitua as linhas de exemplo pelas suas skills reais.
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
