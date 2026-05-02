import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { produtosApi } from '../services/api'
import { useCartStore } from '../store/cartStore'
import { useTheme } from '../theme/ThemeProvider'
import type { Produto } from '../types'

const MOCK_PRODUTOS: Produto[] = [
  { id: 1, nome: 'Hamburguer Clássico', preco: 20, categoria: 'lanche', descricao: 'Carne 180g, alface, tomate' },
  { id: 2, nome: 'Batata Frita', preco: 10, categoria: 'extra', descricao: 'Porção média, crocante' },
  { id: 3, nome: 'Refrigerante', preco: 8, categoria: 'bebida', descricao: 'Lata 350ml' },
  { id: 4, nome: 'Sorvete', preco: 12, categoria: 'sobremesa', descricao: '2 bolas, sabores variados' },
  { id: 5, nome: 'Suco Natural', preco: 10, categoria: 'bebida', descricao: 'Laranja ou limão 300ml' },
  { id: 6, nome: 'Onion Rings', preco: 11, categoria: 'extra', descricao: 'Anéis empanados crocantes' },
]

const CATEGORIAS = [
  { value: 'todos', label: 'Todos' },
  { value: 'lanche', label: '🍔 Lanches' },
  { value: 'bebida', label: '🥤 Bebidas' },
  { value: 'sobremesa', label: '🍨 Sobremesas' },
  { value: 'extra', label: '🍟 Extras' },
] as const

type CategoriaValue = (typeof CATEGORIAS)[number]['value']

export default function MenuPage() {
  const [produtos, setProdutos] = useState<Produto[]>(MOCK_PRODUTOS)
  const [categoria, setCategoria] = useState<CategoriaValue>('todos')
  const navigate = useNavigate()
  const totalItems = useCartStore((s) => s.totalItems())
  const total = useCartStore((s) => s.total())
  const sessionId = useCartStore((s) => s.sessionId)
  const { brandName, logoUrl, mode, toggleMode } = useTheme()

  const displayId = sessionId.slice(-4).toUpperCase()

  useEffect(() => {
    produtosApi.listar().then((r) => setProdutos(r.data)).catch(() => {})
  }, [])

  const filtrados =
    categoria === 'todos' ? produtos : produtos.filter((p) => p.categoria === categoria)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm px-5 pt-6 pb-4 border-b border-slate-200 dark:border-zinc-800/60">
        <div className="flex items-center justify-between mb-5">
          {/* Brand */}
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt={brandName} className="w-10 h-10 rounded-xl object-cover" />
            ) : (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg"
                style={{ background: 'var(--brand-primary)' }}
              >
                {brandName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 tracking-[0.18em] uppercase font-medium">
                Bem-vindo
              </p>
              <h1 className="text-lg font-bold text-slate-800 dark:text-zinc-100 leading-tight">
                {brandName}
              </h1>
            </div>
          </div>

          {/* Right: toggle + session */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMode}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-base active:scale-90 transition-transform"
              aria-label="Alternar modo claro/escuro"
            >
              {mode === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 dark:text-zinc-600 tracking-[0.15em] uppercase">
                Pedido
              </p>
              <p className="text-sm font-mono text-slate-400 dark:text-zinc-500">#{displayId}</p>
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 -mx-1 px-1">
          {CATEGORIAS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setCategoria(value)}
              className={`flex-none px-4 py-2.5 rounded-full text-sm font-medium min-h-[44px] transition-all active:scale-95 whitespace-nowrap ${
                categoria === value
                  ? 'text-white'
                  : 'bg-slate-100 dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800'
              }`}
              style={categoria === value ? { background: 'var(--brand-primary)' } : {}}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Product grid — 2 cols mobile, 3 cols tablet+ */}
      <main className="flex-1 p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 content-start pb-36">
        {filtrados.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </main>

      {/* Cart CTA */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-50 dark:from-zinc-950 via-slate-50/90 dark:via-zinc-950/90 to-transparent pt-10">
          <button
            onClick={() => navigate('/carrinho')}
            className="w-full py-5 rounded-2xl text-white flex items-center justify-between px-5 active:scale-[0.98] transition-transform"
            style={{ background: 'var(--brand-primary)' }}
          >
            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold">
              {totalItems}
            </span>
            <span className="text-lg font-semibold">Ver Carrinho</span>
            <span className="text-lg font-bold">R$ {total.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  )
}
