# Foco de QA — Frontend (E2E / a11y / visual)

Fluxo de QA específico da camada de **frontend**. É o caminho padrão da skill `execute-qa`: as Etapas 2–5 do `SKILL.md` se aplicam diretamente. Use o Playwright MCP (`browser_*`).

## Ferramentas (Playwright MCP)
- `browser_navigate` — acessar páginas.
- `browser_snapshot` — capturar o estado acessível (preferível para análise).
- `browser_click` / `browser_type` / `browser_fill_form` / `browser_select_option` / `browser_press_key` — interagir.
- `browser_take_screenshot` — evidências visuais (salve em `qa/`).
- `browser_console_messages` — erros de console.
- `browser_network_requests` — chamadas de API.

## O que validar
- **Fluxos funcionais (E2E):** para cada requisito do PRD, navegue, execute o fluxo, verifique o resultado, capture screenshot, marque PASSOU/FALHOU.
- **Acessibilidade (WCAG 2.2):** navegação por teclado, labels associados, `alt` em imagens, contraste, foco visível, mensagens de erro acessíveis.
- **Visual:** telas principais em estados vazio/carregando/erro/com dados; responsividade quando aplicável; aderência ao `DESIGN.md`.
- **Console e rede:** sem erros no console; chamadas de API com payloads/respostas esperados.

## Evidência
Screenshots em `./tasks/[NN]-[nome-da-feature]/qa/` (ex.: `bug-01.png`). Referencie no `bugs.md`/`qa.md`.
