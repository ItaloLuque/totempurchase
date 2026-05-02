import type { ItemCarrinho } from '../types'
import { useCartStore } from '../store/cartStore'

export default function CartItem({ item }: { item: ItemCarrinho }) {
  const { updateQuantidade } = useCartStore()

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl px-5 py-4 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-slate-800 dark:text-zinc-100 leading-tight truncate">
          {item.nome}
        </p>
        <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
          R$ {item.preco.toFixed(2)} cada
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => updateQuantidade(item.id, item.quantidade - 1)}
          className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-lg text-slate-400 dark:text-zinc-400 active:scale-90 active:text-slate-900 dark:active:text-white transition-all"
        >
          −
        </button>
        <span className="text-base font-bold text-slate-900 dark:text-zinc-100 w-6 text-center">
          {item.quantidade}
        </span>
        <button
          onClick={() => updateQuantidade(item.id, item.quantidade + 1)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white active:scale-90 active:brightness-90 transition-all"
          style={{ background: 'var(--brand-primary)' }}
        >
          +
        </button>
      </div>

      <p className="text-sm font-bold text-slate-700 dark:text-zinc-300 w-20 text-right flex-shrink-0">
        R$ {(item.preco * item.quantidade).toFixed(2)}
      </p>
    </div>
  )
}
