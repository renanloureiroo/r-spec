# Especificação técnica

## Resumo executivo

O Painel de Clima é um componente React na home que consome um BFF em Express. O BFF encapsula a chamada à API pública Open-Meteo (busca de cidade + clima), evitando expor detalhes ao cliente e centralizando o tratamento de erro. Abordagem incremental: primeiro o endpoint de busca, depois o de clima, por fim a UI.

## Arquitetura do sistema

### Visão dos componentes

- `WeatherPanel` (React) — orquestra busca e exibição.
- `CitySearch` (React) — input com autocompletar.
- `weatherController` / `weatherService` (Express) — BFF para Open-Meteo.
- Fluxo: `CitySearch` → `GET /api/v1/cities/search` → seleção → `GET /api/v1/weather` → `WeatherPanel`.

## Design de implementação

### Principais interfaces

```ts
interface WeatherService {
  searchCities(query: string): Promise<City[]>;
  getWeather(cityId: string): Promise<CurrentWeather>;
}
```

### Modelos de dados

- `City { id: string; name: string; country: string }`
- `CurrentWeather { temperatureC: number; condition: string; city: string }`

### Endpoints da API

- `GET /api/v1/cities/search?q=` → `City[]`
- `GET /api/v1/weather?cityId=` → `CurrentWeather`

## Pontos de integração

- Open-Meteo (geocoding + forecast), server-side. Timeout 1s, fallback com erro tratado.

## Abordagem de testes

### Testes unitários

- `weatherService`: mapeamento de resposta e tratamento de erro (mock de fetch).

### Testes de integração

- Endpoints do BFF com Open-Meteo mockado.

### Testes E2E

- Buscar cidade e ver o card de clima usando a ferramenta de E2E do projeto (ex.: Playwright).

## Sequenciamento do desenvolvimento

1. Endpoint de busca de cidades (base de tudo).
2. Endpoint de clima (depende do id da cidade).
3. UI `CitySearch` + `WeatherPanel`.
4. E2E integrando as camadas.

## Considerações técnicas

### Principais decisões

- BFF em vez de chamar Open-Meteo do browser: não expor a integração e padronizar erros.

### Riscos conhecidos

- Limites de rate da API pública — mitigar com debounce na busca.
