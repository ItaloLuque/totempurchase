import type { Produto } from '../types'
import { useCartStore } from '../store/cartStore'

const EMOJI: Record<string, string> = {
  lanche: '🍔',
  bebida: '🥤',
  sobremesa: '🍨',
  extra: '🍟',
}

export default function ProductCard({ produto }: { produto: Produto }) {
  const addItem = useCartStore((s) => s.addItem)
  const updateQuantidade = useCartStore((s) => s.updateQuantidade)
  const items = useCartStore((s) => s.items)
  const quantidade = items.find((i) => i.id === produto.id)?.quantidade ?? 0

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col active:scale-[0.97] transition-transform">
      {/* Image area — altura fixa, nunca aspect-square */}
      <div className="h-36 md:h-40 bg-slate-50 dark:bg-zinc-800/50 flex items-center justify-center text-5xl flex-shrink-0">
        {EMOJI[produto.categoria ?? 'lanche']}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-zinc-100 leading-tight line-clamp-2">
            {produto.nome}
          </h2>
          {produto.descricao && (
            <p className="text-xs text-slate-400 dark:text-zinc-500 line-clamp-1 mt-0.5 leading-relaxed">
              {produto.descricao}
            </p>
          )}
        </div>

        <p className="text-base font-bold" style={{ color: 'var(--brand-primary)' }}>
          R$ {produto.preco.toFixed(2)}
        </p>

        {/* Action */}
        {quantidade === 0 ? (
          <button
            onClick={() => addItem(produto)}
            className="w-full py-3 rounded-xl text-white text-sm font-semibold active:brightness-90 transition-all min-h-[44px]"
            style={{ background: 'var(--brand-primary)' }}
          >
            + Adicionar
          </button>
        ) : (
          <div className="flex items-center justify-between bg-slate-100 dark:bg-zinc-800 rounded-xl px-1 min-h-[44px]">
            <button
              onClick={() => updateQuantidade(produto.id, quantidade - 1)}
              className="w-11 h-10 flex items-center justify-center text-xl text-slate-400 dark:text-zinc-400 active:text-slate-900 dark:active:text-white transition-colors"
            >
              −
            </button>
            <span className="font-bold text-slate-900 dark:text-zinc-100 text-base w-6 text-center">
              {quantidade}
            </span>
            <button
              onClick={() => addItem(produto)}
              className="w-11 h-10 flex items-center justify-center text-xl font-bold active:brightness-90 transition-all"
              style={{ color: 'var(--brand-primary)' }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
