from pydantic import BaseModel
from datetime import date




class ProdutoBase(BaseModel):
    valor: float
    quantidade_estoque: int



class ProdutoCreate(ProdutoBase):
    valor: float
    quantidade_estoque: int
    nome:str


class Produto(ProdutoBase):
    valor: float
    quantidade_estoque: int


    class Config:
        orm_mode = True

#-------------------------------------------



class VendaBase(BaseModel):
    valor_venda: float
    data: date
    id_cliente: int
    id_funcionario: int
    


class VendaCreate(VendaBase):
    produtos : list[Produto] = []


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
    cpf: int
    login: str
    is_gerente: bool


class FuncionarioCreate(FuncionarioBase):
    senha: str 


class Funcionario(FuncionarioBase):
    vendas: list[Venda] = []
    
    class Config:
        orm_mode = True


#-------------------------------------------

class DescontoBase(BaseModel):
    porcentagem: float


class DescontoCreate(DescontoBase):
    pass


class Desconto(DescontoBase):
    id_produto: int

    class Config:
        orm_mode = True
