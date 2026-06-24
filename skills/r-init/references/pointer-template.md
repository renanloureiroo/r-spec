<!--
  Template MÍNIMO de ponteiro por harness.
  O AGENTS.md (na raiz) é a fonte única das convenções, lido nativamente por Cursor,
  Codex e Gemini/Antigravity; o Claude Code o alcança por este ponteiro. Crie um
  ponteiro só para o(s) harness(es) que você usa e que leem um arquivo próprio:
    - Claude Code → CLAUDE.md
    - Gemini / Antigravity → GEMINI.md

  Este ponteiro cobre apenas as CONVENÇÕES (aponta para @AGENTS.md). Ele NÃO instala
  subagents nem skills de convenção — esses vêm por symlink (Claude Code: `.claude/agents/`
  e `.claude/skills/`; Cursor: `.cursor/agents/` e `.cursor/rules/`), nas Etapas 5 e 6.

  Salve com o nome do harness alvo. Mantenha curto: NÃO duplique regras — elas vivem
  no AGENTS.md. Se o arquivo já existir, apenas ANEXE a linha do "Siga…" abaixo.
-->

# [GEMINI.md | CLAUDE.md]

Siga as convenções do projeto em @AGENTS.md — tipo de projeto, stack, comandos, regras, skills de convenção e subagents de review.

<!--
  Opcional: abaixo, apenas o que for ESPECÍFICO deste harness e não couber no
  AGENTS.md. Regras de código, stack e comandos ficam no AGENTS.md, compartilhados.
-->
