# AGENTS.md — {{NOME_DO_PROJETO}}

> Template preenchível de `AGENTS.md`. Copie este arquivo para a raiz de um novo
> repositório, renomeie para `AGENTS.md` e substitua todos os placeholders
> `{{...}}`. Remova as linhas de instrução em blockquote (`>`) e as seções que
> não se aplicarem. Mantenha tudo em pt-BR, salvo o código de exemplo.

Guia para agentes de IA trabalharem neste repositório. Leia antes de planejar, implementar ou revisar.

> **{{NOME_DO_PROJETO}}** é {{DESCRICAO_CURTA_DO_PROJETO — o que é, stack
> principal e estilo de arquitetura. Ex.: "a API backend do X (NestJS + Prisma +
> Postgres), com arquitetura Hexagonal/DDD"}}.

## Stack

> Liste a stack real do projeto. Apague linhas que não se aplicarem e acrescente
> as que faltarem (cache, fila, observabilidade, etc.).

- **Linguagem/runtime:** {{LINGUAGEM_E_VERSAO}} + {{RUNTIME_E_VERSAO}} — {{CONFIG_RELEVANTE_DO_COMPILADOR}}
- **Backend/framework:** {{FRAMEWORK_E_VERSAO}}
- **Persistência:** {{ORM_OU_DRIVER}} + {{BANCO_DE_DADOS}}
- **Auth:** {{ESTRATEGIA_DE_AUTH}}
- **Testes:** {{FRAMEWORK_DE_TESTES}} — {{NIVEIS: unit / integration / e2e}}; {{FERRAMENTAS_AUXILIARES}}
- **Build/compilação:** {{FERRAMENTA_DE_BUILD}}
- **Lint/format:** {{LINTER}} + {{FORMATTER}}
- **Gerenciador de pacotes:** {{GERENCIADOR_DE_PACOTES}}
- **Infra:** {{INFRA_LOCAL_E_DEPLOY}}

## Comandos

> Preencha com os scripts reais (veja `package.json`/`Makefile`/`justfile`).
> Mantenha apenas as linhas que existem no projeto.

| Ação                      | Comando                          |
| ------------------------- | -------------------------------- |
| Dev (watch)               | `{{CMD_DEV}}`                    |
| Build                     | `{{CMD_BUILD}}`                  |
| Start (prod)              | `{{CMD_START_PROD}}`             |
| Lint (com `--fix`)        | `{{CMD_LINT}}`                   |
| Format                    | `{{CMD_FORMAT}}`                 |
| Testes (unit)             | `{{CMD_TEST_UNIT}}`             |
| Testes (integração)       | `{{CMD_TEST_INTEGRATION}}`      |
| Testes (e2e)              | `{{CMD_TEST_E2E}}`              |
| Todos os testes           | `{{CMD_TEST_ALL}}`             |
| Coverage                  | `{{CMD_COVERAGE}}`             |
| Typecheck avulso          | `{{CMD_TYPECHECK}}`            |
| {{MIGRACOES — gerar}}     | `{{CMD_DB_GENERATE}}`         |
| {{MIGRACOES — aplicar}}   | `{{CMD_DB_MIGRATE}}`         |

- **URL local da app:** `{{URL_LOCAL}}` ({{VARIAVEL_DE_PORTA}})
- **Docs da API:** `{{ROTA_DOCS}}` · **rotas versionadas:** `{{PREFIXO_DE_ROTAS}}`
- **Branch base:** `{{BRANCH_BASE}}`
- **Banco:** {{COMO_SUBIR_O_BANCO_LOCAL}}

## Regras do projeto

> Estas são as regras inegociáveis. Ajuste valores (aspas, ponto e vírgula,
> `printWidth`, etc.) ao padrão real configurado no linter/formatter.

- **Idioma do código:** {{IDIOMA_CODIGO}} — variáveis, funções, classes, comentários
- **Idioma da documentação/comunicação:** {{IDIOMA_DOCS}} — PRDs, TechSpecs, tasks, reviews, mensagens de PR
- **Formatação ({{FORMATTER}}, não negociável):** {{REGRAS_DE_FORMATACAO}}. Rode `{{CMD_FORMAT}}`/`{{CMD_LINT}}` — não formate na mão
- **Tipagem estrita:** {{REGRA_DE_TIPAGEM — ex.: "sem `any`; prefira `unknown` + narrowing; strictNullChecks ligado"}}
- **Path aliases:** importe via {{ALIASES}} — não use caminhos relativos longos
- **Nomenclatura:** {{CONVENCOES_DE_NOMES_E_ARQUIVOS}}
- **Funções:** começam com verbo, ação única (CQS), sem flags booleanas de comportamento, early return
- **Sem números mágicos:** constantes nomeadas / enums
- **Commits/PRs:** Conventional Commits (`feat:`, `fix:`, `chore:`, `test:`, `refactor:`, `docs:` …)
- **Docs e comentários:** {{REGRA_SOBRE_REFERENCIAS_A_SPECS — ex.: "nunca referenciar conteúdo de specs/tasks de desenvolvimento em docs ou comentários de código"}}

### Regras de arquitetura

- {{REGRA_DE_ARQUITETURA_PRINCIPAL — ex.: "Usar skill X" ou descrição do estilo}}

## Estrutura de pastas (arquitetura-alvo)

> Descreva a estrutura-alvo para novas features. Ajuste a árvore ao seu projeto.

```
{{ARVORE_DE_PASTAS}}
```

## Skills do projeto (carregar conforme a tarefa)

> Liste apenas as skills realmente disponíveis no repositório. Apague esta seção
> inteira se o projeto não usa skills.

| Skill              | Acionar para…                       | Não usar se…              |
| ------------------ | ----------------------------------- | ------------------------- |
| **`{{SKILL_1}}`**  | {{QUANDO_USAR_1}}                   | {{QUANDO_NAO_USAR_1}}     |
| `{{SKILL_2}}`      | {{QUANDO_USAR_2}}                   | {{QUANDO_NAO_USAR_2}}     |

**Agentes (subagentes)** em {{CAMINHO_DOS_AGENTES}}:

- `{{AGENTE_1}}` — {{RESPONSABILIDADE_1}}
- `{{AGENTE_2}}` — {{RESPONSABILIDADE_2}}

## MCPs

> Liste os MCP servers usados e quando acioná-los. Apague se não houver.

- **{{MCP_1}}** — {{QUANDO_USAR_O_MCP}}

## Notas de testes

> Resuma o padrão de cada nível de teste e o gate antes de aprovar.

- **Unit (`{{CMD_TEST_UNIT}}`):** {{PADRAO_UNIT}}
- **Integração (`{{CMD_TEST_INTEGRATION}}`):** {{PADRAO_INTEGRATION}}
- **E2E (`{{CMD_TEST_E2E}}`):** {{PADRAO_E2E}}
- Antes de aprovar: {{COMANDOS_DE_GATE}}
