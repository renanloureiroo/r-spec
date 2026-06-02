# Documento de Requisitos do Produto (PRD)

## Visão Geral

O Painel de Clima permite que um visitante consulte a previsão do tempo atual de uma cidade buscando pelo nome. Resolve a dor de não ter, no produto, uma forma rápida de ver condições climáticas sem sair para um site externo. É valioso por aumentar o tempo de permanência e a utilidade percebida da página inicial.

## Objetivos

- Sucesso = visitante consegue ver a temperatura atual de uma cidade em até 3 segundos.
- Métrica: taxa de buscas com resultado exibido ≥ 95%.
- Meta de negócio: +10% de engajamento na home.

## Histórias de Usuário

- Como visitante, quero buscar uma cidade pelo nome para ver a temperatura atual.
- Como visitante, quero ver uma mensagem clara quando a cidade não for encontrada.
- Como visitante em mobile, quero usar o painel confortavelmente em telas pequenas.

## Principais funcionalidades

1. Campo de busca de cidade com autocompletar (lista de cidades correspondentes).
2. Exibição do clima atual: temperatura, condição e cidade selecionada.
3. Estados de vazio, carregando e erro.

## Experiência do usuário

- Fluxo: digitar cidade → escolher na lista → ver o card de clima.
- Acessível por teclado; resultados anunciados a leitores de tela.

## Restrições técnicas de alto nível

- Consumir uma API pública de clima (sem chave sensível exposta no frontend).
- Latência alvo ≤ 1s para a resposta de clima.

## Fora do escopo

- Previsão de vários dias.
- Geolocalização automática.
- Favoritar cidades.
