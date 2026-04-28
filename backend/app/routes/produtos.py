from fastapi import APIRouter
from app.models.produto import Produto, Resposta
from app.database.memory import produtos

router = APIRouter()

@router.get("/produtos")
def listar_produtos():
    return produtos

@router.get("/produtos/{id}")
def buscar_produto(id: int):
    for produto in produtos:
        if produto["id"] == id:
            return produto

    return {"erro": "Produto não encontrado"}

@router.post("/produtos", response_model=Resposta)
def criar_produto(produto: Produto):
    for p in produtos:
        if p["id"] == produto.id:
            return {"mensagem": "Produto com esse ID já existe"}

    produtos.append(produto.dict())
    return {"mensagem": "Produto criado com sucesso"}