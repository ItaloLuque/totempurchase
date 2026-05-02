import { useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useCartStore } from '../store/cartStore'

export default function CartPage() {
  const { items, total, clearCart } = useCartStore()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 flex flex-col items-center justify-center gap-5 p-8">
        <div className="w-24 h-24 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 flex items-center justify-center text-5xl">
          🛒
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-700 dark:text-zinc-200">Carrinho vazio</p>
          <p className="text-slate-400 dark:text-zinc-500 mt-1 text-sm">
            Adicione itens para continuar
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-2 text-white text-lg font-semibold px-10 py-4 rounded-2xl active:scale-95 transition-transform min-h-[60px]"
          style={{ background: 'var(--brand-primary)' }}
        >
          Ver Cardápio
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 flex flex-col">
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm px-5 py-5 flex items-center gap-4 border-b border-slate-200 dark:border-zinc-800/60">
        <button
          onClick={() => navigate('/')}
          className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 active:scale-90 transition-transform text-xl"
        >
          ←
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Seu Pedido</h1>
          <p className="text-xs text-slate-400 dark:text-zinc-500">
            {items.length} {items.length === 1 ? 'item' : 'itens'}
          </p>
        </div>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto pb-52">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-t border-slate-200 dark:border-zinc-800/60 px-5 py-5 flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-sm text-slate-500 dark:text-zinc-400 font-medium">
            Total do pedido
          </span>
          <span className="text-2xl font-extrabold" style={{ color: 'var(--brand-primary)' }}>
            R$ {total().toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => navigate('/pagamento')}
          className="w-full text-white text-xl font-bold py-5 rounded-2xl active:scale-[0.98] transition-transform min-h-[64px]"
          style={{ background: 'var(--brand-primary)' }}
        >
          Finalizar Pedido →
        </button>

        <button
          onClick={() => { clearCart(); navigate('/') }}
          className="w-full text-slate-400 dark:text-zinc-600 text-sm font-medium py-2 rounded-xl active:text-slate-600 dark:active:text-zinc-300 transition-colors"
        >
          Cancelar pedido
        </button>
      </div>
    </div>
  )
}
