from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()

#FUNCIONARIO

@app.post("/funcionarios/", response_model=schemas.Funcionario)
def create_funcionario(funcionario: schemas.FuncionarioCreate, db: Session = Depends(get_db)):
    db_funcionario = crud.get_funcionario_by_cpf(db, cpf=funcionario.cpf)
    if db_funcionario:
        raise HTTPException(status_code=400, detail="CPF já registrado")
    return crud.create_funcionario(db=db, funcionario=funcionario)

@app.get("/funcionarios/", response_model=list[schemas.Funcionario])
def read_funcionarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    funcionarios = crud.get_funcionarios(db, skip=skip, limit=limit)
    return funcionarios

@app.get("/funcionarios/{cpf_funcionario}/", response_model=schemas.Funcionario)
def read_funcionario(cpf: int, db: Session = Depends(get_db)):
    db_funcionario = crud.get_funcionario_by_cpf(db, cpf=cpf)
    if db_funcionario is None:
        raise HTTPException(status_code=404, detail="Funcionário não encontrado")
    return db_funcionario


#CLIENTE

@app.post("/clientes/", response_model=schemas.Cliente)
def create_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    return crud.create_cliente(db=db, cliente=cliente)

@app.get("/clientes/", response_model=list[schemas.Cliente])
def read_clientes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clientes = crud.get_clientes(db, skip=skip, limit=limit)
    return clientes

@app.get("/clientes/{cpf_cliente}/", response_model=schemas.Cliente)
def read_cliente(cpf_cliente: int, db: Session = Depends(get_db)):
    db_cliente = crud.get_cliente_by_cpf(db, cpf=cpf_cliente)
    if db_cliente is None:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return db_cliente

@app.put("/clientes/{cpf_cliente}/", response_model=schemas.Cliente)
def update_cliente(cpf_cliente: int, cliente_update: schemas.Cliente, db: Session = Depends(get_db)):
    db_cliente = crud.update_cliente(db=db, cpf=cpf_cliente, cliente=cliente_update)
    if db_cliente is None:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return db_cliente

@app.delete("/clientes/{cpf_cliente}/")
def delete_cliente(cpf_cliente: int, db: Session = Depends(get_db)):
    crud.delete_cliente(db=db, cpf=cpf_cliente)
    return {"message": "Cliente deletado com sucesso"}


#PRODUTO

@app.post("/produtos/", response_model=schemas.Produto)
def create_produto(produto: schemas.ProdutoCreate, db: Session = Depends(get_db)):
    return crud.create_produto(db=db, produto=produto)

@app.get("/produtos/", response_model=list[schemas.Produto])
def read_produtos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    produtos = crud.get_produtos(db, skip=skip, limit=limit)
    return produtos

@app.get("/produtos/{produto_id}", response_model=schemas.Produto)
def read_produto(produto_id: int, db: Session = Depends(get_db)):
    db_produto = crud.get_produto_by_id(db, id_produto=produto_id)
    if db_produto is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return db_produto

@app.put("/produtos/{produto_id}", response_model=schemas.Produto)
def update_produto(produto_id: int, produto_update: schemas.Produto, db: Session = Depends(get_db)):
    db_produto = crud.update_produto(db=db, id_produto=produto_id,produto=produto_update)
    if db_produto is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return db_produto

@app.delete("/produtos/{produto_id}")
def delete_produto(produto_id: int, db: Session = Depends(get_db)):
    crud.delete_produto(db=db, id_produto=produto_id)
    return {"message": "Produto deletado com sucesso"}


#VENDA

@app.post("/vendas/", response_model=schemas.Venda)
def create_venda(venda: schemas.VendaCreate, db: Session = Depends(get_db)):
    return crud.create_venda(db=db, venda=venda)

@app.get("/vendas/", response_model=list[schemas.Venda])
def read_vendas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    vendas = crud.get_vendas(db, skip=skip, limit=limit)
    return vendas

@app.get("/vendas/{venda_id}", response_model=schemas.Venda)
def read_venda(venda_id: int, db: Session = Depends(get_db)):
    db_venda = crud.get_venda_by_id(db, venda_id=venda_id)
    if db_venda is None:
        raise HTTPException(status_code=404, detail="Venda não encontrada")
    return db_venda

@app.put("/vendas/{venda_id}", response_model=schemas.Venda)
def update_venda(venda_id: int, venda_update: schemas.Venda, db: Session = Depends(get_db)):
    db_venda = crud.update_venda(db=db, venda_id=venda_id, venda_update=venda_update)
    if db_venda is None:
        raise HTTPException(status_code=404, detail="Venda não encontrada")
    return db_venda

@app.delete("/vendas/{venda_id}")
def delete_venda(venda_id: int, db: Session = Depends(get_db)):
    crud.delete_venda(db=db, venda_id=venda_id)
    return {"message": "Venda deletada com sucesso"}


#PRODUTO-VENDA
#@app.post("/produto-vendas/", response_model=ProdutoVenda)
#def create_produto_venda(produto_venda: ProdutoVendaCreate, db: Session = Depends(get_db)):
#    return create_produto_venda(db=db, produto_venda=produto_venda)
#
#@app.get("/produto-vendas/", response_model=list[ProdutoVenda])
#def read_produto_vendas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#    produto_vendas = get_produto_vendas(db, skip=skip, limit=limit)
#    return produto_vendas
#
#@app.get("/produto-vendas/{id_produto}/{id_venda}", response_model=ProdutoVenda)
#def read_produto_venda(
#    id_produto: int, id_venda: int, db: Session = Depends(get_db)
#):
#    db_produto_venda = get_produto_venda_by_ids(
#        db=db, id_produto=id_produto, id_venda=id_venda
#    )
#    if db_produto_venda is None:
#        raise HTTPException(status_code=404, detail="Associação não encontrada")
#    return db_produto_venda
#
#@app.put("/produto-vendas/{id_produto}/{id_venda}", response_model=ProdutoVenda)
#def update_produto_venda(
#    id_produto: int, id_venda: int, produto_venda_update: ProdutoVenda, db: Session = Depends(get_db)
#):
#    db_produto_venda = update_produto_venda(
#        db=db,
#        id_produto=id_produto,
#        id_venda=id_venda,
#        produto_venda_update=produto_venda_update,
#    )
#    if db_produto_venda is None:
#        raise HTTPException(status_code=404, detail="Associação não encontrada")
#    return db_produto_venda
#
#@app.delete("/produto-vendas/{id_produto}/{id_venda}")
#def delete_produto_venda(id_produto: int, id_venda: int, db: Session = Depends(get_db)):
#    delete_produto_venda(db=db, id_produto=id_produto, id_venda=id_venda)
#    return {"message": "Associação deletada com sucesso"}


#DESCONTO

@app.post("/descontos/", response_model=schemas.Desconto)
def create_desconto(desconto: schemas.DescontoCreate, db: Session = Depends(get_db)):
    return crud.create_desconto(db=db, desconto=desconto)

@app.get("/descontos/", response_model=list[schemas.Desconto])
def read_descontos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    descontos = crud.get_descontos(db, skip=skip, limit=limit)
    return descontos

@app.get("/descontos/{id_desconto}", response_model=schemas.Desconto)
def read_desconto(id_desconto: int, db: Session = Depends(get_db)):
    db_desconto = crud.get_desconto_by_id(db, id_desconto=id_desconto)
    if db_desconto is None:
        raise HTTPException(status_code=404, detail="Desconto não encontrado")
    return db_desconto

@app.put("/descontos/{id_desconto}", response_model=schemas.Desconto)
def update_desconto(id_desconto: int, desconto_update: schemas.Desconto, db: Session = Depends(get_db)):
    db_desconto = crud.update_desconto(db=db, id_desconto=id_desconto, desconto_update=desconto_update)
    if db_desconto is None:
        raise HTTPException(status_code=404, detail="Desconto não encontrado")
    return db


@app.delete("/descontos/{id_desconto}")
def delete_desconto(id_desconto: int, db: Session = Depends(get_db)):
    crud.delete_desconto(db=db, id_desconto=id_desconto)
    return {"message": "Desconto deletado com sucesso"}


#FIDELIDADE

@app.get("/fidelidade-cliente/{cpf_cliente}", response_model=int)
def get_numero_vendas_por_cliente(cpf_cliente: int, db: Session = Depends(get_db)):
    fidelidade = crud.get_fidelidade(db, id_cliente=cpf_cliente)
    return fidelidade

#VERIFICA LOGIN
@app.post("/login/{login}/{senha}")
def login_funcionario(login: str, senha: str, db: Session = Depends(get_db)):
    is_valid = crud.validar_login_funcionario(db, login, senha)
    if is_valid:
        return {"message": "Login efetuado com sucesso"}
    else:
        raise HTTPException(status_code=401, detail="Login ou senha inválidos")

#RELATORIO DE VENDAS

@app.get("/relatorio-vendas/{mes}/{ano}")
def get_vendas_mes_ano(mes: int, ano: int, db: Session = Depends(get_db)):
    vendas = crud.get_vendas_by_mes_ano(db, mes, ano)
    if vendas:
        return vendas
    else:
        raise HTTPException(status_code=404, detail=f"Nenhuma venda encontrada para o mês {mes} do ano {ano}")
