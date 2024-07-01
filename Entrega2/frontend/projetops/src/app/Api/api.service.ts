import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Funcionario {
  cpf: number;
  login: string;
  is_gerente: boolean;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    //empty
  }

  cadastrarFuncionario(funcionario: Funcionario) {
    this.http
      .post('http://127.0.0.1:8000/funcionarios/', funcionario)
      .subscribe(
        (resultado) => {
          console.log(resultado);
        },
        (erro) => {
          if (erro.status == 400) {
            console.log(erro);
          }
        }
      );
  }
}
