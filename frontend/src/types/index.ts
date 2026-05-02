export interface Produto {
  id: number
  nome: string
  preco: number
  categoria?: 'lanche' | 'bebida' | 'sobremesa' | 'extra'
  descricao?: string
}

export interface ItemCarrinho extends Produto {
  quantidade: number
}

export interface Pedido {
  id?: number
  itens: ItemCarrinho[]
  total: number
  timestamp?: string
  cpf?: string
  status?: 'pendente' | 'pago' | 'cancelado'
}
