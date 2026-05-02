import { create } from 'zustand'
import type { ItemCarrinho, Produto } from '../types'

interface CartState {
  items: ItemCarrinho[]
  sessionId: string
  addItem: (produto: Produto) => void
  removeItem: (id: number) => void
  updateQuantidade: (id: number, quantidade: number) => void
  clearCart: () => void
  total: () => number
  totalItems: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  sessionId: crypto.randomUUID(),

  addItem: (produto) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === produto.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { ...produto, quantidade: 1 }] }
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQuantidade: (id, quantidade) =>
    set((state) => {
      if (quantidade <= 0) {
        return { items: state.items.filter((i) => i.id !== id) }
      }
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantidade } : i
        ),
      }
    }),

  clearCart: () => set({ items: [] }),

  total: () =>
    get().items.reduce((sum, i) => sum + i.preco * i.quantidade, 0),

  totalItems: () =>
    get().items.reduce((sum, i) => sum + i.quantidade, 0),
}))
