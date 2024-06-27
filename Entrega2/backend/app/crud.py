from sqlalchemy.orm import Session

from . import models, schemas

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

