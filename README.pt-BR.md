<div align="center">
  <img src="public/og-image.png" alt="Quasar Dashboard PRO" width="900" />

# Quasar Dashboard PRO

**Um template de dashboard administrativo gratuito e open source, feito com Vue 3, Quasar 2 e TypeScript.**
Uma UI polida e pronta para negócios, que você pode usar direto em um produto real — não é mais um starter kit vazio.

**[🔗 Demo ao vivo](https://quasar-dashboard-pro.netlify.app)**

[![License: Apache 2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vuedotjs&logoColor=white)
![Quasar 2](https://img.shields.io/badge/Quasar-2.x-1976D2?logo=quasar&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

🇺🇸 [Read in English](./README.md) · 🇧🇷 Português (este arquivo)
</div>

---

## Por que este template

A maioria dos dashboards gratuitos é uma pilha de telas de demonstração sem relação entre si. O Quasar Dashboard PRO é organizado em **módulos de negócio prontos para uso** — Finance, CRM, E-Commerce, Fleet Tracking, Support, Security Ops — cada um com fluxos reais e conectados (não apenas telas isoladas), para você remover o que não precisa e lançar o resto.

- **Módulos de negócio, não telas soltas** — Finance, CRM, E-Commerce, Fleet Tracking, Support e Security Ops, cada um em uma pasta autocontida e fácil de copiar.
- **Fluxos de UI reais** — um funil de checkout completo, um kanban com drag de negociações, uma caixa de entrada com painel de leitura, um mapa ao vivo com rastreamento animado de veículos, uma caixa de chat ao vivo com roteamento de conversas, um mapa mundial de ameaças — não apenas tabelas estáticas.
- **Páginas utilitárias comuns incluídas** — exemplo de CRUD, gerenciador de arquivos, fatura, FAQ, formulário de contato — para você não precisar construir do zero as páginas "chatas mas necessárias".
- **Stack moderna, feita certo** — Vue 3 `<script setup>`, Quasar 2, TypeScript em tudo, Pinia, Vite. Sem Options API, sem resquícios de JavaScript puro.
- **Um design system, não só componentes** — uma cor de destaque, um raio de borda, um padrão de diálogo de detalhes, aplicados de forma consistente em todos os módulos.
- **Dark mode** que realmente parece finalizado, não uma inversão de cores feita às pressas.
- **100% gratuito, licenciado sob Apache-2.0** — use em projetos pessoais ou comerciais, sem necessidade de atribuição.

## Funcionalidades

- Estrutura de dashboard responsiva: sidebar agrupada e recolhível, header com alternância de dark mode, notificações e menu de conta
- O dashboard fica aberto por padrão — sem login obrigatório. Um fluxo de autenticação de demonstração (sessão persistida, proteção de rotas) está incluído e é fácil de reativar, em `/login`
- Gráficos (ApexCharts) ajustados para ficarem corretos tanto no modo claro quanto no escuro
- Um padrão compartilhado de `RecordDetailDialog`, para que toda lista/tabela do app abra detalhes da mesma forma
- Diagramas animados com Vue Flow espalhados pelos módulos, cada um com uma aparência própria — um pipeline de observabilidade em tempo real, um diagrama ramificado de fluxo de dinheiro, um funil de conversão afunilando, um rastreador de status de entrega, um diagrama radial de roteamento de conversas, uma linha do tempo de resposta a ameaças em formato de "V" — além de um efeito de "radar" pulsante nos marcadores do mapa ao vivo
- Um calendário no estilo Google Calendar (visões Day/Week, criação de evento por clique, cores por evento), feito com [QCalendar](https://qcalendar.netlify.app)
- Mapa com Leaflet, marcadores customizados e zonas de risco geolocalizadas — sem necessidade de chave de API
- Um exemplo genérico de CRUD (busca, diálogo de criar/editar, exclusão em lote com confirmação) para copiar e usar nas suas próprias entidades
- Totalmente tipado do início ao fim, com ESLint + Prettier configurados de forma estrita

## Módulos incluídos

| Módulo             | Rotas          | O que tem dentro                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Finance**        | `/finance/*`   | Overview (cards de moeda com sparklines, gráfico de receitas/despesas, distribuição de orçamento, medidor de score de crédito), Transactions (tabela completa de histórico), Accounts                                                                                                                                                                                                                                                                     |
| **CRM**            | `/crm/*`       | Overview (gráfico de pipeline por estágio, estatísticas de leads, próximas atividades), Leads (tabela completa), Deals (kanban por estágio, gráfico de valor de pipeline por owner), Mail (caixa de entrada com pastas, painel de leitura e composição), Calendar (agenda Day/Week no estilo Google Calendar)                                                                                                                                             |
| **E-Commerce**     | `/ecommerce/*` | Fluxo completo de produto até pedido: Products (grid com busca/filtro/ordenação) → detalhe do produto (galeria, quantidade, wishlist, produtos relacionados) → Shopping Cart → Checkout (stepper de envio/pagamento/revisão) → recibo de Order Summary, além de Order History com stepper de status de entrega                                                                                                                                            |
| **Fleet Tracking** | `/fleet/*`     | Live Map (marcadores animados de veículos, zonas de risco geolocalizadas, pipeline de observabilidade animado), Vehicles (tabela de status/combustível/motorista), Trip History (replay de rota com linha do tempo de paradas), Alerts & Maintenance (feed de alertas filtrável por severidade)                                                                                                                                                           |
| **Support**        | `/support/*`   | Overview (estatísticas de conversas/CSAT, diagrama animado radial de roteamento de conversas, gráfico de tickets por canal), Inbox (chat ao vivo com lista de conversas, balões de mensagem e campo de resposta), Tickets (tabela completa de tickets de suporte)                                                                                                                                                                                         |
| **Security Ops**   | `/security/*`  | Overview (estatísticas de ameaças, linha do tempo animada de resposta a ameaças em "V", gráfico de incidentes por severidade), Incidents (tabela completa de incidentes com origem/alvo/severidade), Threat Map (mapa mundial das origens de ataque com marcadores pulsantes por severidade)                                                                                                                                                              |
| **Pages**          | `/pages/*`     | Páginas utilitárias comuns: Auth (link para a tela de login de demonstração em `/login`), Crud (tabela pesquisável com diálogo de criar/editar e exclusão em lote), File Manager (árvore de pastas, medidor de uso de armazenamento, visões de favoritos/compartilhados/lixeira), Invoice (documento de fatura imprimível), FAQ (acordeão pesquisável e categorizado), Contact Us (formulário + informações de contato), Empty (template de estado vazio) |

Além do "núcleo" compartilhado: autenticação (login de demonstração, proteção de rotas, sessão persistida), a estrutura do dashboard e as stores Pinia.

Mais segmentos e páginas serão adicionados com o tempo — contribuições são bem-vindas.

## Stack técnica

- [Vue 3](https://vuejs.org) (Composition API, `<script setup>`)
- [Quasar 2](https://quasar.dev) com o CLI baseado em Vite (`@quasar/app-vite`)
- [TypeScript](https://www.typescriptlang.org)
- [Pinia](https://pinia.vuejs.org) para gerenciamento de estado
- [Vue Router](https://router.vuejs.org) (modo history) com guarda de navegação para rotas autenticadas
- [ApexCharts](https://apexcharts.com) para os gráficos do dashboard
- [Leaflet](https://leafletjs.com) + [@vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) para os mapas do Fleet Tracking e do Security Ops
- [Vue Flow](https://vueflow.dev) para o pipeline de observabilidade animado
- [QCalendar](https://qcalendar.netlify.app) (`@quasar/quasar-ui-qcalendar`) para a agenda Day/Week do módulo CRM
- [Material Symbols Outlined](https://fonts.google.com/icons) para os ícones (remapeados globalmente em [`src/boot/icon-map.ts`](./src/boot/icon-map.ts), sem necessidade de alterar cada componente)
- [Inter](https://rsms.me/inter/) (hospedada localmente via `@fontsource-variable/inter`) como fonte padrão
- ESLint (flat config) + Prettier

## Arquitetura: módulos por segmento de negócio

Em vez de um dashboard genérico único, as páginas são organizadas **por segmento de negócio** em `src/modules/<segmento>/`, cada um autocontido (`pages/`, `components/`, `data/`, `routes.ts`, `nav.ts`). Registrar um módulo são duas linhas em [`src/modules/index.ts`](./src/modules/index.ts) — assim um módulo pode ser copiado para outro projeto sem arrastar o resto da aplicação junto.

Cada módulo contribui com seu próprio grupo rotulado na sidebar (ex.: **Finance** → Overview / Transactions / Accounts), o mesmo padrão de "seção + subpáginas" usado pela maioria dos templates de dashboard administrativo.

## Convenções de UI

- **Clique em linha/card → diálogo de detalhes.** Toda lista ou tabela de registros (transações, leads, veículos...) abre um diálogo com os detalhes daquele registro ao ser clicada, através do componente compartilhado [`src/components/RecordDetailDialog.vue`](./src/components/RecordDetailDialog.vue) — basta passar `title`, `subtitle`/avatar opcionais e um array `fields: {label, value, color?}[]`. Novas listas devem seguir o mesmo padrão em vez de criar um diálogo específico.
- **Tudo arredondado.** Cards, botões e diálogos compartilham um único raio de borda (`$generic-border-radius` / `$button-border-radius`, ambos 12px, em [`quasar.variables.scss`](./src/css/quasar.variables.scss)) — não sobrescreva o raio por componente, altere o token.

## Como começar

Requer Node.js `^22.12 || ^24 || >=26` e [pnpm](https://pnpm.io).

```bash
pnpm install
```

### Servidor de desenvolvimento

```bash
pnpm dev
```

### Lint & formatação

```bash
pnpm lint        # corrige os problemas
pnpm lint:check  # apenas verifica
```

### Verificação de tipos

```bash
pnpm typecheck
```

### Build de produção

```bash
pnpm build
```

A configuração fica em [`quasar.config.ts`](./quasar.config.ts) — veja a [documentação do Quasar CLI](https://v2.quasar.dev/quasar-cli-vite/quasar-config-file).

### Deploy (Netlify)

O roteador roda em [modo history](https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#framework-vuerouter-mode) (sem `#` na URL), então dar F5 em uma rota profunda como `/fleet/vehicles` exige que o host caia de volta para o `index.html` em vez de retornar 404. Este repositório já vem com essa configuração para o Netlify:

- [`netlify.toml`](./netlify.toml) — comando de build, diretório de publicação (`dist/spa`) e a regra de redirect da SPA, usado quando você conecta o repositório diretamente ao Netlify
- [`public/_redirects`](./public/_redirects) — a mesma regra de fallback, copiada para dentro do build, usada caso você faça o deploy de `dist/spa` por drag-and-drop ou por outra CI

Vai fazer o deploy em outro host estático (Vercel, Cloudflare Pages, S3, etc.)? Procure pela configuração equivalente de "SPA fallback" / reescrever tudo para `index.html`.

### Depois do deploy: pontas soltas de SEO

Este repositório já vem com o básico de SEO configurado — tags Open Graph/Twitter (incluindo uma imagem de banner em [`public/og-image.png`](./public/og-image.png)), `<meta name="description">`/`keywords`, `robots.txt` e `sitemap.xml`, atualmente apontando para o domínio da demo ao vivo (`quasar-dashboard-pro.netlify.app`). Se você fizer um fork e deployar em outro lugar, algumas coisas são específicas de domínio e precisam ser trocadas pelo **seu** domínio:

- [`index.html`](./index.html) — `og:url`, `<link rel="canonical">`, e as URLs de `og:image`/`twitter:image`.
- [`public/sitemap.xml`](./public/sitemap.xml) — todo `<loc>` (o protocolo de sitemap exige URLs absolutas, então não dá pra deixar relativo).
- Troque [`public/og-image.png`](./public/og-image.png) pelo seu próprio banner caso troque a marca do template.
- No GitHub, configure os **Topics** do repositório (`quasar`, `vue3`, `admin-dashboard`, `dashboard-template`, ...) e uma **imagem de social preview** (Settings → General) — isso pesa mais na descoberta do template no GitHub/Google do que qualquer meta tag.

## Desenvolvimento assistido por IA (MCP)

Este repositório já vem com uma configuração de [servidor MCP do Quasar](https://quasar.dev/start/ai-agents#setup) para agentes de IA (Claude Code, VS Code, etc.) em [`.mcp.json`](./.mcp.json) / [`.vscode/mcp.json`](./.vscode/mcp.json). Isso dá ao agente acesso offline à documentação e às APIs de componentes do Quasar exatamente nas versões instaladas em `node_modules` — sem configuração extra, é detectado automaticamente ao abrir o projeto.

## Contribuindo

Issues e PRs são bem-vindos. Este é um template comunitário — o objetivo é mantê-lo alinhado com as melhores práticas atuais de Vue/Quasar, não acumular funcionalidades pontuais.

## Licença

Distribuído sob a [Apache License 2.0](./LICENSE) — gratuito para uso pessoal e comercial, sem necessidade de atribuição.
