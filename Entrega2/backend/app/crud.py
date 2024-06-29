from sqlalchemy.orm import Session

from . import models, schemas

#FUNCIONARIO

# Retorna um (único) funcionário a partir de seu cpf
def get_funcionario_by_cpf(db: Session, cpf: int):
    return db.query(models.Funcionario).filter(models.Funcionario.cpf == cpf).first()

# Retorna uma tabela de funcionários
def get_funcionarios(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Funcionario).offset(skip).limit(limit).all()

# Insere um novo funcionario no banco de dados
def create_funcionario(db: Session, funcionario: schemas.FuncionarioCreate):
    db_funcionario = models.Funcionario(
        cpf=funcionario.cpf,
        login=funcionario.login,
        senha=funcionario.senha,
        is_gerente=funcionario.is_gerente
    )
    db.add(db_funcionario)
    db.commit()
    db.refresh(db_funcionario)
    return db_funcionario


#CLIENTE

def get_cliente_by_cpf(db: Session, cpf: int):
    return db.query(models.Cliente).filter(models.Cliente.cpf == cpf).first()

def get_clientes(db: Session, skip: int = 0, limit: int = 100) -> list[schemas.Cliente]:
    return db.query(models.Cliente).offset(skip).limit(limit).all()

def create_cliente(db: Session, cliente: schemas.ClienteCreate):
    db_cliente = models.Cliente(
        cpf=cliente.cpf,
    )
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def update_cliente(db: Session, cpf: int, cliente: schemas.ClienteCreate):
    db_cliente = get_cliente_by_cpf(db, cpf)
    if not db_cliente:
        raise Exception(f"Cliente with CPF {cpf} not found")

    db_cliente.cpf = cliente.cpf

    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def delete_cliente(db: Session, cpf: int) -> None:
    db_cliente = get_cliente_by_cpf(db, cpf)
    if not db_cliente:
        raise Exception(f"Cliente with CPF {cpf} not found")

    db.delete(db_cliente)
    db.commit()


#PRODUTO

def get_produto_by_id(db: Session, id_produto: int):
    return db.query(models.Produto).filter(models.Produto.id_produto == id_produto).first()

def get_produtos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Produto).offset(skip).limit(limit).all()

def create_produto(db: Session, produto: schemas.ProdutoCreate):
    db_produto = models.Produto(
        nome = produto.nome,
        valor=produto.valor,
        quantidade_estoque=produto.quantidade_estoque
    )
    db.add(db_produto)
    db.commit()
    db.refresh(db_produto)
    return db_produto

def update_produto(db: Session, id_produto: int, produto: schemas.ProdutoCreate):
    db_produto = get_produto_by_id(db, id_produto)
    if not db_produto:
        raise Exception(f"Produto com id {id_produto} não encontrado")

    db_produto.valor = produto.valor
    db_produto.quantidade_estoque = produto.quantidade_estoque

    db.commit()
    return db_produto

def delete_produto(db: Session, id_produto: int):
    db_produto = get_produto_by_id(db, id_produto)
    if not db_produto:
        raise Exception(f"Produto com id {id_produto} não encontrado")

    db.delete(db_produto)
    db.commit()


#VENDA

def create_venda(db: Session, venda: schemas.VendaCreate):
    funcionario = db.query(models.Funcionario).filter(models.Funcionario.cpf == venda.id_funcionario).first()
    cliente = db.query(models.Cliente).filter(models.Cliente.cpf == venda.id_cliente).first()
    produtos = db.query(models.Produto).filter(models.Produto.id_produto.in_(venda.produtos)).all()

    db_venda = models.Venda(
        valor_venda=venda.valor_venda,
        id_funcionario=funcionario.cpf,
        id_cliente=cliente.cpf,
        data=venda.data,
        produtos=produtos
    )

    db.add(db_venda)
    db.commit()
    db.refresh(db_venda)
    return db_venda

def get_vendas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Venda).offset(skip).limit(limit).all()

def get_venda_by_id(db: Session, venda_id: int):
    return db.query(models.Venda).filter(models.Venda.id_venda == venda_id).first()

def update_venda(db: Session, venda_id: int, venda_update: schemas.Venda):
    db_venda = db.query(models.Venda).filter(models.Venda.id_venda == venda_id).first()

    db_venda.valor_venda = venda_update.valor_venda
    db_venda.id_funcionario = venda_update.id_funcionario
    db_venda.id_cliente = venda_update.id_cliente
    db_venda.data = venda_update.data

    db.commit()
    db.refresh(db_venda)
    return db_venda

def delete_venda(db: Session, venda_id: int):
    db.query(models.Venda).filter(models.Venda.id_venda == venda_id).delete()
    db.commit()


#PRODUTO-VENDA

#def create_produto_venda(db: Session, produto_venda: schemas.ProdutoVenda):
#    produto = db.query(models.Produto).filter(models.Produto.id_produto == produto_venda.id_produto).first()
#    venda = db.query(models.Venda).filter(models.Venda.id_venda == produto_venda.id_venda).first()
#
#    db_produto_venda = models.ProdutoVenda(
#        produto=produto,
#        venda=venda
#    )
#
#    db.add(db_produto_venda)
#    db.commit()
#    return db_produto_venda
#
#def get_produto_vendas(db: Session, skip: int = 0, limit: int = 100):
#    return db.query(ProdutoVenda).offset(skip).limit(limit).all()
#
#def get_produto_venda_by_ids(db: Session, id_produto: int, id_venda: int):
#    return db.query(ProdutoVenda).filter(ProdutoVenda.id_produto == id_produto, ProdutoVenda.id_venda == id_venda).first()
#
#def delete_produto_venda(db: Session, id_produto: int, id_venda: int):
#    db.query(ProdutoVenda).filter(ProdutoVenda.id_produto == id_produto, ProdutoVenda.id_venda == id_venda).delete()
#    db.commit()


#DESCONTO

def get_desconto_by_id(db: Session, id_desconto: int):
    return db.query(models.Desconto).filter(models.Desconto.id_desconto == id_desconto).first()


def get_descontos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Desconto).offset(skip).limit(limit).all()


def create_desconto(db: Session, desconto: schemas.DescontoCreate):
    db_produto = db.query(models.Produto).filter(models.Produto.id_produto == desconto.id_produto).first()

    db_desconto = models.Desconto(
        porcentagem=desconto.porcentagem,
        id_produto=db_produto.id_produto,
    )
    db.add(db_desconto)
    db.commit()
    db.refresh(db_desconto)
    return db_desconto


def update_desconto(db: Session, id_desconto: int, desconto_update: schemas.DescontoCreate):
    db_desconto = get_desconto_by_id(db, id_desconto)
    if not db_desconto:
        raise Exception(f"Desconto with ID {id_desconto} not found")

    db_desconto.porcentagem = desconto_update.porcentagem
    db_desconto.id_produto = desconto_update.id_produto
    db.commit()
    db.refresh(db_desconto)
    return db_desconto


def delete_desconto(db: Session, id_desconto: int) -> None:
    db_desconto = get_desconto_by_id(db, id_desconto)
    if not db_desconto:
        raise Exception(f"Desconto with ID {id_desconto} not found")

    db.delete(db_desconto)
    db.commit()
#FIDELIDADE

def get_fidelidade(db: Session, id_cliente: int) -> int:
    num = db.query(models.Venda).filter(models.Venda.id_cliente == id_cliente).count()

    if num > 20:
        return 10
    else:
        return 5

#RELATORIO DO MES

def get_vendas_by_mes_ano(db: Session, mes: int, ano: int):
    return db.query(models.Venda) \
        .filter(and_(extract("MONTH",models.Venda.data) == mes, extract("YEAR",models.Venda.data) == ano)) \
        .all()

#VALIDA LOGIN

def validar_login_funcionario(db: Session, login: str, senha: str) -> bool:
    funcionario = db.query(models.Funcionario).filter(
        models.Funcionario.login == login, models.Funcionario.senha == senha
    ).first()

    return funcionario is not None

