from sqlalchemy import Boolean, Column, ForeignKey, Integer, Float, String, Date, Table
from sqlalchemy.orm import relationship

from .database import Base

"""
class <uppercase table name>(Base):
    __tablename__ "<plural table name>"

    <attrib> = Column(<params>)
    <attrib> = Column(<params>)
    ...
    <attrib> = Column(<params>)

    <relationship> = relationship("<uppercase associated table name>", back_populates="<lowercase name of the relationship as in the associated table>")
    <relationship> = relationship("<uppercase associated table name>", back_populates="<lowercase name of the relationship as in the associated table>")
    ...
    <relationship> = relationship("<uppercase associated table name>", back_populates="<lowercase name of the relationship as in the associated table>")
"""

produtos_venda = Table(
    'produtos_venda',
    Base.metadata,
    Column('id_produto', ForeignKey('produtos.id_produto'), primary_key=True),
    Column('id_venda', ForeignKey('vendas.id_venda'), primary_key=True)
)


class Funcionario(Base):
    __tablename__ = "funcionarios"

    cpf = Column(Integer, primary_key=True)
    login = Column(String(255), unique=True)
    senha = Column(String(255))
    is_gerente = Column(Boolean)

    vendas = relationship("Venda")


class Venda(Base):
    __tablename__ = "vendas"

    id_venda = Column(Integer, primary_key=True)
    valor_venda = Column(Float)
    id_cliente = Column(Integer, ForeignKey("clientes.cpf"))
    id_funcionario = Column(Integer, ForeignKey("funcionarios.cpf"))
    data = Column(Date)

    funcionario = relationship("Funcionario", back_populates="vendas")
    cliente = relationship("Cliente")
    produtos = relationship("Produto", secondary="produtos_venda", back_populates="vendas")


class Cliente(Base):
    __tablename__ = "clientes"

    cpf = Column(Integer, primary_key=True)

    compras = relationship("Venda", back_populates="cliente")


class Produto(Base):
    __tablename__ = "produtos"

    id_produto = Column(Integer, primary_key=True)
    valor = Column(Float)
    quantidade_estoque = Column(Integer)

    vendas = relationship("Venda", secondary="produtos_venda", back_populates="produtos")
    desconto = relationship("Desconto", back_populates="produto")
    

class Desconto(Base):
    __tablename__ = "descontos"

    id_produto = Column(Integer, ForeignKey("produtos.id_produto"), primary_key=True)
    porcentagem = Column(Float)

    produto = relationship("Produto", back_populates="desconto")
