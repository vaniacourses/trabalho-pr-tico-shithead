import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './Api/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'projetops';

  public cpf?: number;
  public login?: string;
  public is_gerente?: boolean;
  public senha?: string;

  constructor(private apiService: ApiService) {
    //empty
  }

  onCadastraClienteBtnClicked() {
    if (!this.cpf || !this.login || !this.is_gerente || !this.senha) {
      return;
    }
    this.apiService.cadastrarFuncionario({
      cpf: this.cpf,
      login: this.login,
      is_gerente: false,
      senha: this.senha,
    });
  }
}
