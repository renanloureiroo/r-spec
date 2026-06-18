<!--
  ESQUELETO de uma skill de CONVENÇÃO (não de processo).
  Copie este conteúdo para `<dir-skills>/<nome-da-skill>/SKILL.md` e preencha.

  Uma skill de convenção carrega o PADRÃO ESPECÍFICO da sua stack/camada (ex.: como
  escrever componentes React, como estruturar rotas Express, como nomear testes). As
  skills de PROCESSO do r-spec (create-*, execute-*) a consultam por fase, conforme o
  AGENTS.md. Crie ao menos uma por camada do projeto (frontend, backend, …).

  Ao preencher: apague estes comentários, troque [placeholders] e remova exemplos
  que não se aplicam. Mantenha o `description` rico em gatilhos ("acionar para…",
  "não usar se…") — é por ele que o agente decide carregar a skill.
-->
---
name: [nome-da-skill]            # kebab-case, ex.: react-frontend-conventions
description: [Uma frase do que a skill cobre + quando ACIONAR + quando NÃO usar. Ex.: "Padrões de componentes/hooks React+TS, data fetching e a11y. Acionar ao criar/alterar UI React. Não usar para backend ou testes."]
---

# [Título da Skill]

[1–2 frases: que camada/stack esta skill governa e qual é a filosofia geral.]

## Quando usar

- **Acionar para:** [lista de tarefas que disparam esta skill]
- **Não usar se:** [quando ignorar — outra camada, outra ferramenta]

## Convenções

<!-- O CORAÇÃO da skill. Liste regras CONCRETAS e verificáveis, com exemplos. -->

### Estrutura e organização
- [Onde os arquivos desta camada moram; como nomear; como dividir em pastas.]

### Padrões de código
- [Regras de nomenclatura, tamanho de função, tratamento de erro, tipagem — específicas desta camada.]

### [Tópico específico da camada]
- [ex.: hooks rules, validação de input, status codes, mocks de teste…]

## Exemplos

<!-- Mostre o "jeito certo" em código. Exemplos valem mais que regras abstratas. -->

```[linguagem]
// [exemplo mínimo e idiomático do padrão que você quer ver no projeto]
```

## Antipadrões (evite)

- ❌ [coisa que NÃO se deve fazer] → ✅ [o que fazer no lugar]

## Referências (opcional)

<!-- Para skills grandes, mova detalhes longos para references/ e aponte aqui. -->

- `references/[arquivo].md` — [o que contém, quando abrir].
