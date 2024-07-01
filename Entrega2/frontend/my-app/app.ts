//A classe app tem como objetivo gerenciar a navegação pelas páginas da aplicação e chamar caixa para realizar alguma ação quando o usuário clicar em um botão

//Se algum método não estiver funcionando tenta colocar .bind(this) no final
import axios, { AxiosResponse } from 'axios';

class App {
    my_caixa = new Caixa()

    constructor() {}

    clear_body() {
        const body = document.body;
        
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
    }

    create_start_screen() {
        this.clear_body();
    
        const header = document.createElement('div');
        header.className = 'header';
    
        const titulo = document.createElement('h1');
        titulo.textContent = 'Início';
        header.appendChild(titulo);
    
        const divBotoes = document.createElement('div');
        divBotoes.className = 'botoes';
    
        const gerenciarProdutosButton = document.createElement('button');
        gerenciarProdutosButton.textContent = 'Gerenciar Produtos';
        gerenciarProdutosButton.addEventListener('click', this.create_product_management_screen.bind(this));
        divBotoes.appendChild(gerenciarProdutosButton);
    
        const gerenciarFuncionariosButton = document.createElement('button');
        gerenciarFuncionariosButton.textContent = 'Gerenciar Funcionários';
        gerenciarFuncionariosButton.addEventListener('click', this.create_employee_management_screen.bind(this));
        divBotoes.appendChild(gerenciarFuncionariosButton);

        const gerenciarClientesButton = document.createElement('button');
        gerenciarClientesButton.textContent = 'Gerenciar Clientes';
        gerenciarClientesButton.addEventListener('click', this.create_client_management_screen.bind(this));
        divBotoes.appendChild(gerenciarClientesButton);

        const gerenciarDescontosButton = document.createElement('button');
        gerenciarDescontosButton.textContent = 'Gerenciar Descontos';
        gerenciarDescontosButton.addEventListener('click', this.create_discount_management_screen.bind(this));
        divBotoes.appendChild(gerenciarDescontosButton);

        const registrarVendaButton = document.createElement('button');
        registrarVendaButton.textContent = 'Registrar Venda';
        registrarVendaButton.addEventListener('click', this.create_sell_registration_form.bind(this));
        divBotoes.appendChild(registrarVendaButton);

        const reembolsarButton = document.createElement('button');
        reembolsarButton.textContent = 'Reembolsar';
        reembolsarButton.addEventListener('click', this.create_refund_form.bind(this));
        divBotoes.appendChild(reembolsarButton);

        const mostrarRelatorioButton = document.createElement('button');
        mostrarRelatorioButton.textContent = 'Mostrar Relatório';
        mostrarRelatorioButton.addEventListener('click', this.create_monthly_report.bind(this));
        divBotoes.appendChild(mostrarRelatorioButton);

        const botaoLogin = document.createElement('button');
        botaoLogin.textContent = 'Login';
        botaoLogin.addEventListener('click', this.create_login_form.bind(this));
        divBotoes.appendChild(botaoLogin);

        const botaoCadastro = document.createElement('button');
        botaoCadastro.textContent = 'Cadastro';
        botaoCadastro.addEventListener('click', this.create_employee_registration_form.bind(this));
        divBotoes.appendChild(botaoCadastro);
    
        header.appendChild(divBotoes);
        document.body.appendChild(header);
    }
    
    create_login_form() {
        this.clear_body()

        const loginForm = document.createElement('div');
        loginForm.className = 'login-form';

        const title = document.createElement('h1');
        title.textContent = 'Login';
        loginForm.appendChild(title);

        const usernameLabel = document.createElement('label');
        usernameLabel.textContent = 'Usuário:';
        loginForm.appendChild(usernameLabel);

        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.id = 'username';
        loginForm.appendChild(usernameInput);

        const passwordLabel = document.createElement('label');
        passwordLabel.textContent = 'Senha:';
        loginForm.appendChild(passwordLabel);

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        loginForm.appendChild(passwordInput);

        const loginButton = document.createElement('button');
        loginButton.textContent = 'Logar';
        loginButton.addEventListener('click', () => {
            const username = (document.getElementById('username') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            this.logando(username, password);
        });
        loginForm.appendChild(loginButton);

        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        loginForm.appendChild(voltarButton);

        document.body.appendChild(loginForm);
    }

    //CLIENTE

    create_client_management_screen() {
        this.clear_body()

        const clientManagementScreen = document.createElement('div');
        clientManagementScreen.className = 'client-management-screen';
    
        const title = document.createElement('h1');
        title.textContent = 'Gerenciar Clientes';
        clientManagementScreen.appendChild(title);
    
        const registrarButton = document.createElement('button');
        registrarButton.textContent = 'Registrar';
        registrarButton.addEventListener('click', this.create_client_registration_form.bind(this));
        clientManagementScreen.appendChild(registrarButton);
    
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', this.create_client_removal_form.bind(this));
        clientManagementScreen.appendChild(removerButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        clientManagementScreen.appendChild(voltarButton);
    
        document.body.appendChild(clientManagementScreen);
    }

    create_client_registration_form(){
        this.clear_body()

        const registrationForm = document.createElement('div');
        registrationForm.className = 'cliente-registration-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Cadastrar Cliente';
        registrationForm.appendChild(title);
    
        const cpfLabel = document.createElement('label');
        cpfLabel.textContent = 'CPF Cliente:';
        registrationForm.appendChild(cpfLabel);
    
        const cpfInput = document.createElement('input');
        cpfInput.type = 'number';
        cpfInput.id = 'cpfCliente';
        registrationForm.appendChild(cpfInput);
    
        const cadastrarButton = document.createElement('button');
        cadastrarButton.textContent = 'Cadastrar';
        cadastrarButton.addEventListener('click', () => {
            const cpfCliente = (document.getElementById('cpfCliente') as HTMLInputElement).valueAsNumber;
            this.cadastrandoCliente(cpfCliente);
        });
        registrationForm.appendChild(cadastrarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_client_management_screen.bind(this));
        registrationForm.appendChild(voltarButton);
        
        document.body.appendChild(registrationForm);
    }

    create_client_removal_form() {
        this.clear_body()

        const removalForm = document.createElement('div');
        removalForm.className = 'cliente-removal-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Remover Cliente';
        removalForm.appendChild(title);
    
        const cpfLabel = document.createElement('label');
        cpfLabel.textContent = 'CPF Cliente:';
        removalForm.appendChild(cpfLabel);
    
        const cpfInput = document.createElement('input');
        cpfInput.type = 'number';
        cpfInput.id = 'cpfCliente';
        removalForm.appendChild(cpfInput);
    
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', () => {
            const cpfCliente = (document.getElementById('cpfCliente') as HTMLInputElement).valueAsNumber;
            this.removendoCliente(cpfCliente);
        });
        removalForm.appendChild(removerButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_client_management_screen.bind(this));
        removalForm.appendChild(voltarButton);
        
        document.body.appendChild(removalForm);
    }

    //PRODUTO

    create_product_management_screen() {
        this.clear_body()

        const productManagementScreen = document.createElement('div');
        productManagementScreen.className = 'product-management-screen';
    
        const title = document.createElement('h1');
        title.textContent = 'Gerenciar Produtos';
        productManagementScreen.appendChild(title);
    
        const registrarButton = document.createElement('button');
        registrarButton.textContent = 'Registrar';
        registrarButton.addEventListener('click', this.create_product_registration_form.bind(this));
        productManagementScreen.appendChild(registrarButton);
    
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', this.create_product_removal_form.bind(this));
        productManagementScreen.appendChild(removerButton);
    
        const atualizarButton = document.createElement('button');
        atualizarButton.textContent = 'Atualizar';
        atualizarButton.addEventListener('click', this.create_product_update_form.bind(this));
        productManagementScreen.appendChild(atualizarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        productManagementScreen.appendChild(voltarButton);
    
        document.body.appendChild(productManagementScreen);
    }

    create_product_registration_form() {
        this.clear_body()

        const registrationForm = document.createElement('div');
        registrationForm.className = 'produto-registration-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Cadastrar Produto';
        registrationForm.appendChild(title);
    
        const nomeLabel = document.createElement('label');
        nomeLabel.textContent = 'Nome:';
        registrationForm.appendChild(nomeLabel);
    
        const nomeInput = document.createElement('input');
        nomeInput.type = 'text';
        nomeInput.id = 'nome';
        registrationForm.appendChild(nomeInput);
    
        const valorLabel = document.createElement('label');
        valorLabel.textContent = 'Valor:';
        registrationForm.appendChild(valorLabel);
    
        const valorInput = document.createElement('input');
        valorInput.type = 'number';
        valorInput.step = '0.01';
        valorInput.id = 'valor';
        registrationForm.appendChild(valorInput);
    
        const quantidadeLabel = document.createElement('label');
        quantidadeLabel.textContent = 'Quantidade:';
        registrationForm.appendChild(quantidadeLabel);
    
        const quantidadeInput = document.createElement('input');
        quantidadeInput.type = 'number';
        quantidadeInput.id = 'quantidade';
        registrationForm.appendChild(quantidadeInput);
    
        const cadastrarButton = document.createElement('button');
        cadastrarButton.textContent = 'Cadastrar';
        cadastrarButton.addEventListener('click', () => {
            const nome = (document.getElementById('nome') as HTMLInputElement).value;
            const valor = (document.getElementById('valor') as HTMLInputElement).valueAsNumber;
            const quantidade = (document.getElementById('quantidade') as HTMLInputElement).valueAsNumber;
            this.cadastrandoProduto(nome, valor, quantidade);
        });
        registrationForm.appendChild(cadastrarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_product_management_screen.bind(this));
        registrationForm.appendChild(voltarButton);
        
        document.body.appendChild(registrationForm);
    }

    create_product_removal_form() {
        this.clear_body()

        const removalForm = document.createElement('div');
        removalForm.className = 'produto-removal-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Remover Produto';
        removalForm.appendChild(title);
    
        const idLabel = document.createElement('label');
        idLabel.textContent = 'ID:';
        removalForm.appendChild(idLabel);
    
        const idInput = document.createElement('input');
        idInput.type = 'number';
        idInput.id = 'id';
        removalForm.appendChild(idInput);
    
        const removerButton = document.createElement('button');
            removerButton.textContent = 'Remover';
            removerButton.addEventListener('click', () => {
            const id = (document.getElementById('id') as HTMLInputElement).valueAsNumber;
            this.removendoProduto(id);
        });
        removalForm.appendChild(removerButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_product_management_screen.bind(this));
        removalForm.appendChild(voltarButton);
    
        document.body.appendChild(removalForm);
    }

    create_product_update_form() {
        this.clear_body()

        const updateForm = document.createElement('div');
        updateForm.className = 'produto-update-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Atualizar Produto';
        updateForm.appendChild(title);
    
        const idLabel = document.createElement('label');
        idLabel.textContent = 'ID:';
        updateForm.appendChild(idLabel);
    
        const idInput = document.createElement('input');
        idInput.type = 'number';
        idInput.id = 'id';
        updateForm.appendChild(idInput);
    
        const valorLabel = document.createElement('label');
        valorLabel.textContent = 'Valor:';
        updateForm.appendChild(valorLabel);
    
        const valorInput = document.createElement('input');
        valorInput.type = 'number';
        valorInput.step = '0.01';
        valorInput.id = 'valor';
        updateForm.appendChild(valorInput);
    
        const quantidadeLabel = document.createElement('label');
        quantidadeLabel.textContent = 'Quantidade:';
        updateForm.appendChild(quantidadeLabel);
    
        const quantidadeInput = document.createElement('input');
        quantidadeInput.type = 'number';
        quantidadeInput.id = 'quantidade';
        updateForm.appendChild(quantidadeInput);
    
        const atualizarButton = document.createElement('button');
        atualizarButton.textContent = 'Atualizar';
        atualizarButton.addEventListener('click', () => {
            const id = (document.getElementById('id') as HTMLInputElement).valueAsNumber;
            const valor = (document.getElementById('valor') as HTMLInputElement).valueAsNumber;
            const quantidade = (document.getElementById('quantidade') as HTMLInputElement).valueAsNumber;
            this.atualizandoProduto(id, valor, quantidade);
        });
        updateForm.appendChild(atualizarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_product_management_screen.bind(this));
        updateForm.appendChild(voltarButton);
    
        document.body.appendChild(updateForm);
    }

    create_product_list() {
        this.clear_body()

    }

    //FUNCIONARIO

    create_employee_management_screen() {
        this.clear_body()

        const employeeManagementScreen = document.createElement('div');
        employeeManagementScreen.className = 'employee-management-screen';
    
        const title = document.createElement('h1');
        title.textContent = 'Gerenciar Funcionários';
        employeeManagementScreen.appendChild(title);
    
        const registrarButton = document.createElement('button');
        registrarButton.textContent = 'Registrar';
        registrarButton.addEventListener('click', this.create_employee_registration_form.bind(this));
        employeeManagementScreen.appendChild(registrarButton);
    
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', this.create_employee_removal_form.bind(this));
        employeeManagementScreen.appendChild(removerButton);
    
        const atualizarButton = document.createElement('button');
        atualizarButton.textContent = 'Atualizar';
        atualizarButton.addEventListener('click', this.create_employee_update_form.bind(this));
        employeeManagementScreen.appendChild(atualizarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        employeeManagementScreen.appendChild(voltarButton);
    
        document.body.appendChild(employeeManagementScreen);
    }

    create_employee_registration_form() {
        this.clear_body()

        const registrationForm = document.createElement('div');
        registrationForm.className = 'registration-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Cadastrar Funcionário';
        registrationForm.appendChild(title);
    
        const cpfLabel = document.createElement('label');
        cpfLabel.textContent = 'CPF:';
        registrationForm.appendChild(cpfLabel);
    
        const cpfInput = document.createElement('input');
        cpfInput.type = 'text';
        cpfInput.id = 'cpf';
        registrationForm.appendChild(cpfInput);
    
        const usernameLabel = document.createElement('label');
        usernameLabel.textContent = 'Usuário:';
        registrationForm.appendChild(usernameLabel);
    
        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.id = 'username';
        registrationForm.appendChild(usernameInput);
    
        const passwordLabel = document.createElement('label');
        passwordLabel.textContent = 'Senha:';
        registrationForm.appendChild(passwordLabel);
    
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        registrationForm.appendChild(passwordInput);
    
        const admCheckboxLabel = document.createElement('label');
        admCheckboxLabel.textContent = 'Administrador:';
        registrationForm.appendChild(admCheckboxLabel);
    
        const admCheckbox = document.createElement('input');
        admCheckbox.type = 'checkbox';
        admCheckbox.id = 'adm';
        registrationForm.appendChild(admCheckbox);
    
        const registerButton = document.createElement('button');
        registerButton.textContent = 'Cadastrar';
        registerButton.addEventListener('click', () => {
            const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
            const username = (document.getElementById('username') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            const isAdmin = (document.getElementById('adm') as HTMLInputElement).checked;
            this.cadastrando(cpf, username, password, isAdmin);
        });
        registrationForm.appendChild(registerButton);

        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_employee_management_screen.bind(this));
        registrationForm.appendChild(voltarButton);

        document.body.appendChild(registrationForm);
    }

    create_employee_removal_form() {
        this.clear_body()

        const removalForm = document.createElement('div');
        removalForm.className = 'funcionario-removal-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Remover Funcionário';
        removalForm.appendChild(title);
    
        const cpfLabel = document.createElement('label');
        cpfLabel.textContent = 'CPF:';
        removalForm.appendChild(cpfLabel);
    
        const cpfInput = document.createElement('input');
        cpfInput.type = 'number';
        cpfInput.id = 'cpf';
        removalForm.appendChild(cpfInput);
    
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', () => {
        const cpf = (document.getElementById('cpf') as HTMLInputElement).valueAsNumber;
        this.removendoFuncionario(cpf);
        });
        removalForm.appendChild(removerButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_employee_management_screen.bind(this));
        removalForm.appendChild(voltarButton);
    
        document.body.appendChild(removalForm);
    }

    create_employee_update_form() {
        this.clear_body()

        const updateForm = document.createElement('div');
        updateForm.className = 'funcionario-update-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Atualizar Funcionário';
        updateForm.appendChild(title);
    
        const loginLabel = document.createElement('label');
        loginLabel.textContent = 'Login:';
        updateForm.appendChild(loginLabel);
    
        const loginInput = document.createElement('input');
        loginInput.type = 'text';
        loginInput.id = 'login';
        updateForm.appendChild(loginInput);
    
        const senhaLabel = document.createElement('label');
        senhaLabel.textContent = 'Senha:';
        updateForm.appendChild(senhaLabel);
    
        const senhaInput = document.createElement('input');
        senhaInput.type = 'password';
        senhaInput.id = 'senha';
        updateForm.appendChild(senhaInput);
    
        const atualizarButton = document.createElement('button');
        atualizarButton.textContent = 'Atualizar';
        atualizarButton.addEventListener('click', () => {
        const login = (document.getElementById('login') as HTMLInputElement).value;
        const senha = (document.getElementById('senha') as HTMLInputElement).value;
        this.atualizandoFuncionario(login, senha);
        });
        updateForm.appendChild(atualizarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_employee_management_screen.bind(this));
        updateForm.appendChild(voltarButton);
    
        document.body.appendChild(updateForm);
    }

    create_employee_list() {
        this.clear_body()

    }

    //DESCONTO

    create_discount_management_screen() {
        this.clear_body()

        const discountManagementScreen = document.createElement('div');
        discountManagementScreen.className = 'discount-management-screen';
    
        const title = document.createElement('h1');
        title.textContent = 'Gerenciar Descontos';
        discountManagementScreen.appendChild(title);
    
        const registrarButton = document.createElement('button');
        registrarButton.textContent = 'Registrar';
        registrarButton.addEventListener('click', this.create_discount_registration_form.bind(this));
        discountManagementScreen.appendChild(registrarButton);
    
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', this.create_discount_removal_form.bind(this));
        discountManagementScreen.appendChild(removerButton);
    
        const atualizarButton = document.createElement('button');
        atualizarButton.textContent = 'Atualizar';
        atualizarButton.addEventListener('click', this.create_discount_update_form.bind(this));
        discountManagementScreen.appendChild(atualizarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        discountManagementScreen.appendChild(voltarButton);
    
        document.body.appendChild(discountManagementScreen);
    }

    create_discount_registration_form() {
        this.clear_body()

        const cadastroForm = document.createElement('div');
        cadastroForm.className = 'desconto-cadastro-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Cadastrar Desconto';
        cadastroForm.appendChild(title);
    
        const idProdutoLabel = document.createElement('label');
        idProdutoLabel.textContent = 'ID Produto:';
        cadastroForm.appendChild(idProdutoLabel);
    
        const idProdutoInput = document.createElement('input');
        idProdutoInput.type = 'number';
        idProdutoInput.id = 'idProduto';
        cadastroForm.appendChild(idProdutoInput);
    
        const porcentagemLabel = document.createElement('label');
        porcentagemLabel.textContent = 'Porcentagem:';
        cadastroForm.appendChild(porcentagemLabel);
    
        const porcentagemInput = document.createElement('input');
        porcentagemInput.type = 'number';
        porcentagemInput.step = '0.01';
        porcentagemInput.id = 'porcentagem';
        cadastroForm.appendChild(porcentagemInput);
    
        const cadastrarButton = document.createElement('button');
        cadastrarButton.textContent = 'Cadastrar';
        cadastrarButton.addEventListener('click', () => {
            const idProduto = (document.getElementById('idProduto') as HTMLInputElement).valueAsNumber;
            const porcentagem = (document.getElementById('porcentagem') as HTMLInputElement).valueAsNumber;
            this.cadastrandoDesconto(idProduto, porcentagem);
        });
        cadastroForm.appendChild(cadastrarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_discount_management_screen.bind(this));
        cadastroForm.appendChild(voltarButton);
    
        document.body.appendChild(cadastroForm);
    }

    create_discount_removal_form() {
        this.clear_body()

        const removalForm = document.createElement('div');
        removalForm.className = 'desconto-removal-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Remover Desconto';
        removalForm.appendChild(title);
    
        const idProdutoLabel = document.createElement('label');
        idProdutoLabel.textContent = 'ID Produto:';
        removalForm.appendChild(idProdutoLabel);
    
        const idProdutoInput = document.createElement('input');
        idProdutoInput.type = 'number';
        idProdutoInput.id = 'idProduto';
        removalForm.appendChild(idProdutoInput);
    
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', () => {
        const idProduto = (document.getElementById('idProduto') as HTMLInputElement).valueAsNumber;
        this.removendoDesconto(idProduto);
        });
        removalForm.appendChild(removerButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_discount_management_screen.bind(this));
        removalForm.appendChild(voltarButton);
    
        document.body.appendChild(removalForm);
    }

    create_discount_update_form() {
        this.clear_body()

        const alteracaoForm = document.createElement('div');
        alteracaoForm.className = 'desconto-alteracao-form';
    
        const title = document.createElement('h1');
        title.textContent = 'Alterar Desconto';
        alteracaoForm.appendChild(title);
    
        const idProdutoLabel = document.createElement('label');
        idProdutoLabel.textContent = 'ID Produto:';
        alteracaoForm.appendChild(idProdutoLabel);
    
        const idProdutoInput = document.createElement('input');
        idProdutoInput.type = 'number';
        idProdutoInput.id = 'idProduto';
        alteracaoForm.appendChild(idProdutoInput);
    
        const porcentagemLabel = document.createElement('label');
        porcentagemLabel.textContent = 'Porcentagem:';
        alteracaoForm.appendChild(porcentagemLabel);
    
        const porcentagemInput = document.createElement('input');
        porcentagemInput.type = 'number';
        porcentagemInput.step = '0.01';
        porcentagemInput.id = 'porcentagem';
        alteracaoForm.appendChild(porcentagemInput);
    
        const alterarButton = document.createElement('button');
        alterarButton.textContent = 'Alterar';
        alterarButton.addEventListener('click', () => {
            const idProduto = (document.getElementById('idProduto') as HTMLInputElement).valueAsNumber;
            const porcentagem = (document.getElementById('porcentagem') as HTMLInputElement).valueAsNumber;
            this.alterandoDesconto(idProduto, porcentagem);
        });
        alteracaoForm.appendChild(alterarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_discount_management_screen.bind(this));
        alteracaoForm.appendChild(voltarButton);
    
        document.body.appendChild(alteracaoForm);
    }
    
    create_discount_list() {
        this.clear_body()

    }

    //VENDA

    create_sell_registration_form() {
        this.clear_body()

    }

    create_refund_form() {
        this.clear_body()

        const reembolsoForm = document.createElement('div');
        reembolsoForm.className = 'reembolso-form';

        const title = document.createElement('h1');
        title.textContent = 'Reembolso';
        reembolsoForm.appendChild(title);

        const vendaNumeroLabel = document.createElement('label');
        vendaNumeroLabel.textContent = 'Nº da Venda:';
        reembolsoForm.appendChild(vendaNumeroLabel);

        const vendaNumeroInput = document.createElement('input');
        vendaNumeroInput.type = 'number';
        vendaNumeroInput.id = 'vendaNumero';
        reembolsoForm.appendChild(vendaNumeroInput);

        const reembolsarButton = document.createElement('button');
        reembolsarButton.textContent = 'Reembolsar';
        reembolsarButton.addEventListener('click', () => {
            const vendaNumero = (document.getElementById('vendaNumero') as HTMLInputElement).valueAsNumber;
            this.reembolsando(vendaNumero);
        });
        reembolsoForm.appendChild(reembolsarButton);

        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        reembolsoForm.appendChild(voltarButton);

        document.body.appendChild(reembolsoForm);
    }

    create_monthly_report() {
        this.clear_body()

    }


    //As funções não devem ter chamada da API elas devem apenas chamar as funções de classes presentes no nosso diagrama de classes
    //e elas por sua vez farão toda lógica e retornarão apenas o que será mostrado.

    cadastrandoCliente(cpfCliente: number) {
        console.log(`CPF Cliente: ${cpfCliente}`);
    }

    cadastrando(cpf: string, username: string, password: string, isAdmin: boolean) {
        console.log(`CPF: ${cpf}, Usuário: ${username}, Senha: ${password}, Administrador: ${isAdmin}`);
    }


    logando(username: string, password: string) {
        console.log(`Usuário: ${username}, Senha: ${password}`);
    }

    removendoCliente(cpfCliente: number) {
        console.log(`CPF Cliente removido: ${cpfCliente}`);
    }

    cadastrandoProduto(nome: string, valor: number, quantidade: number) {
        console.log(`Nome: ${nome}, Valor: ${valor}, Quantidade: ${quantidade}`);
    }

    removendoProduto(id: number) {
        console.log(`ID do produto removido: ${id}`);
    }

    atualizandoProduto(id: number, valor: number, quantidade: number) {
        console.log(`ID: ${id}, Valor: ${valor}, Quantidade: ${quantidade}`);
    }

    removendoFuncionario(cpf: number) {
        console.log(`CPF do funcionário removido: ${cpf}`);
    }

    atualizandoFuncionario(login: string, senha: string) {
        console.log(`Login: ${login}, Senha: ${senha}`);
    }

    cadastrandoDesconto(idProduto: number, porcentagem: number) {
        console.log(`ID Produto: ${idProduto}, Porcentagem: ${porcentagem}`);
    }

    removendoDesconto(idProduto: number) {
        console.log(`ID Produto: ${idProduto}`);
    }

    alterandoDesconto(idProduto: number, porcentagem: number) {
        console.log(`ID Produto: ${idProduto}, Porcentagem: ${porcentagem}`);
    }

    reembolsando(vendaNumero: number) {
        console.log(`Nº da Venda: ${vendaNumero}`);
    }
}

const my_app = new App()

class Caixa {
    funcionarioAtivo: Funcionario | null;
    listaVendas: Venda[];
    status: boolean = false

    constructor() {
      this.funcionarioAtivo = null;
      this.listaVendas = [];
    }

    getStatus() : boolean {
        return this.status
    }

    setStatus() {
        if (this.status === true) {
            this.status = false
        } else {
            this.status = true
        }
    }

    async cadastraVenda(
      valorVenda: number,
      idCliente: number,
      idFuncionario: number,
      data: string,
      produtos: number[]
    ): Promise<void> {
        try {
            const response: AxiosResponse<any> = await axios.post(
            'http://localhost:8000/vendas/', // URL da API local
            {
                valor_venda: valorVenda,
                id_cliente: idCliente,
                id_funcionario: idFuncionario,
                data: data,
                produtos: produtos,
            },
            { headers: { 'Content-Type': 'application/json' } }
            );
    
            if (response.status === 201) {
            console.log('Venda criada com sucesso!');
            } else {
            console.error(`Erro ao criar venda: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Erro ao criar venda: ${error.message}`);
        }
    }
  
    async consultaVenda(vendaId: number): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.get(
            `http://localhost:8000/vendas/${vendaId}`, // URL da API local com o ID da venda
            { headers: { 'Content-Type': 'application/json' } }
            );
    
            if (response.status === 200) {
            console.log('Venda obtida com sucesso!');
            console.log(response.data);
            return response.data;
            } else {
            if (response.status === 404) {
                console.error('Venda não encontrada.');
                return null;
            } else {
                console.error(`Erro ao obter venda: ${response.statusText}`);
                return null;
            }
            }
        } catch (error) {
            console.error(`Erro ao obter venda: ${error.message}`);
            return null;
        }
    }
  
    async removeVenda(vendaId: number): Promise<void> {
        try {
            const response: AxiosResponse<any> = await axios.delete(
            `http://localhost:8000/vendas/${vendaId}`, // URL da API local com o ID da venda
            { headers: { 'Content-Type': 'application/json' } }
            );
    
            if (response.status === 204) {
            console.log('Venda deletada com sucesso!');
            } else {
            if (response.status === 404) {
                console.error('Venda não encontrada.');
            } else {
                console.error(`Erro ao deletar venda: ${response.statusText}`);
            }
            }
        } catch (error) {
            console.error(`Erro ao deletar venda: ${error.message}`);
        }
    }

    async consultaDesconto(idProduto: number): Promise<number> {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `http://localhost:8000/descontos/${idProduto}`, // URL da API local com o ID do produto
                { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.status === 200) {
                const desconto = response.data.porcentagem;
                return desconto;
            } else {
                if (response.status === 404) {
                console.error('Desconto não encontrado para o produto.');
                return 0;
                } else {
                console.error(`Erro ao consultar desconto: ${response.statusText}`);
                return 0;
                }
            }
        } catch (error) {
            console.error(`Erro ao consultar desconto: ${error.message}`);
            return 0;
        }
    }

    async consultaFidelidade(cpfCliente: number): Promise<number> {
        try {
            const response: AxiosResponse<number> = await axios.get(
                `http://localhost:8000/fidelidade-cliente/${cpfCliente}`, // URL da API local com o CPF do cliente
                { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.status === 200) {
                const porcentagemDesconto = response.data;
                return porcentagemDesconto;
            } else {
                if (response.status === 404) {
                console.error('Cliente não encontrado no programa de fidelidade.');
                return 0;
                } else {
                console.error(`Erro ao consultar fidelidade: ${response.statusText}`);
                return 0;
                }
            }
        } catch (error) {
            console.error(`Erro ao consultar fidelidade: ${error.message}`);
            return 0;
        }
    }

    async validaLogin(login: string, senha: string): Promise<boolean> {
        try {
            const response: AxiosResponse<any> = await axios.post(
                `http://localhost:8000/login/${login}/${senha}`, // URL da API local com login e senha
                { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.status === 200) {
                const dadosFuncionario = response.data.funcionario;
                const cpf = dadosFuncionario.cpf;
                const loginFuncionario = dadosFuncionario.login;
                const isAdm = dadosFuncionario.isAdm;
        
                if (isAdm) {
                this.funcionarioAtivo = new Gerente(cpf, loginFuncionario);
                } else {
                this.funcionarioAtivo = new Funcionario(cpf, loginFuncionario);
                }
        
                console.log('Login efetuado com sucesso!');
                return true;
            } else {
                console.error(`Erro ao validar login: ${response.statusText}`);
                return false;
            }
        } catch (error) {
            console.error(`Erro ao validar login: ${error.message}`);
            return false;
        }
    }

    async consultaProduto(idProduto: number): Promise<Produto | null> {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `http://localhost:8000/produtos/${idProduto}`, // URL da API local com o ID do produto
                { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.status === 200) {
                const produtoData = response.data;
                const produto = new Produto(
                produtoData.id_produto,
                produtoData.valor,
                produtoData.quantidade
                );
                return produto;
            } else {
                if (response.status === 404) {
                console.error('Produto não encontrado.');
                return null;
                } else {
                console.error(`Erro ao consultar produto: ${response.statusText}`);
                return null;
                }
            }
        } catch (error) {
            console.error(`Erro ao consultar produto: ${error.message}`);
            return null;
        }
    }
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

    async pegaRelatorio(ano: number, mes: number): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `http://localhost:8000/relatorio-vendas/${mes}/${ano}`, // URL da API local com ano e mês
                { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.status === 200) {
                console.log('Relatório de vendas obtido com sucesso!');
                console.log(response.data);
            } else {
                if (response.status === 404) {
                console.error(`Nenhuma venda encontrada para o mês ${mes} do ano ${ano}`);
                } else {
                console.error(`Erro ao obter relatório: ${response.statusText}`);
                }
            }
        } catch (error) {
            console.error(`Erro ao obter relatório: ${error.message}`);
        }
    }

    requisitaReembolso(): void {
        // Implementação do método requisitaReembolso
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

    async consultaFuncionario(cpfFuncionario: number): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `http://localhost:8000/funcionarios/${cpfFuncionario}/`, // URL da API local com o CPF
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            if (response.status === 200) {
                console.log(`Funcionário com CPF ${cpfFuncionario}:`);
                console.log(response.data);
            } else {
                if (response.status === 404) {
                console.error(`Funcionário com CPF ${cpfFuncionario} não encontrado.`);
                } else {
                console.error(`Erro ao consultar funcionário: ${response.statusText}`);
                }
            }
        } catch (error) {
            console.error(`Erro ao consultar funcionário: ${error.message}`);
        }
    }
  
    alteraFuncionario(): void {
      // Implementação do método alteraFuncionario
    }
  
    removeFuncionario(): void {
      // Implementação do método removeFuncionario
    }
  
    async cadastraDesconto(idProduto: number, porcentagem: number): Promise<void> {
        try {
            const response: AxiosResponse<any> = await axios.post(
                'http://localhost:8000/descontos/', // URL da API local
                {
                    id_produto: idProduto,
                    porcentagem,
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.status === 201) {
                console.log('Desconto cadastrado com sucesso!');
            } else {
                console.error(`Erro ao cadastrar desconto: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Erro ao cadastrar desconto: ${error.message}`);
        }
    }
  
    async alteraDesconto(
        idDesconto: number,
        porcentagem: number,
        idProduto: number
      ): Promise<void> {
        try {
            const response: AxiosResponse<any> = await axios.put(
                `http://localhost:8000/descontos/${idDesconto}`, // URL da API local com o ID do desconto
                {
                porcentagem,
                id_produto: idProduto,
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.status === 200) {
                console.log('Desconto alterado com sucesso!');
            } else {
                if (response.status === 404) {
                console.error('Desconto não encontrado.');
                } else {
                console.error(`Erro ao alterar desconto: ${response.statusText}`);
                }
            }
        } catch (error) {
            console.error(`Erro ao alterar desconto: ${error.message}`);
        }
    }
  
    async removeDesconto(idDesconto: number): Promise<void> {
        try {
            const response: AxiosResponse<any> = await axios.delete(
                `http://localhost:8000/descontos/${idDesconto}`, // URL da API local com o ID do desconto
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            if (response.status === 204) {
                console.log('Desconto removido com sucesso!');
            } else {
                console.error(`Erro ao remover desconto: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Erro ao remover desconto: ${error.message}`);
        }
    }

    async cadastraProduto(
        quantidade: number,
        valor: number,
        nome: string
      ): Promise<void> {
        try {
            const response: AxiosResponse<any> = await axios.post(
                'http://localhost:8000/produtos/', // URL da API local
                {
                quantidade_estoque: quantidade, // Envia a quantidade como parâmetro
                valor, // Envia o valor como parâmetro
                nome, // Envia o nome como parâmetro
                },
                { headers: { 'Content-Type': 'application/json' } } // Cabeçalho para JSON
            );
    
            if (response.status === 201) { // Verifica se a requisição foi bem-sucedida (código 201)
                console.log('Produto cadastrado com sucesso!');
            } else {
                console.error(`Erro ao cadastrar produto: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Erro ao cadastrar produto: ${error.message}`);
        }
    }
  
    async removeProduto(idProduto: number): Promise<void> {
        try {
            const response: AxiosResponse<any> = await axios.delete(
                `http://localhost:8000/produtos/${idProduto}`, // URL da API local com o ID do produto
                { headers: { 'Content-Type': 'application/json' } } // Cabeçalho para JSON
            );
        
            if (response.status === 204) { // Verifica se a requisição foi bem-sucedida (código 204)
                console.log('Produto removido com sucesso!');
            } else {
                if (response.status === 404) {
                console.error('Produto não encontrado.');
                } else {
                console.error(`Erro ao remover produto: ${response.statusText}`);
                }
            }
        } catch (error) {
            console.error(`Erro ao remover produto: ${error.message}`);
        }
    }
}

my_app.create_start_screen()