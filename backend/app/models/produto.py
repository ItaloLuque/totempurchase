from typing import Literal, Optional

from pydantic import BaseModel


class Produto(BaseModel):
    id: int
    nome: str
    preco: float
    categoria: Optional[Literal['lanche', 'bebida', 'sobremesa', 'extra']] = None
    descricao: Optional[str] = None


class Resposta(BaseModel):
    mensagem: str
