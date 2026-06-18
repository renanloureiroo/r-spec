# Foco de review — Frontend

Checklist de code review específico da camada de **frontend** (UI/React-like). Aplique na Etapa 7 da skill `execute-review`, **em conjunto** com as skills de convenção de frontend que o projeto declarou no `AGENTS.md`. Estes itens são um baseline — a convenção do projeto sempre prevalece.

## Componentes / UI
- [ ] Componentes funcionais com props tipadas (interface `{Componente}Props`); sem `any`.
- [ ] Composição e `children` em vez de prop drilling profundo.
- [ ] Componentes dentro do limite de tamanho do projeto — extrair sub-componentes/hooks quando crescem.
- [ ] HTML semântico (`<button>`, `<nav>`, `<main>`) em vez de `<div onClick>`.

## Hooks
- [ ] Rules of Hooks respeitadas (só no topo, só em componentes/hooks).
- [ ] Dependências corretas em `useEffect`/`useMemo`/`useCallback` (sem dependências faltando nem closures obsoletas).
- [ ] Hooks customizados (`useXxx`) bem isolados e reutilizáveis quando a lógica se repete.

## Estado e data fetching
- [ ] Segue o padrão do projeto (ex.: TanStack Query): chaves de query consistentes, `staleTime` definido, invalidação após mutações (sem `refetch()` manual).
- [ ] Todos os estados tratados: carregando (`isPending`), erro (`isError`) e dados.
- [ ] Sem objetos/arrays novos criados em render sem `useMemo` (evita re-renders).

## Formulários
- [ ] Validação na borda (ex.: Zod + resolver) com mensagens claras.
- [ ] Inputs com `<label>` associado (`htmlFor`/`id`) e estados de erro acessíveis.

## Acessibilidade (WCAG 2.x)
- [ ] Navegação por teclado (Tab/Enter/Escape) em todos os elementos interativos.
- [ ] `aria-*` apenas quando necessário; `role="alert"` para erros; `aria-live` para updates dinâmicos.
- [ ] Imagens com `alt` apropriado; contraste mínimo (4.5:1 texto normal).

## Aderência ao design
- [ ] Segue o `DESIGN.md`/design tokens do projeto, se houver (cores, tipografia, espaçamento).
- [ ] Estados visuais cobertos: vazio, carregando, erro, com dados.

## Performance de render
- [ ] Sem re-renders desnecessários; listas com `key` estável.
- [ ] Operações pesadas memorizadas; efeitos limpam timers/subscriptions no cleanup.
