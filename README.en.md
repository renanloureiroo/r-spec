![r-spec — Spec-Driven Development Skills](./assets/banner.png)

<!-- README-I18N:START -->

[Português](./README.md) | **English**

<!-- README-I18N:END -->

# r-spec — Spec-Driven Development Skills

A set of **process skills** for Spec-Driven Development. Each phase of the pipeline — from PRD to bugfix — is a portable skill, installable in any project and compatible with multiple harnesses (Claude Code, Codex, Cursor, etc.) via [`npx skills`](https://github.com/vercel-labs/skills).

The skills follow the [agentskills.io](https://agentskills.io) spec: each one is a folder with a `SKILL.md` (frontmatter `name` + `description` + procedure).

## Project setup (once): `r-init`

Before running the pipeline, use the **`r-init`** skill to prepare the project. It:

- detects the context (project type, stack, commands, harness) — and **asks** whatever it can't infer;
- creates the root `AGENTS.md` from the template, prefilled with what it found;
- creates the **review subagents** and the **convention-skill skeletons** with a **single source in `.agents/`** (Codex/Gemini/Antigravity read it directly; only Cursor gets a **symlink**);
- leaves explicit placeholders for what you need to **fill in** in each file, and guides the next steps.

`r-init` does the *scaffolding* — the convention content is written by you. Run it once per project; then follow the pipeline below.

## The pipeline

```
create-prd  →  create-techspec  →  create-tasks  →  execute-task  →  execute-review  →  execute-qa  →  execute-bugfix
  (what)          (how)             (the plan)      (implement)     (static review)    (E2E QA)       (fix)
```

| Skill             | Function                                                    | Output                                                  |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------------------- |
| `create-prd`      | Gathers requirements (asks questions before drafting)       | `tasks/<NN>-<feature>/prd.md`                           |
| `create-techspec` | Translates the PRD into architecture and technical decisions | `tasks/<NN>-<feature>/techspec.md`                      |
| `create-tasks`    | Breaks down into tasks with tests, approved before generating | `tasks/<NN>-<feature>/tasks.md` + `[num]_task.md`       |
| `execute-task`    | Implements the next pending task                            | code + tests, marks `tasks.md`                          |
| `execute-tasks`   | Orchestrates **all** pending tasks in waves via subagents (`task-executor` + `task-reviewer`) — alternative to the manual `execute-task` loop | code + tests per task, `[num]_task_review.md`, marks `tasks.md` |
| `execute-review`  | Code review via `git diff` against TechSpec/Tasks/rules     | `tasks/<NN>-<feature>/codereview.md`                    |
| `execute-qa`      | Functional QA: E2E (Playwright), a11y, visual               | `tasks/<NN>-<feature>/qa.md` + `bugs.md`                |
| `execute-bugfix`  | Fixes root cause of bugs + regression tests                 | `tasks/<NN>-<feature>/bugfix.md` + updated `bugs.md`    |

All phases work within the `tasks/<NN>-<feature>/` folder — each feature is self-contained (PRD, TechSpec, tasks, reports and bugs). It is recommended to version this folder alongside the code.

**QA ↔ bugfix contract:** `execute-qa` records defects in `bugs.md` in a **shared format** (`## BUG-NN` blocks with Severity, Steps, Current/Expected Result, Evidence, Status); `execute-bugfix` reads that same format and updates each entry (Root cause, Fix, Tests, `Status: Fixed`). Each skill ships with the template built in.

### Folder convention (`tasks/NN-feature/`)

Each feature lives in `tasks/<NN>-<slug>/`, where:

- `<NN>` is a **2-digit sequential counter** (`01`, `02`, …) **automatically generated** by `create-prd` — it reads existing folders in `tasks/` and uses the next available number.
- `<slug>` is the feature name in **kebab-case**.

Example: the first feature becomes `tasks/01-painel-clima/`; the next one, `tasks/02-checkout/`. Subsequent phases (`create-techspec` onward) **do not create a new counter** — they locate the existing folder by slug/highest `NN`. To renumber, just rename the folders.

## Installation

Run:

```bash
# Interactive menu: choose skills and harnesses
npx skills add https://github.com/renanloureiroo/r-spec

# List the repo's skills without installing
npx skills add https://github.com/renanloureiroo/r-spec --list

# Everything, no prompts (CI)
npx skills add https://github.com/renanloureiroo/r-spec --all -y

# Specific skills for specific harnesses
npx skills add https://github.com/renanloureiroo/r-spec --skill execute-qa -a claude-code -a cursor
```

`npx skills` mirrors each skill to the chosen harness format (`.claude/skills/`, `.agents/skills/`, `.cursor/rules/`, etc.) — no need to maintain manual copies. Use `--list` to see the available skills and `-g` to install in the user directory (global) instead of the project.

## How to use (manual flow)

Skills **do not chain automatically** — you drive the pipeline manually, **one phase at a time**, triggering the skill for the current step. This keeps you in control to review and approve each artifact before moving forward.

> **Step 0 (once per project):** run **`r-init`** to generate the `AGENTS.md`, the subagents, and the convention-skill skeletons (see [Project setup](#project-setup-once-r-init)). Then follow the per-feature order below.

Typical order for a new feature:

1. **`create-prd`** — generates `tasks/<NN>-<slug>/prd.md` (asks questions before drafting; creates the `NN` counter). _Tip:_ pass the **base requirements** in the initial prompt — the more context, the fewer questions the skill asks.
2. **`create-techspec`** — generates `techspec.md`.
3. **`create-tasks`** — generates `tasks.md` + tasks (approve the high-level list first).
4. **`execute-task`** — implements the next pending task. **Repeat** until all are done.
   - _Orchestrated alternative:_ **`execute-tasks`** runs **all** pending tasks at once — in waves (sequential or parallel depending on dependencies), with each task implemented by a `task-executor` subagent and reviewed by a `task-reviewer`, in an implement → review → fix cycle. Requires those subagents installed (see [Complementary subagents](#complementary-subagents-optional-claude-code)).
5. **`execute-review`** — consolidated feature review (generates `codereview.md`).
6. **`execute-qa`** — functional QA; generates `qa.md` and opens bugs in `bugs.md`.
7. **`execute-bugfix`** — fixes bugs from `bugs.md`; return to **`execute-qa`** to revalidate. Repeat the QA ↔ bugfix cycle until QA passes with no open bugs.

How to trigger depends on the harness — e.g.: in Claude Code, ask _"use the `create-prd` skill for feature X"_; in others, invoke the equivalent skill. **Do not skip steps:** each phase assumes the artifacts from the previous one in `tasks/<NN>-<slug>/`.

> 📖 **Full walkthrough:** see [`example/walkthrough.md`](example/walkthrough.md) — an end-to-end simulation with the prompt for each phase, the completion of each step, and the **context resets** between them.

## What to adjust per project

Most skills are generic, but some have a **"Per-project configuration"** block at the top of the `SKILL.md`. Edit it after installing:

- **`execute-qa`** _(the one that changes most)_ — app URL/port, command to start the environment, E2E tool, where to save evidence and report.
- **`execute-bugfix`** — project test and typecheck command.
- **`execute-review`** — test/coverage command, base branch, location of conventions.

Other points you may want to adapt:

- **Specs folder**: the default is `tasks/<NN>-<feature>/`. If your project uses another (`docs/specs/`, `.spec/`...), adjust the path references in the skills.
- **Language/templates**: PRD and TechSpec templates are in pt-BR — adapt to your team's conventions.
- **References to rules/skills**: `create-techspec`, `execute-task`, `execute-review`, and `execute-bugfix` consult the project conventions (rules + skills). They are **harness-agnostic** — the agent should look for them in two places: the **project root** (`AGENTS.md`, `CLAUDE.md`, where many rules live today) and in the **skills/rules folders** (`.agents/skills/`, `.claude/skills/`, `.claude/rules/`, `.cursor/rules/`, etc.).

## Complementary skills (code conventions)

These **process** skills do not define your project's code standards — that is up to **convention** skills, which vary from stack to stack. The `execute-*` phases consult them. Examples of what's worth installing/configuring separately:

- Code patterns (naming, CQS, function size)
- Language/runtime conventions (e.g.: TypeScript/Node, ESM)
- Framework conventions (e.g.: React, Express)
- Testing conventions (e.g.: Vitest, Playwright)
- Repository folder structure
- UI/UX and design system

Keep them in your harness's skills directory, alongside the r-spec skills. **Create at least one convention skill per layer** your project has (one frontend, one backend) — that is where your stack-specific standards live. See real examples in [`example/.agents/skills/`](example/.agents/skills/) (e.g.: `react-frontend-expert`).

### Frontend / backend: one generic skill, focus per layer

The phases that vary most across layers — **`execute-review`** and **`execute-qa`** — are **single and generic**, but adapt to the **project type** declared in `AGENTS.md` (`frontend`, `backend` or `fullstack`). Instead of duplicating the skill, each one loads the right **layer reference**:

- `execute-review` → `references/frontend.md` (UI, hooks, a11y, data fetching) or `references/backend.md` (API/HTTP, validation, errors, security).
- `execute-qa` → `references/frontend.md` (E2E/Playwright, a11y, visual) or `references/backend.md` (API contract/integration, **no browser**).
- In **fullstack** projects, both branches apply, segmented by what each change touches (`frontend/` vs `backend/`).

Just declare the **project type** in `AGENTS.md` — the skills pick the branch themselves.

## Complementary subagents (optional, Claude Code)

In addition to process skills, your project can define **subagents** for tasks that benefit from **isolated context**. The classic case is an **independent task reviewer**: an agent that did **not** implement the task reviews it in a clean context, without the implementor's self-review bias — catching what `execute-task` missed, before the consolidated review from `execute-review`.

Subagents are a **Claude Code-specific** feature (`.claude/agents/<name>.md`, with `name`/`description`/`model` frontmatter) — other harnesses may not have an equivalent, and `npx skills` does **not** install them. That is why they **are not part of the standard pipeline**: each project creates the ones it needs, as required.

There is a **generic** reviewer and two **layer-specialized** ones — pick based on the **project type** and the task's layer:

| Subagent | Use for… | Project type |
| -------- | -------- | ------------ |
| `frontend-reviewer` | **Frontend** tasks (UI/hooks/a11y) | `frontend` or `fullstack` |
| `backend-reviewer` | **Backend** tasks (API/HTTP/DB) | `backend` or `fullstack` |
| `task-reviewer` | Generic review (single layer, or no clear distinction) | any |

> 📎 **Ready-to-adapt examples:** [`example/.agents/agents/`](example/.agents/agents/) — `frontend-reviewer`, `backend-reviewer` and `task-reviewer` (the **source**; `example/.claude/agents/` are symlinks to it). Each reviews a `[num]_task.md`, validates against the project conventions and TechSpec, and writes `[num]_task_review.md` in the feature folder. Put the one(s) you need in the source `.agents/agents/` and mirror them via **symlink** into `.claude/agents/` (and `.cursor/agents/` if you use Cursor) — never copies; adjust to your stack/language/standards.

Where they fit in the flow (per **task**, between implementation and feature review) — in `fullstack` projects, pick the reviewer by the layer the task touched:

```
execute-task ──►  frontend-reviewer / backend-reviewer (subagent, isolated context)  ──►  execute-review
 implements        independent task review → [num]_task_review.md                          feature review → codereview.md
```

### Orchestrate the whole feature: `execute-tasks` + `task-executor`

The **`execute-tasks`** skill runs **all** the feature's pending tasks at once, coordinating subagents in **waves** (sequential, or parallel when dependencies and files allow). In addition to the reviewers above, it uses an **implementer** subagent — the **`task-executor`** — which implements each task and applies the review fixes; the orchestrator (the main loop) triages each review, asks the user which _minors_ to apply, and marks `tasks.md` after approval. Ready-to-adapt example in [`example/.agents/agents/task-executor.md`](example/.agents/agents/task-executor.md).

```
execute-tasks ──►  task-executor (implements)  ──►  task-reviewer (review)  ──►  ✓ marks tasks.md
 orchestrates in waves     ▲                                │
                           └────── fix cycle ◄──────────────┘
```

## Configure the project `AGENTS.md`

r-spec phases consult the **project conventions** (rules + which architecture/pattern skills to load), but do not define them. That map lives in `AGENTS.md` (at the **project root**) — natively read by Codex, Cursor and others, and referenceable by Claude Code via `CLAUDE.md`.

> 💡 The **`r-init`** skill automates this step (and more): it creates the `AGENTS.md` prefilled with the detected context, plus the subagents and convention-skill skeletons. See [Project setup](#project-setup-once-r-init). The manual step below still works if you prefer doing it by hand.

Copy the template and fill it in:

```bash
cp templates/AGENTS.md ./AGENTS.md   # at your project root
```

The template ([`templates/AGENTS.md`](templates/AGENTS.md)) is focused on **project references** (does not document the r-spec pipeline — that lives here in the README). It already comes with the sections:

- **Project type** — `frontend`, `backend` or `fullstack`; defines the branch that `execute-review`/`execute-qa` and the review subagents apply.
- **Stack** and **Commands** — for the agent to load the right skills and run tests/lint/typecheck.
- **Project rules** — code language, naming, limits, error/log patterns, etc.
- **Architecture and pattern skills** — "when to trigger / when not to use" table for each convention skill (fill in yours).
- **Review subagents** — map of which reviewer to use per layer (`frontend-reviewer`/`backend-reviewer`/`task-reviewer`).
- **MCPs** and, optionally, **plan persistence** and **E2E test notes**.

> If using Claude Code, add a line to `CLAUDE.md` pointing to `AGENTS.md` (e.g.: `Follow the conventions in @AGENTS.md`) to reuse the same map.

## Recommended MCPs

Some phases assume MCPs are available in the harness:

- **[Context7 MCP](https://github.com/upstash/context7)** — used by `create-techspec`, `execute-task`, and `execute-bugfix` to query up-to-date documentation for languages/frameworks/libs.
- **[Playwright MCP](https://github.com/microsoft/playwright-mcp)** (`browser_*`) — used by `execute-qa` and `execute-bugfix` for E2E, accessibility, and visual validation in the browser.

Configure them in your harness (e.g.: `.mcp.json` / Claude Code, Codex, or Cursor MCP config) before running the phases that depend on them.

## Repository structure

```
r-spec/
├── README.md
├── LICENSE
├── templates/
│   └── AGENTS.md                 # template to copy to your project root
├── example/
│   ├── .claude/agents/           # example subagents: frontend-reviewer, backend-reviewer, task-reviewer, task-executor
│   ├── .agents/skills/           # example convention skills (react-frontend-expert, etc.)
│   └── tasks/01-painel-clima/    # example feature (living reference)
└── skills/
    ├── r-init/                # SKILL.md + references/ (setup: AGENTS.md, subagents, convention skills)
    ├── create-prd/SKILL.md
    ├── create-techspec/SKILL.md
    ├── create-tasks/SKILL.md
    ├── execute-task/SKILL.md
    ├── execute-tasks/SKILL.md  # orchestrator (subagents in waves)
    ├── execute-review/         # SKILL.md + references/{frontend,backend}.md
    ├── execute-qa/             # SKILL.md + references/{frontend,backend}.md
    └── execute-bugfix/SKILL.md
```
