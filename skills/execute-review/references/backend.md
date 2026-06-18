# Foco de review — Backend

Checklist de code review específico da camada de **backend** (API/serviço HTTP). Aplique na Etapa 7 da skill `execute-review`, **em conjunto** com as skills de convenção de backend que o projeto declarou no `AGENTS.md`. Estes itens são um baseline — a convenção do projeto sempre prevalece.

## Rotas / HTTP
- [ ] Verbos e status codes corretos: `200` (GET/PUT), `201` (POST), `204` (DELETE), `400`, `401`, `403`, `404`, `500`.
- [ ] Contrato de resposta consistente (shape padronizado de sucesso e de erro).
- [ ] Versionamento/rota conforme a TechSpec/OpenAPI, quando aplicável.

## Validação de entrada
- [ ] Entrada validada na borda (ex.: Zod/express-validator) **antes** de chegar à regra de negócio.
- [ ] Tipos explícitos em payloads; sem `any` (use `unknown` + narrowing).

## Tratamento de erro
- [ ] Erros centralizados (error handler / `next(error)`), sem `try/catch` repetido e silencioso.
- [ ] Não vaza `stack`/detalhes internos em produção.
- [ ] Classes de erro com `statusCode` conforme o padrão do projeto.

## Arquitetura / camadas
- [ ] Separação controller → service → repository (ou a declarada na TechSpec); regra de negócio **fora** do controller.
- [ ] Command/query separados; funções com ação única, começando com verbo, dentro dos limites de tamanho.
- [ ] Sem números/strings mágicos — constantes nomeadas.

## Segurança
- [ ] Sem SQL/NoSQL injection (queries parametrizadas).
- [ ] Secrets fora do código (env vars); nada hardcoded.
- [ ] CORS e security headers adequados (sem `*` em produção); authn/authz onde exigido.

## Dados / integração
- [ ] Transações e erros de DB tratados; conexões/pool usados corretamente.
- [ ] Sem N+1 óbvio; paginação/limites em listagens.

## Observabilidade
- [ ] Logging conforme o padrão do projeto — fluxo rastreável em cada branch relevante.
- [ ] Health checks/contratos de monitoramento preservados, se existirem.

## Testes
- [ ] Testes de integração da API (ex.: Supertest) cobrindo caminhos felizes e de erro.
- [ ] Testes significativos (não apenas para cobertura).
