from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()



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
