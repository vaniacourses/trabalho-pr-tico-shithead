//NAVEGAÇÃO NA APLICAÇÃO

function clear_body() {
    const body = document.body;
    
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
}

function create_start_screen() {
    clear_body();
  
    const header = document.createElement('div');
    header.className = 'header';
  
    const titulo = document.createElement('h1');
    titulo.textContent = 'Início';
    header.appendChild(titulo);
  
    const divBotoes = document.createElement('div');
    divBotoes.className = 'botoes';
  
    const gerenciarProdutosButton = document.createElement('button');
    gerenciarProdutosButton.textContent = 'Gerenciar Produtos';
    gerenciarProdutosButton.addEventListener('click', create_product_management_screen);
    divBotoes.appendChild(gerenciarProdutosButton);
  
    const gerenciarFuncionariosButton = document.createElement('button');
    gerenciarFuncionariosButton.textContent = 'Gerenciar Funcionários';
    gerenciarFuncionariosButton.addEventListener('click', create_employee_management_screen);
    divBotoes.appendChild(gerenciarFuncionariosButton);

    const gerenciarClientesButton = document.createElement('button');
    gerenciarClientesButton.textContent = 'Gerenciar Clientes';
    gerenciarClientesButton.addEventListener('click', create_client_management_screen);
    divBotoes.appendChild(gerenciarClientesButton);

    const gerenciarDescontosButton = document.createElement('button');
    gerenciarDescontosButton.textContent = 'Gerenciar Descontos';
    gerenciarDescontosButton.addEventListener('click', create_discount_management_screen);
    divBotoes.appendChild(gerenciarDescontosButton);

    const registrarVendaButton = document.createElement('button');
    registrarVendaButton.textContent = 'Registrar Venda';
    registrarVendaButton.addEventListener('click', create_sell_registration_form);
    divBotoes.appendChild(registrarVendaButton);

    const reembolsarButton = document.createElement('button');
    reembolsarButton.textContent = 'Reembolsar';
    reembolsarButton.addEventListener('click', create_refund_form);
    divBotoes.appendChild(reembolsarButton);

    const mostrarRelatorioButton = document.createElement('button');
    mostrarRelatorioButton.textContent = 'Mostrar Relatório';
    mostrarRelatorioButton.addEventListener('click', create_monthly_report);
    divBotoes.appendChild(mostrarRelatorioButton);

    const botaoLogin = document.createElement('button');
    botaoLogin.textContent = 'Login';
    botaoLogin.addEventListener('click', create_login_form);
    divBotoes.appendChild(botaoLogin);

    const botaoCadastro = document.createElement('button');
    botaoCadastro.textContent = 'Cadastro';
    botaoCadastro.addEventListener('click', create_employee_registration_form);
    divBotoes.appendChild(botaoCadastro);
  
    header.appendChild(divBotoes);
    document.body.appendChild(header);
}
  
function create_login_form() {
    clear_body()

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
        logando(username, password);
    });
    loginForm.appendChild(loginButton);

    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    loginForm.appendChild(voltarButton);

    document.body.appendChild(loginForm);
}

//CLIENTE

function create_client_management_screen() {
    clear_body()

    const clientManagementScreen = document.createElement('div');
    clientManagementScreen.className = 'client-management-screen';
  
    const title = document.createElement('h1');
    title.textContent = 'Gerenciar Clientes';
    clientManagementScreen.appendChild(title);
  
    const registrarButton = document.createElement('button');
    registrarButton.textContent = 'Registrar';
    registrarButton.addEventListener('click', create_client_registration_form);
    clientManagementScreen.appendChild(registrarButton);
  
    const removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', create_client_removal_form);
    clientManagementScreen.appendChild(removerButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    clientManagementScreen.appendChild(voltarButton);
  
    document.body.appendChild(clientManagementScreen);
}

function create_client_registration_form(){
    clear_body()

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
        cadastrandoCliente(cpfCliente);
    });
    registrationForm.appendChild(cadastrarButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_client_management_screen);
    registrationForm.appendChild(voltarButton);
    
    document.body.appendChild(registrationForm);
}

function create_client_removal_form() {
    clear_body()

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
        removendoCliente(cpfCliente);
    });
    removalForm.appendChild(removerButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_client_management_screen);
    removalForm.appendChild(voltarButton);
    
    document.body.appendChild(removalForm);
}

//PRODUTO

function create_product_management_screen() {
    clear_body()

    const productManagementScreen = document.createElement('div');
    productManagementScreen.className = 'product-management-screen';
  
    const title = document.createElement('h1');
    title.textContent = 'Gerenciar Produtos';
    productManagementScreen.appendChild(title);
  
    const registrarButton = document.createElement('button');
    registrarButton.textContent = 'Registrar';
    registrarButton.addEventListener('click', create_product_registration_form);
    productManagementScreen.appendChild(registrarButton);
  
    const removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', create_product_removal_form);
    productManagementScreen.appendChild(removerButton);
  
    const atualizarButton = document.createElement('button');
    atualizarButton.textContent = 'Atualizar';
    atualizarButton.addEventListener('click', create_product_update_form);
    productManagementScreen.appendChild(atualizarButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    productManagementScreen.appendChild(voltarButton);
  
    document.body.appendChild(productManagementScreen);
}

function create_product_registration_form() {
    clear_body()

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
        cadastrandoProduto(nome, valor, quantidade);
    });
    registrationForm.appendChild(cadastrarButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_product_management_screen);
    registrationForm.appendChild(voltarButton);
    
    document.body.appendChild(registrationForm);
}

function create_product_removal_form() {
    clear_body()

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
      removendoProduto(id);
    });
    removalForm.appendChild(removerButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_product_management_screen);
    removalForm.appendChild(voltarButton);
  
    document.body.appendChild(removalForm);
}

function create_product_update_form() {
    clear_body()

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
      atualizandoProduto(id, valor, quantidade);
    });
    updateForm.appendChild(atualizarButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_product_management_screen);
    updateForm.appendChild(voltarButton);
  
    document.body.appendChild(updateForm);
}

function create_product_list() {
    clear_body()

}

//FUNCIONARIO

function create_employee_management_screen() {
    clear_body()

    const employeeManagementScreen = document.createElement('div');
    employeeManagementScreen.className = 'employee-management-screen';
  
    const title = document.createElement('h1');
    title.textContent = 'Gerenciar Funcionários';
    employeeManagementScreen.appendChild(title);
  
    const registrarButton = document.createElement('button');
    registrarButton.textContent = 'Registrar';
    registrarButton.addEventListener('click', create_employee_registration_form);
    employeeManagementScreen.appendChild(registrarButton);
  
    const removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', create_employee_removal_form);
    employeeManagementScreen.appendChild(removerButton);
  
    const atualizarButton = document.createElement('button');
    atualizarButton.textContent = 'Atualizar';
    atualizarButton.addEventListener('click', create_employee_update_form);
    employeeManagementScreen.appendChild(atualizarButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    employeeManagementScreen.appendChild(voltarButton);
  
    document.body.appendChild(employeeManagementScreen);
}

function create_employee_registration_form() {
    clear_body()

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
        cadastrando(cpf, username, password, isAdmin);
    });
    registrationForm.appendChild(registerButton);

    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_employee_management_screen);
    registrationForm.appendChild(voltarButton);

    document.body.appendChild(registrationForm);
}

function create_employee_removal_form() {
    clear_body()

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
      removendoFuncionario(cpf);
    });
    removalForm.appendChild(removerButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_employee_management_screen);
    removalForm.appendChild(voltarButton);
  
    document.body.appendChild(removalForm);
}

function create_employee_update_form() {
    clear_body()

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
      atualizandoFuncionario(login, senha);
    });
    updateForm.appendChild(atualizarButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_employee_management_screen);
    updateForm.appendChild(voltarButton);
  
    document.body.appendChild(updateForm);
}

function create_employee_list() {
    clear_body()

}

//DESCONTO

function create_discount_management_screen() {
    clear_body()

    const discountManagementScreen = document.createElement('div');
    discountManagementScreen.className = 'discount-management-screen';
  
    const title = document.createElement('h1');
    title.textContent = 'Gerenciar Descontos';
    discountManagementScreen.appendChild(title);
  
    const registrarButton = document.createElement('button');
    registrarButton.textContent = 'Registrar';
    registrarButton.addEventListener('click', create_discount_registration_form);
    discountManagementScreen.appendChild(registrarButton);
  
    const removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', create_discount_removal_form);
    discountManagementScreen.appendChild(removerButton);
  
    const atualizarButton = document.createElement('button');
    atualizarButton.textContent = 'Atualizar';
    atualizarButton.addEventListener('click', create_discount_update_form);
    discountManagementScreen.appendChild(atualizarButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    discountManagementScreen.appendChild(voltarButton);
  
    document.body.appendChild(discountManagementScreen);
}

function create_discount_registration_form() {
    clear_body()

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
        cadastrandoDesconto(idProduto, porcentagem);
    });
    cadastroForm.appendChild(cadastrarButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_discount_management_screen);
    cadastroForm.appendChild(voltarButton);
  
    document.body.appendChild(cadastroForm);
}

function create_discount_removal_form() {
    clear_body()

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
      removendoDesconto(idProduto);
    });
    removalForm.appendChild(removerButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_discount_management_screen);
    removalForm.appendChild(voltarButton);
  
    document.body.appendChild(removalForm);
}

function create_discount_update_form() {
    clear_body()

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
        alterandoDesconto(idProduto, porcentagem);
    });
    alteracaoForm.appendChild(alterarButton);
  
    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_discount_management_screen);
    alteracaoForm.appendChild(voltarButton);
  
    document.body.appendChild(alteracaoForm);
}
  
function create_discount_list() {
    clear_body()

}

//VENDA

function create_sell_registration_form() {
    clear_body()

}

function create_refund_form() {
    clear_body()

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
        reembolsando(vendaNumero);
    });
    reembolsoForm.appendChild(reembolsarButton);

    const voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    reembolsoForm.appendChild(voltarButton);

    document.body.appendChild(reembolsoForm);
}

function create_monthly_report() {
    clear_body()

}














//As funções abaixo chamarão funções das classes do nosso diagrama para fazer funcionar.
//ATENÇÃO: abaixo é só pra lidar com o retorno dos métodos do diagrama de classe para mostrar a parte gráfica.
//não deve ser feito nenhum tipo de requisição ou calculo ou qualquer coisa do tipo pra que essa classe não faça alem do seu papel



function cadastrandoCliente(cpfCliente: number) {
    console.log(`CPF Cliente: ${cpfCliente}`);
}

function cadastrando(cpf: string, username: string, password: string, isAdmin: boolean) {
    console.log(`CPF: ${cpf}, Usuário: ${username}, Senha: ${password}, Administrador: ${isAdmin}`);
}


function logando(username: string, password: string) {
    console.log(`Usuário: ${username}, Senha: ${password}`);
}

function removendoCliente(cpfCliente: number) {
    console.log(`CPF Cliente removido: ${cpfCliente}`);
}

function cadastrandoProduto(nome: string, valor: number, quantidade: number) {
    console.log(`Nome: ${nome}, Valor: ${valor}, Quantidade: ${quantidade}`);
}

function removendoProduto(id: number) {
    console.log(`ID do produto removido: ${id}`);
}

function atualizandoProduto(id: number, valor: number, quantidade: number) {
    console.log(`ID: ${id}, Valor: ${valor}, Quantidade: ${quantidade}`);
}

function removendoFuncionario(cpf: number) {
    console.log(`CPF do funcionário removido: ${cpf}`);
}

function atualizandoFuncionario(login: string, senha: string) {
    console.log(`Login: ${login}, Senha: ${senha}`);
}

function cadastrandoDesconto(idProduto: number, porcentagem: number) {
    console.log(`ID Produto: ${idProduto}, Porcentagem: ${porcentagem}`);
}

function removendoDesconto(idProduto: number) {
    console.log(`ID Produto: ${idProduto}`);
}

function alterandoDesconto(idProduto: number, porcentagem: number) {
    console.log(`ID Produto: ${idProduto}, Porcentagem: ${porcentagem}`);
}

function reembolsando(vendaNumero: number) {
    console.log(`Nº da Venda: ${vendaNumero}`);
  }


create_start_screen()