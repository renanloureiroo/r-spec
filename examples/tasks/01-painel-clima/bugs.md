# Bugs - Painel de Clima

## BUG-01: Card de clima não mostra mensagem quando a cidade não é encontrada

- **Severidade:** Média
- **Componente:** `WeatherPanel` (frontend)
- **Passos para reproduzir:**
  1. Buscar por "Xyzabc"
  2. Selecionar (lista vazia) / pressionar Enter
- **Resultado atual:** Card fica em branco, sem feedback.
- **Resultado esperado:** Exibir "Cidade não encontrada".
- **Evidência:** `qa/bug-01.png`
- **Causa raiz:** Estado de erro não tratado quando `cities` retorna vazio.
- **Correção aplicada:** Adicionado estado de erro e mensagem no `WeatherPanel`.
- **Testes de regressão:** `WeatherPanel.test.tsx` (cidade inexistente) + E2E de busca sem resultado.
- **Status:** Corrigido

## BUG-02: Busca dispara requisição a cada tecla (sem debounce)

- **Severidade:** Baixa
- **Componente:** `CitySearch` (frontend)
- **Passos para reproduzir:**
  1. Digitar "são paulo" rapidamente
  2. Observar a aba Network
- **Resultado atual:** Uma requisição por caractere.
- **Resultado esperado:** Requisição agrupada após ~300ms de pausa.
- **Evidência:** `qa/bug-02.png`
- **Status:** Aberto
