# Totem Purchase — CLAUDE.md

## Visão Geral
Sistema de autoatendimento (totem) para pedidos em restaurantes/lanchonetes.
Stack: Python FastAPI (backend) + React + TypeScript + Tailwind (frontend).

## Estrutura do Projeto
```
totempurchase/
├── backend/                      # FastAPI API REST
│   ├── main.py                   # Entry point
│   └── app/
│       ├── database/memory.py    # Dados em memória (Fase 1 — substituir por PostgreSQL na Fase 4)
│       ├── models/produto.py     # Pydantic schemas
│       └── routes/               # produtos.py | carrinho.py | pedidos.py
└── frontend/                     # React + Vite + Tailwind
    └── src/
        ├── pages/                # MenuPage | CartPage | PaymentPage
        ├── components/           # ProductCard | CartItem
        ├── store/cartStore.ts    # Estado global (Zustand)
        ├── services/api.ts       # Chamadas HTTP (Axios → /api proxy)
        └── types/index.ts        # Interfaces TypeScript
```

## Como Executar

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev     # http://localhost:3000
```

## APIs Disponíveis
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /produtos | Lista produtos |
| POST | /carrinho/{id} | Adiciona ao carrinho |
| GET | /carrinho | Lista carrinho |
| GET | /carrinho/total | Total do carrinho |
| DELETE | /carrinho/{id} | Remove item |
| DELETE | /carrinho | Limpa carrinho |
| POST | /pedido | Finaliza pedido |

## Roadmap — Fase Atual
- **Fase 1** ✅ Core: carrinho, múltiplos itens, pedido estruturado
- **Fase 2** 🚧 Experiência: categorias, upsell/downsell, combos
- **Fase 3** ⏳ Usuário: CPF opcional, histórico de pedidos
- **Fase 4** ⏳ Dados: PostgreSQL, analytics, pipeline
- **Fase 5** ⏳ Pagamento real (Stone/PagSeguro/Stripe)
- **Fase 6** 🚧 Frontend totem React (em andamento)
- **Fase 7** ⏳ IA: recomendação por comportamento

## Convenções de Código
- Backend: snake_case, português para nomes de domínio, inglês para código
- Frontend: PascalCase componentes, camelCase funções/vars, TypeScript strict (sem `any`)
- Tailwind: botões mínimo `min-h-[56px]`, texto mínimo `text-lg` para totem
- Commits em português, imperativo ("Adiciona", "Corrige", "Refatora")
- Sem comentários óbvios — nomes autoexplicativos

## Contexto de Design (Totem Físico)
- Tela touch vertical ~15", resolução 1080x1920 típica
- Usuário em pé, distância ~60-80cm da tela
- Fluxo máximo: Menu → Carrinho → Pagamento (3 telas)
- Cor primária: laranja `#f97316` (orange-500 Tailwind)
- Touch targets: mínimo 56px, ideal 80px+
- Sem hover states — é touch, não mouse
- Tempo alvo por pedido: 60-90 segundos

## Agentes Disponíveis
- `/ux` — Especialista em UI/UX para totens e food service
- `/dev` — Desenvolvedor full-stack FastAPI + React
