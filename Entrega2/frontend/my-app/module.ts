import axios, { AxiosResponse } from 'axios'; // Assuma que o Axios já está instalado

class Caixa{

}

class Produto {
    private codigo: number;
    private quantidade: number;
    private valor: number;
  
    constructor(codigo: number, quantidade: number, valor: number) {
        this.codigo = codigo;
        this.quantidade = quantidade;
        this.valor = valor;
    }
  
    getValor(): number {
        return this.valor;
    }
    
    setQuantidade(qtd): void {
        this.quantidade = qtd;
    }

    getQuantidade(): number {
        return this.quantidade;
    }

    getCodigo(): number {
        return this.codigo;
    }
}

class Venda {
        private data: Date;
        private produtos: Produto[];
        private cpfCliente: number;
        private cpfFuncionario: number;
        private codigo: number;
  
    constructor(
        data: Date,
        produtos: Produto[],
        cpfCliente: number,
        cpfFuncionario: number,
        codigo: number
    ) {
        this.data = data;
        this.produtos = produtos;
        this.cpfCliente = cpfCliente;
        this.cpfFuncionario = cpfFuncionario;
        this.codigo = codigo;
    }
  
    adicionaProduto(produto: Produto): void {
        this.produtos.push(produto);
    }
  
    removeProduto(codigoProduto: number): void {
        const index = this.produtos.findIndex((produto) => produto.getCodigo() === codigoProduto);
        if (index !== -1) {
            this.produtos.splice(index, 1);
        }
    }

    editaProduto(codigoProduto: number, qtd: number): void {
        const index = this.produtos.findIndex((produto) => produto.getCodigo() === codigoProduto);
        if (index !== -1) {
            this.produtos[index].setQuantidade(qtd)
        }
    }
  
    getValorVenda(): number {
        let valorTotal = 0;
        for (const produto of this.produtos) {
          valorTotal += produto.getValor() * produto.getQuantidade();
        }
        return valorTotal;
    }

    getData(): Date {
        return this.data
    }

    getCpfCliente(): number {
        return this.cpfCliente
    }
    
    getCpfFuncionario(): number {
        return this.cpfFuncionario
    }

    getCodigo(): number {
        return this.codigo
    }

    getProdutos(): Produto[] {
        return this.produtos
    }

}

interface Funcionario {
    getTipoFuncionario(): string;
}

class Funcionario implements Funcionario{
    private cpf: number;
    private login: number;
  
    constructor(cpf: number, login: number) {
        this.cpf = cpf;
        this.login = login;
    }
    
    getTipoFuncionario(): string {
        return 'Funcionario';
    }

    getCpf(): number {
        return this.cpf;
    }
  
    getLogin(): number {
        return this.login;
    }

    async cadastraCliente(cpfCliente: number): Promise<void> {
        try {
        const response: AxiosResponse<{}> = await axios.post(
            'http://localhost:8000/clientes/', // URL da API local
            { cpf: cpfCliente },
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log(`Cliente com CPF ${cpfCliente} cadastrado com sucesso!`);
        } catch (error) {
            console.error(`Erro ao cadastrar cliente: ${error.message}`);
        }
    }

    async removeCliente(cpfCliente: number): Promise<void> {
        try {
        const response: AxiosResponse<{ message: string }> = await axios.delete(
            `http://localhost:8000/clientes/${cpfCliente}/`, // URL da API local com o CPF
            { headers: { 'Content-Type': 'application/json' } }
        );
        
        console.log(response.data.message);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error(`Cliente com CPF ${cpfCliente} não encontrado.`);
            } else {
                console.error(`Erro ao remover cliente: ${error.message}`);
            }
        }
    }
  
    async consultaCliente(cpfCliente: number): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `http://localhost:8000/clientes/${cpfCliente}/`, // URL da API local com o CPF
                { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.status === 200) {
                console.log(`Cliente com CPF ${cpfCliente}:`);
                console.log(response.data);
            } else {
                if (response.status === 404) {
                console.error(`Cliente com CPF ${cpfCliente} não encontrado.`);
                } else {
                console.error(`Erro ao consultar cliente: ${response.statusText}`);
                }
            }
        } catch (error) {
            console.error(`Erro ao consultar cliente: ${error.message}`);
        }
    }

    requisitaReembolso(): void {
        // Implementação do método requisitaReembolso
    }

    abreCaixa(): void {
        // Implementação do método abreCaixa
    }
  
    fechaCaixa(): void {
        // Implementação do método fechaCaixa
    }
}

class Gerente extends Funcionario {
    constructor(cpf: number, login: number) {
      super(cpf, login);
    }
    
    getTipoFuncionario(): string {
        return 'Gerente';
    }

    async cadastraFuncionario(
        cpf: number,
        login: string,
        senha: string,
        isGerente: boolean
      ): Promise<void> {
        try {
          const response: AxiosResponse<any> = await axios.post(
            'http://localhost:8000/funcionarios/', // URL da API local
            {
                cpf,
                login,
                senha,
                is_gerente: isGerente,
            },
            { headers: { 'Content-Type': 'application/json' } }
          );
    
          if (response.status === 201) {
                
          } else {
                if (response.status === 400) {
                    console.error('CPF já registrado!');
                } else {
                    console.error(`Erro ao cadastrar funcionário: ${response.statusText}`);
                }
            }
        } catch (error) {
            console.error(`Erro ao cadastrar funcionário: ${error.message}`);
        }
    }

    consultaFuncionario(): void {
        // Implementação do método consultaFuncionario
    }
  
    alteraFuncionario(): void {
      // Implementação do método alteraFuncionario
    }
  
    removeFuncionario(): void {
      // Implementação do método removeFuncionario
    }
  
    cadastraDesconto(): void {
      // Implementação do método cadastraDesconto
    }
  
    alteraDesconto(): void {
      // Implementação do método alteraDesconto
    }
  
    removeDesconto(): void {
      // Implementação do método removeDesconto
    }
  
    cadastraProduto(): void {
      // Implementação do método cadastraProduto
    }
  
    removeProduto(): void {
      // Implementação do método removeProduto
    }
}