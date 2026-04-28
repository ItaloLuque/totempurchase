from fastapi import FastAPI
from app.routes import produtos, carrinho, pedidos

app = FastAPI()

app.include_router(produtos.router)
app.include_router(carrinho.router)
app.include_router(pedidos.router)

@app.get("/")
def home():
    return {"message": "Totem Purchase API rodando!"}