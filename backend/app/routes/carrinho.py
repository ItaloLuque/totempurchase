from fastapi import APIRouter
from app.database.memory import produtos, carrinho

router = APIRouter()

@router.post("/carrinho/{id}")
def adicionar_ao_carrinho(id: int):
    for produto in produtos:
        if produto["id"] == id:
            carrinho.append(produto)
            return {"mensagem": "Produto adicionado ao carrinho"}

    return {"erro": "Produto não encontrado"}

@router.get("/carrinho")
def listar_carrinho():
    return carrinho

@router.get("/carrinho/total")
def calcular_total():
    total = 0

    for item in carrinho:
        total += item["preco"]

    return {"total": total}

@router.delete("/carrinho/{id}")
def remover_do_carrinho(id: int):
    for item in carrinho:
        if item["id"] == id:
            carrinho.remove(item)
            return {"mensagem": "Produto removido"}

    return {"erro": "Produto não encontrado no carrinho"}

@router.delete("/carrinho")
def limpar_carrinho():
    carrinho.clear()
    return {"mensagem": "Carrinho limpo"}