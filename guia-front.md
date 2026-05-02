# Guia Frontend — Totem Purchase

Guia para desenvolvedores que entram no projeto. Cobre a estrutura do frontend React, como rodar localmente, como usar os agentes de IA configurados, e convenções do projeto.

---

## Pré-requisitos

- Node.js 18+
- npm 9+
- Python 3.11+ (para o backend)
- Git

---

## Como Rodar

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

API disponível em `http://localhost:8000`.  
Docs automáticas (Swagger): `http://localhost:8000/docs`.

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Interface disponível em `http://localhost:3000`.  
O Vite já faz proxy de `/api/*` → `localhost:8000`, então não há problema de CORS em dev.

---

## Estrutura do Frontend

```
frontend/
├── src/
│   ├── pages/
│   │   ├── MenuPage.tsx       # Tela principal: grade de produtos + filtro de categoria
│   │   ├── CartPage.tsx       # Revisão do pedido com controles de quantidade
│   │   └── PaymentPage.tsx    # Simulação de pagamento (cartão, PIX, dinheiro)
│   ├── components/
│   │   ├── ProductCard.tsx    # Card touch-friendly com botão de adicionar
│   │   └── CartItem.tsx       # Item do carrinho com controles +/−
│   ├── store/
│   │   └── cartStore.ts       # Estado global do carrinho (Zustand)
│   ├── services/
│   │   └── api.ts             # Chamadas HTTP ao backend (Axios)
│   ├── types/
│   │   └── index.ts           # Interfaces TypeScript: Produto, ItemCarrinho, Pedido
│   ├── App.tsx                # Roteamento (React Router)
│   ├── main.tsx               # Entry point React
│   └── index.css              # Tailwind base + reset para totem
├── index.html
├── package.json
├── vite.config.ts             # Proxy /api + porta 3000
├── tailwind.config.js
├── tsconfig.json
└── postcss.config.js
```

### Fluxo de navegação

```
/          →  MenuPage    (escolha de produtos)
/carrinho  →  CartPage    (revisão do pedido)
/pagamento →  PaymentPage (confirmação e pagamento)
```

---

## Stack e Bibliotecas

| Biblioteca | Versão | Uso |
|---|---|---|
| React | 18 | UI |
| TypeScript | 5 | Tipagem estrita |
| Vite | 5 | Build e dev server |
| Tailwind CSS | 3 | Estilização utility-first |
| Zustand | 4 | Estado global do carrinho |
| React Router | 6 | Navegação entre telas |
| Axios | 1.6 | Chamadas à API |

---

## Contexto de Design — Totem Físico

O frontend é projetado para uma tela touch vertical (~15", 1080×1920px típico). Isso impacta todas as decisões de UI:

- **Touch targets:** mínimo `56px` de altura/largura — o usuário usa o dedo
- **Texto:** mínimo `text-lg` (18px) para leitura a 60–80cm de distância
- **Sem hover states** que dependem de mouse — é toque, não cursor
- **Fluxo máximo:** 3 telas para completar o pedido (reduz abandono)
- **Feedback imediato:** `active:scale-95 transition-transform` em todos os botões
- **Cor primária:** `orange-500` (`#f97316`) — padrão do mercado food service

---

## Convenções de Código

- **TypeScript strict** — sem `any`, sem `!` não-justificado
- Componentes funcionais React com hooks — sem class components
- Estado global somente no Zustand (`cartStore`); estado local com `useState`
- Chamadas HTTP somente em `services/api.ts`, nunca direto no componente
- Erros da API tratados no `catch` dentro do `useEffect` da page, não dentro dos services
- Imports: externos primeiro → internos → tipos
- Nomes em inglês no código, conteúdo em português

---

## Adicionando um Novo Produto

Atualmente os produtos vêm do backend (`GET /produtos`). O `MenuPage` faz fallback para `MOCK_PRODUTOS` se a API estiver offline.

Para adicionar um produto com categoria nova:
1. Adicione a categoria em `types/index.ts` na união de `Produto.categoria`
2. Adicione o emoji em `ProductCard.tsx` no objeto `EMOJI`
3. Adicione a categoria em `CATEGORIAS` no `MenuPage.tsx`

---

## Agentes de IA Configurados (Claude Code)

O projeto tem dois agentes configurados em `.claude/commands/`. Para usá-los, abra o Claude Code no terminal ou VSCode e use os comandos de barra:

### `/ux` — Especialista em UI/UX para Totens

```
/ux Preciso melhorar o feedback visual ao adicionar um produto
```

Conhecimento do agente: padrões de totem (McDonald's, Burger King, KFC), psicologia de compra em self-service, touch targets, hierarquia visual para food service.

### `/dev` — Desenvolvedor Full-Stack FastAPI + React

```
/dev Adicionar campo de categoria no modelo Produto do backend
```

Conhecimento do agente: toda a arquitetura do projeto, convenções de código, roadmap de fases, como conectar frontend ao backend.

**Dica de uso:** prefira os agentes especializados ao invés do chat geral para tarefas de código — eles já têm todo o contexto do projeto e são instruídos a ser concisos.

---

## .gitignore — O que é ignorado

Arquivos sensíveis ou gerados automaticamente que **não** vão para o repositório:

```
__pycache__/          # Cache Python
node_modules/         # Dependências Node
dist/                 # Build do frontend
.env / .env.local     # Variáveis de ambiente
.claude/settings.local.json   # Configurações locais do Claude Code
.claude/todos.json            # Sessão de tarefas do Claude Code
```

Os arquivos `.claude/settings.json`, `.claude/commands/` e `CLAUDE.md` **são** versionados — são configurações de projeto compartilhadas.

---

## CLAUDE.md

O arquivo `CLAUDE.md` na raiz do projeto é lido automaticamente pelo Claude Code em toda sessão. Ele contém:

- Estrutura de pastas explicada
- Como rodar backend e frontend
- Tabela de endpoints da API
- Roadmap de fases (estado atual do projeto)
- Convenções de código e design

Mantenha-o atualizado ao adicionar novos endpoints, mudar a estrutura ou avançar de fase.

---

## Permissões Automáticas (settings.json)

O arquivo `.claude/settings.json` pré-aprova comandos comuns para evitar interrupções durante o desenvolvimento:

- `npm install`, `npm run dev`, `npm run build`
- `uvicorn` (servidor de dev Python)
- `pip install`
- Leitura e edição de qualquer arquivo do projeto

Comandos destrutivos (`rm -rf`, `git push --force`) permanecem bloqueados.

---

## Roadmap — Fases do Projeto

| Fase | Status | Descrição |
|---|---|---|
| 1 — Core | ✅ | Carrinho, múltiplos itens, pedido estruturado |
| 2 — Experiência | 🚧 | Categorias, upsell/downsell, combos |
| 3 — Usuário | ⏳ | CPF opcional, histórico de pedidos |
| 4 — Dados | ⏳ | PostgreSQL, analytics, pipeline |
| 5 — Pagamento | ⏳ | Integração real (Stone / PagSeguro / Stripe) |
| 6 — Frontend Totem | 🚧 | Interface React touch — em andamento |
| 7 — IA | ⏳ | Recomendação por comportamento |

Ao implementar novas funcionalidades, respeite a ordem das fases — não pule etapas.
