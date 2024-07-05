//A classe app tem como objetivo gerenciar a navegação pelas páginas da aplicação e chamar caixa para realizar alguma ação quando o usuário clicar em um botão

class App {
    caixa: Caixa = Caixa.getInstance();
    constrVenda: ConstrutorVenda = new ConstrutorVenda();

    constructor() {
        this.constrVenda.registrarObservador(this.caixa);
    }

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
        
        //somente logado
        const funcionario = this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario) {
            const gerenciarClientesButton = document.createElement('button');
            gerenciarClientesButton.textContent = 'Gerenciar Clientes';
            gerenciarClientesButton.addEventListener('click', this.create_client_management_screen.bind(this));
            divBotoes.appendChild(gerenciarClientesButton);

            const mostrarRelatorioButton = document.createElement('button');
            mostrarRelatorioButton.textContent = 'Mostrar Relatório';
            mostrarRelatorioButton.addEventListener('click', this.create_monthly_report.bind(this));
            divBotoes.appendChild(mostrarRelatorioButton);
            
            //Somente se o caixa estiver aberto
            if(this.caixa.getStatus() == true) {
                const registrarVendaButton = document.createElement('button');
                registrarVendaButton.textContent = 'Registrar Venda';
                registrarVendaButton.addEventListener('click', this.create_sell_registration_form.bind(this));
                divBotoes.appendChild(registrarVendaButton);

                const fecharCaixaButton = document.createElement('button');
                fecharCaixaButton.textContent = 'Fechar Caixa';
                fecharCaixaButton.addEventListener('click', () => {
                    this.caixa.trocarStatus();
                    this.create_start_screen();
                });
                divBotoes.appendChild(fecharCaixaButton);

                const reembolsarButton = document.createElement('button');
                reembolsarButton.textContent = 'Reembolsar';
                reembolsarButton.addEventListener('click', this.create_refund_form.bind(this));
                divBotoes.appendChild(reembolsarButton);
                
                
            } else {
                const abrirCaixaButton = document.createElement('button');
                abrirCaixaButton.textContent = 'Abrir Caixa';
                abrirCaixaButton.addEventListener('click', () => {
                    this.caixa.trocarStatus()
                    this.create_start_screen();
                });
                divBotoes.appendChild(abrirCaixaButton);
            }

            //Somente gerente
            if(funcionario.getTipoFuncionario() == "Gerente") {
                const gerenciarProdutosButton = document.createElement('button');
                gerenciarProdutosButton.textContent = 'Gerenciar Produtos';
                gerenciarProdutosButton.addEventListener('click', this.create_product_management_screen.bind(this));
                divBotoes.appendChild(gerenciarProdutosButton);
            
                const gerenciarFuncionariosButton = document.createElement('button');
                gerenciarFuncionariosButton.textContent = 'Gerenciar Funcionários';
                gerenciarFuncionariosButton.addEventListener('click', this.create_employee_management_screen.bind(this));
                divBotoes.appendChild(gerenciarFuncionariosButton);
            }
        }

        const botaoLogin = document.createElement('button');
        botaoLogin.textContent = 'Login';
        botaoLogin.addEventListener('click', this.create_login_form.bind(this));
        divBotoes.appendChild(botaoLogin);
        
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

        const consultarButton = document.createElement('button');
        consultarButton.textContent = 'Consultar';
        consultarButton.addEventListener('click', this.create_product_list.bind(this));
        productManagementScreen.appendChild(consultarButton);

        const descontosButton = document.createElement('button');
        descontosButton.textContent = 'Gerenciar Descontos';
        descontosButton.addEventListener('click', this.create_discount_management_screen.bind(this));
        productManagementScreen.appendChild(descontosButton);
    
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

    async create_product_list() {
        this.clear_body()

        const header = document.createElement('div');
        header.className = 'header';

        const titulo = document.createElement('h1');
        titulo.textContent = 'Lista de Produtos';
        header.appendChild(titulo);

        document.body.appendChild(header);

        const productsData = await this.listandoProdutos();

        if (!productsData) {
            console.error('Erro ao buscar produtos');
            return;
        }

        // Cria tabela
        const table = document.createElement('table');
        table.className = 'product-list-table';

        // Cria cabeçalho da tabela
        const tableHeader = table.insertRow();
        const headerCells = ['ID Produto', 'Nome', 'Valor', 'Quantidade', 'Desconto'];
        for (const headerCellText of headerCells) {
            const headerCell = tableHeader.insertCell();
            headerCell.textContent = headerCellText;
        }

        // Cria linhas da labela
        for (const product of productsData) {
            const tableRow = table.insertRow();
            const idCell = tableRow.insertCell();
            idCell.textContent = product.id_produto;

            const nameCell = tableRow.insertCell();
            nameCell.textContent = product.nome;

            const priceCell = tableRow.insertCell();
            priceCell.textContent = product.valor.toFixed(2);

            const quantityCell = tableRow.insertCell();
            quantityCell.textContent = `${product.quantidade_estoque}`;
            
            const discountCell = tableRow.insertCell();
            discountCell.textContent = `${product.desconto}`;
        }

        document.body.appendChild(table);

        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        document.body.appendChild(voltarButton);

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

        const consultarButton = document.createElement('button');
        consultarButton.textContent = 'Consultar';
        consultarButton.addEventListener('click', this.create_employee_list.bind(this));
        employeeManagementScreen.appendChild(consultarButton);
    
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
        cpfInput.type = 'number';
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
            const cpf = (document.getElementById('cpf') as HTMLInputElement).valueAsNumber;
            const username = (document.getElementById('username') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            const isAdmin = (document.getElementById('adm') as HTMLInputElement).checked;
            this.cadastrandoFuncionario(cpf, username, password, isAdmin);
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
        
        const cpfLabel = document.createElement('label');
        cpfLabel.textContent = 'CPF:';
        updateForm.appendChild(cpfLabel);
    
        const cpfInput = document.createElement('input');
        cpfInput.type = 'number';
        cpfInput.id = 'cpf';
        updateForm.appendChild(cpfInput);

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
        const cpf = (document.getElementById('cpf') as HTMLInputElement).valueAsNumber;
        const login = (document.getElementById('login') as HTMLInputElement).value;
        const senha = (document.getElementById('senha') as HTMLInputElement).value;
        this.atualizandoFuncionario(cpf, login, senha);
        });
        updateForm.appendChild(atualizarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_employee_management_screen.bind(this));
        updateForm.appendChild(voltarButton);
    
        document.body.appendChild(updateForm);
    }

    async create_employee_list() {
        this.clear_body()

        const header = document.createElement('div');
        header.className = 'header';

        const titulo = document.createElement('h1');
        titulo.textContent = 'Lista de Funcionários';
        header.appendChild(titulo);

        document.body.appendChild(header);

        const employeeData = await this.listandoFuncionarios();

        if (!employeeData) {
            console.error('Erro ao buscar funcionários');
            return;
        }

        // Create the HTML table
        const table = document.createElement('table');
        table.className = 'employee-list-table';

        // Cria cabeçalho da tabela
        const tableHeader = table.insertRow();
        const headerCells = ['CPF', 'Login', 'É Gerente'];
        for (const headerCellText of headerCells) {
            const headerCell = tableHeader.insertCell();
            headerCell.textContent = headerCellText;
        }

        // Cria linhas da tabela
        for (const employee of employeeData) {
            const tableRow = table.insertRow();
            const cpfCell = tableRow.insertCell();
            cpfCell.textContent = employee.cpf;

            const loginCell = tableRow.insertCell();
            loginCell.textContent = employee.login;

            const gerenteCell = tableRow.insertCell();
            gerenteCell.textContent = employee.is_gerente ? 'Sim' : 'Não';
        }

        document.body.appendChild(table);

        // Cria botão voltar
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        document.body.appendChild(voltarButton);
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
        voltarButton.addEventListener('click', this.create_product_management_screen.bind(this));
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
            this.atualizandoDesconto(idProduto, porcentagem);
        });
        alteracaoForm.appendChild(alterarButton);
    
        const voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_discount_management_screen.bind(this));
        alteracaoForm.appendChild(voltarButton);
    
        document.body.appendChild(alteracaoForm);
    }

    //VENDA

    create_sell_registration_form() {
        this.clear_body()
        this.constrVenda.iniciaVenda()

        const sellRegisterScreen = document.createElement('div');
        const productList = document.createElement('div');

        const cpfLabel = document.createElement('label');
        cpfLabel.textContent = 'CPF Cliente:';
        sellRegisterScreen.appendChild(cpfLabel);

        const cpfInput = document.createElement('input');
        cpfInput.type = 'number';
        cpfInput.id = 'cpfCliente';
        sellRegisterScreen.appendChild(cpfInput)

        const idProdutoLabel = document.createElement('label');
        idProdutoLabel.textContent = 'ID do produto:';
        sellRegisterScreen.appendChild(idProdutoLabel);

        const productIdInput = document.createElement('input');
        productIdInput.type = 'number';
        productIdInput.id = 'idProduto';
        sellRegisterScreen.appendChild(productIdInput);

        const qtdProdutoLabel = document.createElement('label');
        qtdProdutoLabel.textContent = 'Quantidade do produto:';
        sellRegisterScreen.appendChild(qtdProdutoLabel);

        const productQtdInput = document.createElement('input');
        productQtdInput.type = 'number';
        productQtdInput.id = 'qtdProduto';
        sellRegisterScreen.appendChild(productQtdInput)

        const addButton = document.createElement('button');
        addButton.textContent = 'Adicionar';
        sellRegisterScreen.appendChild(addButton)

        addButton.addEventListener('click', () => {
            const productId = productIdInput.valueAsNumber;
            const productQtd = productQtdInput.valueAsNumber;
            if (productId) {
                this.constrVenda.adicionarProdutoLido(productId, productQtd)

                const productLabel = document.createElement('label');
                productLabel.textContent = `Produto: ${productId}`;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remover';
                removeButton.addEventListener('click', () => {
                    this.constrVenda.removeProdutoLido(productLabel.textContent)
                    productLabel.remove();
                    removeButton.remove();
                });

                productList.appendChild(productLabel);
                productList.appendChild(removeButton);
            }
        });
        sellRegisterScreen.appendChild(addButton);
        sellRegisterScreen.appendChild(productList);

        const backButton = document.createElement('button');
        backButton.textContent = 'Voltar';
        backButton.addEventListener('click', () => {
            this.constrVenda.cancelaVenda()
            this.create_start_screen();
        });
        sellRegisterScreen.appendChild(backButton)

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Cadastrar';
        submitButton.addEventListener('click', () => {
            const cpfCliente = (document.getElementById('cpfCliente') as HTMLInputElement).valueAsNumber;
            const cpfFuncionario = this.caixa.getFuncionarioAtivo();
            this.cadastrandoVenda(cpfCliente, cpfFuncionario);
        });
        sellRegisterScreen.appendChild(submitButton)

        document.body.appendChild(sellRegisterScreen);
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
        this.clear_body();

        const header = document.createElement('div');
        header.className = 'header';

        const titulo = document.createElement('h1');
        titulo.textContent = 'Relatório de Vendas';
        header.appendChild(titulo);

        document.body.appendChild(header);

        const monthInput = document.createElement('input');
        monthInput.type = 'number';
        monthInput.id = 'monthInput';

        const yearInput = document.createElement('input');
        yearInput.type = 'number';
        yearInput.id = 'yearInput';

        //Botão de gerar relatório
        const buscarRelatorioButton = document.createElement('button');
        buscarRelatorioButton.textContent = 'Buscar Relatório';
        buscarRelatorioButton.addEventListener('click', async () => {
            const selectedMonth = (document.getElementById('monthInput') as HTMLInputElement).valueAsNumber;
            const selectedYear = (document.getElementById('yearInput') as HTMLInputElement).valueAsNumber;

            if (!selectedMonth || !selectedYear) {
                alert('Selecione o mês e o ano para gerar o relatório.');
                return;
            }

            const salesData = await this.criandoRelatorioVendas(selectedMonth, selectedYear);

            if (!salesData) {
                console.error('Error fetching sales data');
                return;
            }

            document.body.removeChild(monthInput);
            document.body.removeChild(yearInput);
            document.body.removeChild(buscarRelatorioButton);

            //Cria tabela de vendas
            const salesTable = document.createElement('table');
            salesTable.className = 'sales-table';

            //Cria cabeçalho da tabela
            const tableHeader = salesTable.insertRow();
            const headerCells = ['Valor da Venda', 'Data', 'ID Cliente', 'ID Funcionário'];
            for (const headerCellText of headerCells) {
                const headerCell = tableHeader.insertCell();
                headerCell.textContent = headerCellText;
            }

            //Cria linhas da tabela
            for (const sale of salesData) {
                const tableRow = salesTable.insertRow();
                const valorVendaCell = tableRow.insertCell();
                valorVendaCell.textContent = sale.valor_venda.toFixed(2);

                const dataCell = tableRow.insertCell();
                dataCell.textContent = sale.data;

                const idClienteCell = tableRow.insertCell();
                idClienteCell.textContent = sale.id_cliente ? sale.id_cliente : '-';

                const idFuncionarioCell = tableRow.insertCell();
                idFuncionarioCell.textContent = sale.id_funcionario;
            }

            document.body.appendChild(salesTable);

            const voltarButton = document.createElement('button');
            voltarButton.textContent = 'Voltar';
            voltarButton.addEventListener('click', this.create_start_screen.bind(this));
            document.body.appendChild(voltarButton);
        });

        // Append elements to the body
        document.body.appendChild(monthInput);
        document.body.appendChild(yearInput);
        document.body.appendChild(buscarRelatorioButton);

    }

    //As funções a seguir devem apenas chamar os métodos das classes onde os códigos foram implementados

    //VENDA
    cadastrandoVenda(cpfCliente: number, cpfFuncionario: number | null) {
        console.log(`Cadastrando compra de ${cpfCliente} gerenciado por ${cpfFuncionario}`)

        if(cpfFuncionario)
        this.constrVenda.encerraConstrucao(cpfCliente, cpfFuncionario)
    }

    async reembolsando(vendaNumero: number) {
        console.log(`Reembolsando venda: ${vendaNumero}`);

        let sucess = false

        sucess = await this.caixa.removeVenda(vendaNumero);

        if(sucess) {
            alert("Venda reembolsada");
            this.create_start_screen();
        } else {
            alert("Falha ao reembolsar cliente");
        }

    }

    async criandoRelatorioVendas(mes: number, ano: number): Promise<any> {
        console.log(`Buscando relatório de vendas de ${mes}/${ano}`);

        const data = await this.caixa.relatorioVendasMensais(mes, ano);

        if(data) {
            alert("Relatório mensal criado");
            console.log(`${data}`);
            return data;
        } else {
            alert("Falha ao buscar relatório mensal");
        }
    }

    //CLIENTE
    async cadastrandoCliente(cpfCliente: number) {
        console.log(`CPF Cliente: ${cpfCliente}`);

        let sucess = false

        const funcionario = await this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario){
            sucess = await funcionario.cadastraCliente(cpfCliente);
        }
        
        if(sucess) {
            alert("Cliente registrado");
            this.create_start_screen();
        } else {
            alert("Falha ao registrar cliente");
        }

    }

    async removendoCliente(cpfCliente: number) {
        console.log(`CPF Cliente removido: ${cpfCliente}`);

        let sucess = false

        const funcionario = await this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario){
            sucess = await funcionario.removeCliente(cpfCliente);
        }

        if(sucess) {
            alert("Cliente removido");
            this.create_start_screen();
        } else {
            alert("Falha ao remover cliente");
        }
    }

    //FUNCIONARIO
    async cadastrandoFuncionario(cpf: number, username: string, password: string, isAdmin: boolean) {
        console.log(`CPF: ${cpf}, Usuário: ${username}, Senha: ${password}, Administrador: ${isAdmin}`);

        let sucess = false

        const funcionario = await this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario){
            sucess = await (funcionario as Gerente).cadastraFuncionario(cpf, username, password,  isAdmin);
        }

        if(sucess) {
            alert("Funcionário registrado");
            this.create_start_screen();
        } else {
            alert("Falha ao registrar funcionário");
        }
    }

    async removendoFuncionario(cpf: number) {
        console.log(`funcionário removido: ${cpf}`);

        let sucess = false

        const funcionario = await this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario){
            sucess = await (funcionario as Gerente).removeFuncionario(cpf);
        }

        if(sucess) {
            alert("Funcionário removido");
            this.create_start_screen();
        } else {
            alert("Falha ao remover funcionário");
        }
    }

    async atualizandoFuncionario(cpf: number, login: string, senha: string) {
        console.log(`Login: ${login}, Senha: ${senha}`);

        let sucess = false

        const funcionario = await this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario){
            sucess = await (funcionario as Gerente).atualizaFuncionario(cpf, login, senha);
        }

        if(sucess) {
            alert("Funcionário atualizado");
            this.create_start_screen();
        } else {
            alert("Falha ao atualizar funcionário");
        }
    }

    async listandoFuncionarios(): Promise <any> {
        const funcionario = this.caixa.getObjetoFuncionarioAtivo();
        
        if(funcionario){
            const data = await (funcionario as Gerente).consultaFuncionarios();

            if(data) {
                alert("Funcionários listados");
                console.log(`${data}`);
                return data;
            } else {
                alert("Falha ao buscar funcionários");
            }
        }
    }

    //PRODUTO
    async cadastrandoProduto(nome: string, valor: number, quantidade: number) {
        console.log(`Nome: ${nome}, Valor: ${valor}, Quantidade: ${quantidade}`);

        let sucess = false

        const funcionario = await this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario){
            sucess = await (funcionario as Gerente).cadastraProduto(nome, valor, quantidade);
        }

        if(sucess) {
            alert("Produto cadastrado");
            this.create_start_screen();
        } else {
            alert("Falha ao cadastrar produto");
        }
    }

    async removendoProduto(id: number) {
        console.log(`ID do produto removido: ${id}`);

        let sucess = false

        const funcionario = await this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario){
            sucess = await (funcionario as Gerente).removeProduto(id);
        }

        if(sucess) {
            alert("Produto removido");
            this.create_start_screen();
        } else {
            alert("Falha ao remover produto");
        }
    }

    async atualizandoProduto(id: number, valor: number, quantidade: number) {
        console.log(`ID: ${id}, Valor: ${valor}, Quantidade: ${quantidade}`);

        let sucess = false

        const funcionario = await this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario){
            sucess = await (funcionario as Gerente).atualizaProduto(id, valor, quantidade);
        }

        if(sucess) {
            alert("Produto atualizado");
            this.create_start_screen();
        } else {
            alert("Falha ao atualizar produto");
        }
    }

    async listandoProdutos(): Promise<any> {
        const funcionario = this.caixa.getObjetoFuncionarioAtivo();
        
        if(funcionario){
            let data = await funcionario.consultaProdutos();
            data = JSON.stringify(data);
            data = JSON.parse(data);

            if(data) {
                alert("Produtos listados");
                console.log(`${data}`);
                return data;
            } else {
                alert("Falha ao buscar produtos");
            }
        }
    }

    //DESCONTO
    async cadastrandoDesconto(idProduto: number, porcentagem: number) {
        console.log(`ID Produto: ${idProduto}, Porcentagem: ${porcentagem}`);

        let sucess = false

        const funcionario = this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario){
            sucess = await (funcionario as Gerente).atualizaDesconto(idProduto, porcentagem);
        }

        if(sucess) {
            alert("Desconto registrado");
            this.create_start_screen();
        } else {
            alert("Falha ao registrar desconto");
        }
    }

    async removendoDesconto(idProduto: number) {
        console.log(`ID Produto: ${idProduto}`);

        let sucess = false

        const funcionario = this.caixa.getObjetoFuncionarioAtivo()
        if(funcionario){
            sucess = await (funcionario as Gerente).atualizaDesconto(idProduto, 0);
        }

        if(sucess) {
            alert("Desconto removido");
            this.create_start_screen();
        } else {
            alert("Falha ao remover desconto");
        }
    }

    async atualizandoDesconto(idProduto: number, porcentagem: number) {
        console.log(`ID Produto: ${idProduto}, Porcentagem: ${porcentagem}`);

        let sucess = false;

        const funcionario = this.caixa.getObjetoFuncionarioAtivo();
        if(funcionario){
            sucess = await (funcionario as Gerente).atualizaDesconto(idProduto, porcentagem);
        }

        if(sucess) {
            alert("Desconto atualizado");
            this.create_start_screen();
        } else {
            alert("Falha ao atualizar desconto");
        }
    }

    listandoDescontos() {}

    //EXTRA
    async logando(username: string, password: string) {
        console.log(`Usuário: ${username}, Senha: ${password}`);

        const sucess = await this.caixa.validaLogin(username, password);

        if(sucess) {
            alert("Funcionario logado");
            this.create_start_screen();
        } else {
            alert("Funcinario não logado");
        }
    }
}


//INTERFACE DAS CLASSES



//IMPLEMENTAÇÃO DAS CLASSES

interface FuncionarioInterface {
    getTipoFuncionario(): string;
}

class Funcionario implements FuncionarioInterface{
    private cpf: number;
    private login: string;
  
    constructor(cpf: number, login: string) {
        this.cpf = cpf;
        this.login = login;
    }
    
    getTipoFuncionario(): string {
        return 'Funcionario';
    }
    getCpf(): number {
        return this.cpf;
    }
    getLogin(): string {
        return this.login;
    }

    //CLIENTE
    async cadastraCliente(cpfCliente: number): Promise<boolean> { //Retorna true ou false
        try {
            const url = ' https://light-killdeer-grateful.ngrok-free.app/clientes/';
            const data = JSON.stringify({ cpf: cpfCliente });
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
                body: data,
            };
            
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(`Cliente com CPF ${cpfCliente} cadastrado com sucesso!`);
                return true
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao cadastrar cliente: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao cadastrar cliente: ${error.message}`);
            return false
        }
    }

    async removeCliente(cpfCliente: number): Promise<boolean> {
        try {
            const url = ' https://light-killdeer-grateful.ngrok-free.app/clientes/';
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
                body: JSON.stringify({ cpf: cpfCliente }),
            };
        
            const response = await fetch(`${url}${cpfCliente}`, options);
        
            if (response.ok) {
                console.log(`Cliente com CPF ${cpfCliente} removido com sucesso!`);
                return true;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao remover cliente: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao remover cliente: ${error.message}`);
            return false;
        }
    }

    //PRODUTOS
    async consultaProdutos(): Promise<any> {
        try {
            const url = ' https://light-killdeer-grateful.ngrok-free.app/produtos/';
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao consultar produtos: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao consultar produtos: ${error.message}`);
            return null;
        }
    }

    //DESCONTOS
    consultaDescontos() {}
}

class Gerente extends Funcionario {
    constructor(cpf: number, login: string) {
      super(cpf, login);
    }
    
    getTipoFuncionario(): string {
        return 'Gerente';
    }

    //FUNCIONARIOS
    async cadastraFuncionario(
        cpf: number,
        login: string,
        senha: string,
        is_gerente: boolean
      ): Promise<boolean> {
        try {
            const url = ' https://light-killdeer-grateful.ngrok-free.app/funcionarios/';
            const data = JSON.stringify({
                cpf: cpf,
                login: login,
                senha: senha,
                is_gerente: is_gerente,
            });
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
                body: data,
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(
                `Funcionário com CPF ${cpf}, username ${login} cadastrado com sucesso!`
                );
                return true;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao cadastrar funcionário: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao cadastrar funcionário: ${error.message}`);
            return false;
        }
    }

    async removeFuncionario(cpf: number): Promise<boolean> { //Falta na api
        try {
          const url = ` https://light-killdeer-grateful.ngrok-free.app/funcionarios/${cpf}`;
          const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                 "ngrok-skip-browser-warning": "69420"
             },
          };
      
          const response = await fetch(url, options);
      
          if (response.ok) {
            console.log(`Funcionário com CPF ${cpf} removido com sucesso!`);
            return true;
          } else {
            const errorMessage = await response.text();
            throw new Error(`Erro ao remover funcionário: ${errorMessage}`);
          }
        } catch (error) {
          console.error(`Erro ao remover funcionário: ${error.message}`);
          return false;
        }
    }

    async atualizaFuncionario( //Falta na api
        cpf: number,
        login: string,
        senha: string
      ): Promise<boolean> {
        try {
            const url = ` https://light-killdeer-grateful.ngrok-free.app/funcionarios/${cpf}`;
            const data = JSON.stringify({

                login: login,
                senha: senha,
            });
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
                body: data,
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(`Funcionário com CPF ${cpf} atualizado com sucesso!`);
                return true;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao atualizar funcionário: ${errorMessage}`);
            }
        } catch (error) {
          console.error(`Erro ao atualizar funcionário: ${error.message}`);
          return false;
        }
    }

    async consultaFuncionarios(): Promise<any> {
        try {
            const url = ' https://light-killdeer-grateful.ngrok-free.app/funcionarios/';
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao consultar funcionários: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao consultar funcionários: ${error.message}`);
            return null;
        }
    }

    //PRODUTOS
    async cadastraProduto(
        nome: string,
        valor: number,
        quantidade: number
      ): Promise<boolean> {
        try {
            const url = ' https://light-killdeer-grateful.ngrok-free.app/produtos/';
            const data = JSON.stringify({
                nome: nome,
                valor: valor,
                quantidade_estoque: quantidade,
            });
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
                body: data,
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(`Produto com nome ${nome} cadastrado com sucesso!`);
                return true;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao cadastrar produto: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao cadastrar produto: ${error.message}`);
            return false;
        }
    }

    async removeProduto(idProduto: number): Promise<boolean> {
        try {
            const url = ` https://light-killdeer-grateful.ngrok-free.app/produtos/${idProduto}`;
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(`Produto com ID ${idProduto} removido com sucesso!`);
                return true;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao remover produto: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao remover produto: ${error.message}`);
            return false;
        }
    }

    async atualizaProduto(
        idProduto: number,
        valor: number,
        quantidade: number
      ): Promise<boolean> {
        try {
            const url = ` https://light-killdeer-grateful.ngrok-free.app/produtos/${idProduto}`; // Use the ID in the URL
            const data = JSON.stringify({
                nome: "oi",
                valor: valor,
                quantidade_estoque: quantidade,
            });
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
                body: data,
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(`Produto com ID ${idProduto} atualizado com sucesso!`);
                return true;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao atualizar produto: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao atualizar produto: ${error.message}`);
            return false;
        }
    }

    async consultaProdutos(): Promise<any> {
        try {
            const url = ' https://light-killdeer-grateful.ngrok-free.app/produtos/';
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao consultar produtos: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao consultar produtos: ${error.message}`);
            return null;
        }
    }

    //DESCONTOS
    cadastraDesconto() {}

    removeDesconto() {}

    async atualizaDesconto(
        idProduto: number,
        porcentagem: number,
      ): Promise<boolean> {
        try {
            const url = ` https://light-killdeer-grateful.ngrok-free.app/produtos/desconto/${idProduto}`;
            const data = JSON.stringify({
                desconto: porcentagem,
            });
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
                body: data,
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(
                `Desconto do Produto com ID ${idProduto} atualizado com sucesso para ${porcentagem}%!`
                );
                return true;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao atualizar desconto: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao atualizar desconto: ${error.message}`);
            return false;
        }
    }
}

class Produto {
    private codigo: number;
    private quantidade: number;
    private valor: number;
    private desconto: number;
  
    constructor(codigo: number, quantidade: number, valor: number, desconto: number) {
        this.codigo = codigo;
        this.quantidade = quantidade;
        this.valor = valor;
        this.desconto = desconto;
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

    getDesconto(): number {
        return this.desconto;
    }
}

class Venda {
    private data: Date;
    private produtos: Produto[];
    private cpfCliente: number;
    private cpfFuncionario: number;
    private valorTotal: number;

    constructor(
        data: Date,
        cpfCliente: number,
        cpfFuncionario: number,
    ) {
        this.data = data;
        this.produtos = [];
        this.cpfCliente = cpfCliente;
        this.cpfFuncionario = cpfFuncionario;
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
        return this.valorTotal;
    }

    setValorVenda(valor: number) {
        this.valorTotal = valor
    }

    getData(): Date {
        return this.data
    }

    getCpfCliente(): number {
        return this.cpfCliente
    }

    setCpfCliente(cpf: number) {
        this.cpfCliente = cpf
    }

    getCpfFuncionario(): number {
        return this.cpfFuncionario
    }

    setCpfFuncionario(cpf: number) {
        this.cpfFuncionario = cpf
    }

    getProdutos(): Produto[] {
        return this.produtos
    }
}

class Caixa implements ConstrutorVendaObserver {
    private static _instance: Caixa;

    private listaVendas: Venda[];
    private funcionarioLogado: (Funcionario | Gerente) | null;
    private aberto = false;
  
    private constructor() {
      this.listaVendas = [];
      this.funcionarioLogado = null;
    }

    public static getInstance(): Caixa {
        if (!this._instance) {
            this._instance = new Caixa();
        }
        return this._instance;
    }
    trocarStatus() {
        if(this.aberto) {
            this.aberto = false;
        } else {
            this.aberto = true;
        }
    }
    getStatus(): boolean {
        return this.aberto;
    }
    getFuncionarioAtivo(): number | null {
        if(this.funcionarioLogado) 
        return this.funcionarioLogado.getCpf()

        return null
    }
    getObjetoFuncionarioAtivo(): Funcionario | null {
        return this.funcionarioLogado
    }

    //VENDAS
    async cadastraVenda(
        valorVenda: number,
        idCliente: number,
        idFuncionario: number,
        data: Date,
        listaProdutos: number[],
      ): Promise<boolean> {
        try {
            const url = ' https://light-killdeer-grateful.ngrok-free.app/vendas/';
            const vendaData = {
                valor_venda: valorVenda,
                id_cliente: idCliente,
                id_funcionario: idFuncionario,
                data: data.toISOString().split('T')[0], // Converte Date para ISO pra ter compatibilidade com JSON
                produtos: listaProdutos
            };
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
                body: JSON.stringify(vendaData),
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(`Venda com valor ${valorVenda} para o cliente com ID ${idCliente} cadastrada com sucesso!`);
                return true;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao cadastrar venda: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao cadastrar venda: ${error.message}`);
            return false;
        }
    }

    async removeVenda(idVenda: number): Promise<boolean> {
        try {
            const url = ` https://light-killdeer-grateful.ngrok-free.app/vendas/${idVenda}`;
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(`Venda com ID ${idVenda} removida com sucesso!`);
                return true;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao remover venda: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao remover venda: ${error.message}`);
            return false;
        }
    }
    
    async relatorioVendasMensais(mes: number, ano: number): Promise<any> {
        try {
            const url = ` https://light-killdeer-grateful.ngrok-free.app/relatorio-vendas/${mes}/${ano}/`;
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 }
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(`Relatório de vendas de ${mes}/${ano} lido com sucesso!`);
                return response.json();
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro pegar relatorio de venda: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro pegar relatorio de venda: ${error.message}`);
            return null;
        }
    }

    //Usar (this.funcionarioLogado as Gerente) para acessar métodos exclusivos de gerente

    async validaLogin(username: string, password: string): Promise<boolean> {
        try {
            const url = `https://light-killdeer-grateful.ngrok-free.app/login/${username}/${password}`;
            const options = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420"
                 },
            };
        
            const response = await fetch(url, options);
            console.log(response)

            if (response.ok) {
                const loginData = await response.json();
                if (loginData.is_gerente) {
                    this.funcionarioLogado = new Gerente(loginData.cpf, loginData.login);
                    console.log('Login como gerente realizado com sucesso!');
                    return true;
                } else {
                    this.funcionarioLogado = new Funcionario(loginData.cpf, loginData.login);
                    console.log('Login como funcionário realizado com sucesso!');
                    return true;
                }
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao validar login: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao validar login: ${error.message}`);
            return false;
        }
    }

    //FUNÇÃO QUE CHAMA CADASTRAR VENDA E AUXILIARES
    async concluiVenda(venda: Venda): Promise<boolean> {
        this.atualizarEstoque(venda.getProdutos())

        const valorTotal = venda.getValorVenda()
        const idCliente = venda.getCpfCliente()
        const idFuncionario = venda.getCpfFuncionario()
        const data = venda.getData()

        let listaCodigos: number[] = []

        for (const produto of venda.getProdutos()) {
            const codigoProduto = produto.getCodigo();
            const quantidade = produto.getQuantidade();
        
            // Adiciona o código do produto à lista a quantidade de vezes especificada
            for (let i = 0; i < quantidade; i++) {
              listaCodigos.push(codigoProduto);
            }
        }

        this.listaVendas.push(venda)

        return await this.cadastraVenda(valorTotal, idCliente, idFuncionario, data, listaCodigos)
    }

    async atualizarEstoque(listaProdutos: Produto[]): Promise<void> {
        for (const produto of listaProdutos) {
            const produtoConsultado = await this.consultaProduto(produto.getCodigo());
            let quantidade = produtoConsultado.quantidade_estoque
            quantidade -= produto.getQuantidade() ;
        
            await this.atualizaProduto(produto.getCodigo(), produto.getValor(), quantidade, produto.getDesconto());
        }
    }

    async consultaProduto(idProduto: number): Promise<any> {
        try {
            const url = ` https://light-killdeer-grateful.ngrok-free.app/produtos/${idProduto}`;
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                const produtoData = await response.json();
                return produtoData;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao consultar produto: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao consultar produto: ${error.message}`);
            return null;
        }
    }

    async atualizaProduto(
        idProduto: number,
        valor: number,
        quantidade: number,
        desconto: number,
      ): Promise<boolean> {
        try {
            const url = ` https://light-killdeer-grateful.ngrok-free.app/produtos/${idProduto}`;
            const data = JSON.stringify({
                valor: valor,
                quantidade_estoque: quantidade,
                desconto: desconto,
                nome: "oi"
            });
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
                body: data,
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                console.log(`Produto com ID ${idProduto} atualizado com sucesso!`);
                return true;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao atualizar produto: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao atualizar produto: ${error.message}`);
            return false;
        }
    }
}

interface ConstrutorVendaObserver {
    concluiVenda(venda: Venda): void;
}

class ConstrutorVenda {
    vendaAtual: Venda | null

    constructor() {

    }

    private observadores: ConstrutorVendaObserver[] = [];

    public registrarObservador(observador: ConstrutorVendaObserver): void {
        this.observadores.push(observador);
    }

    private update(venda: Venda): void {
        for (const observador of this.observadores) {
            observador.concluiVenda(venda);
        }
    }

    cancelaVenda() {
        this.vendaAtual = null
    }

    iniciaVenda() {
        const data = new Date;
        this.vendaAtual = new Venda(data, -1, -1);
    }

    async adicionarProdutoLido(codigo: number, quantidade: number) {
        const produto = await this.consultaProduto(codigo)

        const p = new Produto(codigo, quantidade, produto.valor, produto.desconto);
        
        if(this.vendaAtual)
        this.vendaAtual.adicionaProduto(p);
    }

    removeProdutoLido(codigo: string | null) {
        if(this.vendaAtual &&  codigo)
        this.vendaAtual.removeProduto(Number(codigo));
    }

    async encerraConstrucao(cpfCliente: number | null, cpfFuncionario: number) {
        if(this.vendaAtual){
            this.vendaAtual.setCpfFuncionario(cpfFuncionario);
            if(cpfCliente)
                this.vendaAtual.setCpfCliente(cpfCliente);

            const valor = await this.calculaValorTotal(this.vendaAtual.getProdutos(), cpfCliente)
            this.vendaAtual.setValorVenda(valor)

            this.update(this.vendaAtual);

            this.vendaAtual = null;
        }
    }

    async calculaValorTotal(produtos: Produto[], idCliente: number | null) {
        let valorTotal = 0;

        for (const produto of produtos) {
            const descontoProduto = produto.getDesconto();

            if (descontoProduto > 0) {
                valorTotal += (produto.getValor() * (1 - descontoProduto / 100)) * produto.getQuantidade();
            } else {
                valorTotal += produto.getValor() * produto.getQuantidade();
            }
        }

        if (idCliente) {
            const descontoFidelidade = await this.consultaFidelidade(idCliente);
            if (descontoFidelidade > 0) {
                valorTotal *= (1 - descontoFidelidade / 100);
            }
        }

        return valorTotal;
    }

    async consultaFidelidade(idCliente: number): Promise<number> {
        try {
            const url = ` https://light-killdeer-grateful.ngrok-free.app/fidelidade-cliente/${idCliente}`;
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                const fidelidadeData = await response.json();
                return fidelidadeData;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao consultar fidelidade: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao consultar fidelidade: ${error.message}`);
            return 0;
        }
    }

    async consultaProduto(idProduto: number): Promise<any> {
        try {
            const url = ` https://light-killdeer-grateful.ngrok-free.app/produtos/${idProduto}`;
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                     "ngrok-skip-browser-warning": "69420"
                 },
            };
        
            const response = await fetch(url, options);
        
            if (response.ok) {
                const produtoData = await response.json();
                return produtoData;
            } else {
                const errorMessage = await response.text();
                throw new Error(`Erro ao consultar produto: ${errorMessage}`);
            }
        } catch (error) {
            console.error(`Erro ao consultar produto: ${error.message}`);
            return null;
        }
    }
}

//Chamadas

async function request(): Promise<void> {
    try {
        const url = ' https://light-killdeer-grateful.ngrok-free.app/vendas/';
        const options = {
            method: 'GET',
            headers: { "ngrok-skip-browser-warning": "69420", },
        };
    
        const response = await fetch(url, options);
    
        if (response.ok) {
            console.log(`Conexão permitida`);
        } else {
            const errorMessage = await response.text();
            throw new Error(`Conexão negada: ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Conexão negada: ${error.message}`);
    }
}

request();

const my_app = new App();

my_app.create_start_screen()