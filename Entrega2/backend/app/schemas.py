from pydantic import BaseModel
from datetime import date




class ProdutoBase(BaseModel):
    valor: float
    quantidade_estoque: int
    nome : str



class ProdutoCreate(ProdutoBase):
    valor: float
    quantidade_estoque: int
    nome:str


class Produto(BaseModel):
    desconto: int
    valor: float
    quantidade_estoque: int
    nome : str
    id_produto:int


    class Config:
        orm_mode = True

class Desconto(BaseModel):
    desconto:int

#-------------------------------------------



class VendaBase(BaseModel):
    valor_venda: float
    data: date
    id_cliente: int
    id_funcionario: int
    


class VendaCreate(VendaBase):
    produtos : list[int] = []


class Venda(VendaBase):
    id_venda: int

    class Config:
        orm_mode = True

#-------------------------------------------
class ClienteBase(BaseModel):
    cpf: int


class ClienteCreate(ClienteBase):
    cpf:int


class Cliente(ClienteBase):
    cpf:int
    compras: list[Venda] = []

    class Config:
        orm_mode = True

#-------------------------------------------
class FuncionarioBase(BaseModel):
    login: str
    senha: str
    cpf: int
    is_gerente:bool

class FuncionarioCreate(FuncionarioBase):
    cpf: int
    login: str
    is_gerente: bool
    senha: str


class Funcionario(BaseModel):
    senha: str
    login: str
    class Config:
        orm_mode = True



