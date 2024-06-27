from pydantic import BaseModel


class VendaBase(BaseModel):
    valor_venda: float
    data: str # TODO: mudar (str) para um tipo mais adequado????????


class VendaCreate(VendaBase):
    pass


class Venda(VendaBase):
    id_venda: int
    id_cliente: int
    id_funcionario: int

    class Config:
        orm_mode = True

#-------------------------------------------
class ClienteBase(BaseModel):
    pass 


class ClienteCreate(ClienteBase):
    pass


class Cliente(ClienteBase):
    cpf: int
    compras: list[Venda] = []

    class Config:
        orm_mode = True

#-------------------------------------------
class FuncionarioBase(BaseModel):
    cpf: int
    login: str
    is_gerente: bool


class FuncionarioCreate(FuncionarioBase):
    senha: str # A senha está aqui e não em FuncionarioBase por questão de segurança


class Funcionario(FuncionarioBase):
    vendas: list[Venda] = []
    
    class Config:
        orm_mode = True

#-------------------------------------------

