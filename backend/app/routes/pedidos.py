from fastapi import APIRouter
from app.database.memory import carrinho, pedidos

router = APIRouter()

@router.post("/pedido")
def finalizar_pedido():
    if len(carrinho) == 0:
        return {"erro": "Carrinho vazio"}

    total = 0

    for item in carrinho:
        total += item["preco"]

    pedido = {
        "itens": carrinho.copy(),
        "total": total
    }

    pedidos.append(pedido)
    carrinho.clear()

    return pedido