import axios from 'axios'
import type { Produto, Pedido } from '../types'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const produtosApi = {
  listar: () => api.get<Produto[]>('/produtos'),
}

export const pedidosApi = {
  finalizar: (pedido: Partial<Pedido>) =>
    api.post<Pedido>('/pedido', pedido),
}
