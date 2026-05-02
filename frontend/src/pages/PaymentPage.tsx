import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

type Status = 'idle' | 'processing' | 'approved' | 'rejected'
type Method = 'card' | 'pix' | 'cash'

const METHODS: { id: Method; icon: string; label: string; sub: string }[] = [
  { id: 'card', icon: '💳', label: 'Cartão', sub: 'Crédito, débito ou aproximação' },
  { id: 'pix', icon: '📱', label: 'QR Code / PIX', sub: 'Escaneie com qualquer app de pagamento' },
  { id: 'cash', icon: '💵', label: 'Dinheiro', sub: 'Pague no caixa após confirmar' },
]

export default function PaymentPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [selected, setSelected] = useState<Method | null>(null)
  const { items, total, clearCart } = useCartStore()
  const navigate = useNavigate()

  const processar = async () => {
    if (!selected) return
    setStatus('processing')
    await new Promise((r) => setTimeout(r, 2000))
    const ok = Math.random() > 0.2
    setStatus(ok ? 'approved' : 'rejected')
    if (ok) setTimeout(() => { clearCart(); navigate('/') }, 3000)
  }

  if (status === 'approved') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-6 p-8 text-center">
        <div className="w-28 h-28 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/25 flex items-center justify-center text-6xl animate-bounce">
          ✅
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            Pagamento Aprovado!
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 mt-2 text-lg">
            Seu pedido está sendo preparado.
          </p>
          <p className="text-slate-400 dark:text-zinc-600 text-sm mt-3">
            Redirecionando em instantes...
          </p>
        </div>
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-6 p-8 text-center">
        <div className="w-28 h-28 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/25 flex items-center justify-center text-6xl">
          ❌
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-red-500 dark:text-red-400">
            Pagamento Recusado
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 mt-2">
            Verifique seu cartão e tente novamente.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-white text-lg font-semibold px-10 py-4 rounded-2xl active:scale-95 transition-transform min-h-[60px]"
          style={{ background: 'var(--brand-primary)' }}
        >
          Tentar Novamente
        </button>
        <button
          onClick={() => navigate('/carrinho')}
          className="text-slate-400 dark:text-zinc-600 text-sm mt-1"
        >
          Voltar ao Carrinho
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 flex flex-col">
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm px-5 py-5 flex items-center gap-4 border-b border-slate-200 dark:border-zinc-800/60">
        <button
          onClick={() => navigate('/carrinho')}
          className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 active:scale-90 transition-transform text-xl"
        >
          ←
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Pagamento</h1>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto pb-44">
        {/* Order summary */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-5">
          <p className="text-[10px] text-slate-400 dark:text-zinc-600 tracking-[0.18em] uppercase font-medium mb-4">
            Resumo do Pedido
          </p>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-zinc-400">
                  {item.quantidade}× {item.nome}
                </span>
                <span className="text-slate-700 dark:text-zinc-200 font-medium">
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
            <span className="text-slate-600 dark:text-zinc-300 font-medium text-sm">Total</span>
            <span className="text-2xl font-extrabold" style={{ color: 'var(--brand-primary)' }}>
              R$ {total().toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment methods */}
        <div>
          <p className="text-[10px] text-slate-400 dark:text-zinc-600 tracking-[0.18em] uppercase font-medium mb-3 px-1">
            Forma de Pagamento
          </p>
          <div className="flex flex-col gap-2">
            {METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all active:scale-[0.98] text-left min-h-[72px] ${
                  selected === m.id
                    ? ''
                    : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
                }`}
                style={
                  selected === m.id
                    ? {
                        background: 'var(--brand-primary-subtle)',
                        borderColor: 'var(--brand-primary)',
                      }
                    : {}
                }
              >
                <span className="text-3xl">{m.icon}</span>
                <div className="flex-1">
                  <p
                    className={`text-base font-semibold ${
                      selected === m.id
                        ? 'text-slate-800 dark:text-zinc-100'
                        : 'text-slate-600 dark:text-zinc-300'
                    }`}
                  >
                    {m.label}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">{m.sub}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selected === m.id ? '' : 'border-slate-300 dark:border-zinc-700'
                  }`}
                  style={selected === m.id ? { borderColor: 'var(--brand-primary)' } : {}}
                >
                  {selected === m.id && (
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: 'var(--brand-primary)' }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Confirm CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-t border-slate-200 dark:border-zinc-800/60 px-5 py-5">
        <button
          onClick={processar}
          disabled={!selected || status === 'processing'}
          className="w-full text-white text-xl font-bold py-5 rounded-2xl active:scale-[0.98] transition-all min-h-[64px] disabled:opacity-40"
          style={{ background: 'var(--brand-primary)' }}
        >
          {status === 'processing' ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processando...
            </span>
          ) : (
            'Confirmar Pagamento'
          )}
        </button>
      </div>
    </div>
  )
}
