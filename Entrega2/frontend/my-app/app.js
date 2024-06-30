//NAVEGAÇÃO NA APLICAÇÃO
function clear_body() {
    var body = document.body;
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
}
function create_start_screen() {
    clear_body();
    var header = document.createElement('div');
    header.className = 'header';
    var titulo = document.createElement('h1');
    titulo.textContent = 'Início';
    header.appendChild(titulo);
    var divBotoes = document.createElement('div');
    divBotoes.className = 'botoes';
    var gerenciarProdutosButton = document.createElement('button');
    gerenciarProdutosButton.textContent = 'Gerenciar Produtos';
    gerenciarProdutosButton.addEventListener('click', create_product_management_screen);
    divBotoes.appendChild(gerenciarProdutosButton);
    var gerenciarFuncionariosButton = document.createElement('button');
    gerenciarFuncionariosButton.textContent = 'Gerenciar Funcionários';
    gerenciarFuncionariosButton.addEventListener('click', create_employee_management_screen);
    divBotoes.appendChild(gerenciarFuncionariosButton);
    var gerenciarClientesButton = document.createElement('button');
    gerenciarClientesButton.textContent = 'Gerenciar Clientes';
    gerenciarClientesButton.addEventListener('click', create_client_management_screen);
    divBotoes.appendChild(gerenciarClientesButton);
    var gerenciarDescontosButton = document.createElement('button');
    gerenciarDescontosButton.textContent = 'Gerenciar Descontos';
    gerenciarDescontosButton.addEventListener('click', create_discount_management_screen);
    divBotoes.appendChild(gerenciarDescontosButton);
    var registrarVendaButton = document.createElement('button');
    registrarVendaButton.textContent = 'Registrar Venda';
    registrarVendaButton.addEventListener('click', create_sell_registration_form);
    divBotoes.appendChild(registrarVendaButton);
    var reembolsarButton = document.createElement('button');
    reembolsarButton.textContent = 'Reembolsar';
    reembolsarButton.addEventListener('click', create_refund_form);
    divBotoes.appendChild(reembolsarButton);
    var mostrarRelatorioButton = document.createElement('button');
    mostrarRelatorioButton.textContent = 'Mostrar Relatório';
    mostrarRelatorioButton.addEventListener('click', create_monthly_report);
    divBotoes.appendChild(mostrarRelatorioButton);
    var botaoLogin = document.createElement('button');
    botaoLogin.textContent = 'Login';
    botaoLogin.addEventListener('click', create_login_form);
    divBotoes.appendChild(botaoLogin);
    var botaoCadastro = document.createElement('button');
    botaoCadastro.textContent = 'Cadastro';
    botaoCadastro.addEventListener('click', create_employee_registration_form);
    divBotoes.appendChild(botaoCadastro);
    header.appendChild(divBotoes);
    document.body.appendChild(header);
}
function create_login_form() {
    clear_body();
    var loginForm = document.createElement('div');
    loginForm.className = 'login-form';
    var title = document.createElement('h1');
    title.textContent = 'Login';
    loginForm.appendChild(title);
    var usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Usuário:';
    loginForm.appendChild(usernameLabel);
    var usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    loginForm.appendChild(usernameInput);
    var passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Senha:';
    loginForm.appendChild(passwordLabel);
    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    loginForm.appendChild(passwordInput);
    var loginButton = document.createElement('button');
    loginButton.textContent = 'Logar';
    loginButton.addEventListener('click', function () {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        logando(username, password);
    });
    loginForm.appendChild(loginButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    loginForm.appendChild(voltarButton);
    document.body.appendChild(loginForm);
}
//CLIENTE
function create_client_management_screen() {
    clear_body();
    var clientManagementScreen = document.createElement('div');
    clientManagementScreen.className = 'client-management-screen';
    var title = document.createElement('h1');
    title.textContent = 'Gerenciar Clientes';
    clientManagementScreen.appendChild(title);
    var registrarButton = document.createElement('button');
    registrarButton.textContent = 'Registrar';
    registrarButton.addEventListener('click', create_client_registration_form);
    clientManagementScreen.appendChild(registrarButton);
    var removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', create_client_removal_form);
    clientManagementScreen.appendChild(removerButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    clientManagementScreen.appendChild(voltarButton);
    document.body.appendChild(clientManagementScreen);
}
function create_client_registration_form() {
    clear_body();
    var registrationForm = document.createElement('div');
    registrationForm.className = 'cliente-registration-form';
    var title = document.createElement('h1');
    title.textContent = 'Cadastrar Cliente';
    registrationForm.appendChild(title);
    var cpfLabel = document.createElement('label');
    cpfLabel.textContent = 'CPF Cliente:';
    registrationForm.appendChild(cpfLabel);
    var cpfInput = document.createElement('input');
    cpfInput.type = 'number';
    cpfInput.id = 'cpfCliente';
    registrationForm.appendChild(cpfInput);
    var cadastrarButton = document.createElement('button');
    cadastrarButton.textContent = 'Cadastrar';
    cadastrarButton.addEventListener('click', function () {
        var cpfCliente = document.getElementById('cpfCliente').valueAsNumber;
        cadastrandoCliente(cpfCliente);
    });
    registrationForm.appendChild(cadastrarButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_client_management_screen);
    registrationForm.appendChild(voltarButton);
    document.body.appendChild(registrationForm);
}
function create_client_removal_form() {
    clear_body();
    var removalForm = document.createElement('div');
    removalForm.className = 'cliente-removal-form';
    var title = document.createElement('h1');
    title.textContent = 'Remover Cliente';
    removalForm.appendChild(title);
    var cpfLabel = document.createElement('label');
    cpfLabel.textContent = 'CPF Cliente:';
    removalForm.appendChild(cpfLabel);
    var cpfInput = document.createElement('input');
    cpfInput.type = 'number';
    cpfInput.id = 'cpfCliente';
    removalForm.appendChild(cpfInput);
    var removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', function () {
        var cpfCliente = document.getElementById('cpfCliente').valueAsNumber;
        removendoCliente(cpfCliente);
    });
    removalForm.appendChild(removerButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_client_management_screen);
    removalForm.appendChild(voltarButton);
    document.body.appendChild(removalForm);
}
//PRODUTO
function create_product_management_screen() {
    clear_body();
    var productManagementScreen = document.createElement('div');
    productManagementScreen.className = 'product-management-screen';
    var title = document.createElement('h1');
    title.textContent = 'Gerenciar Produtos';
    productManagementScreen.appendChild(title);
    var registrarButton = document.createElement('button');
    registrarButton.textContent = 'Registrar';
    registrarButton.addEventListener('click', create_product_registration_form);
    productManagementScreen.appendChild(registrarButton);
    var removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', create_product_removal_form);
    productManagementScreen.appendChild(removerButton);
    var atualizarButton = document.createElement('button');
    atualizarButton.textContent = 'Atualizar';
    atualizarButton.addEventListener('click', create_product_update_form);
    productManagementScreen.appendChild(atualizarButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    productManagementScreen.appendChild(voltarButton);
    document.body.appendChild(productManagementScreen);
}
function create_product_registration_form() {
    clear_body();
    var registrationForm = document.createElement('div');
    registrationForm.className = 'produto-registration-form';
    var title = document.createElement('h1');
    title.textContent = 'Cadastrar Produto';
    registrationForm.appendChild(title);
    var nomeLabel = document.createElement('label');
    nomeLabel.textContent = 'Nome:';
    registrationForm.appendChild(nomeLabel);
    var nomeInput = document.createElement('input');
    nomeInput.type = 'text';
    nomeInput.id = 'nome';
    registrationForm.appendChild(nomeInput);
    var valorLabel = document.createElement('label');
    valorLabel.textContent = 'Valor:';
    registrationForm.appendChild(valorLabel);
    var valorInput = document.createElement('input');
    valorInput.type = 'number';
    valorInput.step = '0.01';
    valorInput.id = 'valor';
    registrationForm.appendChild(valorInput);
    var quantidadeLabel = document.createElement('label');
    quantidadeLabel.textContent = 'Quantidade:';
    registrationForm.appendChild(quantidadeLabel);
    var quantidadeInput = document.createElement('input');
    quantidadeInput.type = 'number';
    quantidadeInput.id = 'quantidade';
    registrationForm.appendChild(quantidadeInput);
    var cadastrarButton = document.createElement('button');
    cadastrarButton.textContent = 'Cadastrar';
    cadastrarButton.addEventListener('click', function () {
        var nome = document.getElementById('nome').value;
        var valor = document.getElementById('valor').valueAsNumber;
        var quantidade = document.getElementById('quantidade').valueAsNumber;
        cadastrandoProduto(nome, valor, quantidade);
    });
    registrationForm.appendChild(cadastrarButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_product_management_screen);
    registrationForm.appendChild(voltarButton);
    document.body.appendChild(registrationForm);
}
function create_product_removal_form() {
    clear_body();
    var removalForm = document.createElement('div');
    removalForm.className = 'produto-removal-form';
    var title = document.createElement('h1');
    title.textContent = 'Remover Produto';
    removalForm.appendChild(title);
    var idLabel = document.createElement('label');
    idLabel.textContent = 'ID:';
    removalForm.appendChild(idLabel);
    var idInput = document.createElement('input');
    idInput.type = 'number';
    idInput.id = 'id';
    removalForm.appendChild(idInput);
    var removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', function () {
        var id = document.getElementById('id').valueAsNumber;
        removendoProduto(id);
    });
    removalForm.appendChild(removerButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_product_management_screen);
    removalForm.appendChild(voltarButton);
    document.body.appendChild(removalForm);
}
function create_product_update_form() {
    clear_body();
    var updateForm = document.createElement('div');
    updateForm.className = 'produto-update-form';
    var title = document.createElement('h1');
    title.textContent = 'Atualizar Produto';
    updateForm.appendChild(title);
    var idLabel = document.createElement('label');
    idLabel.textContent = 'ID:';
    updateForm.appendChild(idLabel);
    var idInput = document.createElement('input');
    idInput.type = 'number';
    idInput.id = 'id';
    updateForm.appendChild(idInput);
    var valorLabel = document.createElement('label');
    valorLabel.textContent = 'Valor:';
    updateForm.appendChild(valorLabel);
    var valorInput = document.createElement('input');
    valorInput.type = 'number';
    valorInput.step = '0.01';
    valorInput.id = 'valor';
    updateForm.appendChild(valorInput);
    var quantidadeLabel = document.createElement('label');
    quantidadeLabel.textContent = 'Quantidade:';
    updateForm.appendChild(quantidadeLabel);
    var quantidadeInput = document.createElement('input');
    quantidadeInput.type = 'number';
    quantidadeInput.id = 'quantidade';
    updateForm.appendChild(quantidadeInput);
    var atualizarButton = document.createElement('button');
    atualizarButton.textContent = 'Atualizar';
    atualizarButton.addEventListener('click', function () {
        var id = document.getElementById('id').valueAsNumber;
        var valor = document.getElementById('valor').valueAsNumber;
        var quantidade = document.getElementById('quantidade').valueAsNumber;
        atualizandoProduto(id, valor, quantidade);
    });
    updateForm.appendChild(atualizarButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_product_management_screen);
    updateForm.appendChild(voltarButton);
    document.body.appendChild(updateForm);
}
function create_product_list() {
    clear_body();
}
//FUNCIONARIO
function create_employee_management_screen() {
    clear_body();
    var employeeManagementScreen = document.createElement('div');
    employeeManagementScreen.className = 'employee-management-screen';
    var title = document.createElement('h1');
    title.textContent = 'Gerenciar Funcionários';
    employeeManagementScreen.appendChild(title);
    var registrarButton = document.createElement('button');
    registrarButton.textContent = 'Registrar';
    registrarButton.addEventListener('click', create_employee_registration_form);
    employeeManagementScreen.appendChild(registrarButton);
    var removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', create_employee_removal_form);
    employeeManagementScreen.appendChild(removerButton);
    var atualizarButton = document.createElement('button');
    atualizarButton.textContent = 'Atualizar';
    atualizarButton.addEventListener('click', create_employee_update_form);
    employeeManagementScreen.appendChild(atualizarButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    employeeManagementScreen.appendChild(voltarButton);
    document.body.appendChild(employeeManagementScreen);
}
function create_employee_registration_form() {
    clear_body();
    var registrationForm = document.createElement('div');
    registrationForm.className = 'registration-form';
    var title = document.createElement('h1');
    title.textContent = 'Cadastrar Funcionário';
    registrationForm.appendChild(title);
    var cpfLabel = document.createElement('label');
    cpfLabel.textContent = 'CPF:';
    registrationForm.appendChild(cpfLabel);
    var cpfInput = document.createElement('input');
    cpfInput.type = 'text';
    cpfInput.id = 'cpf';
    registrationForm.appendChild(cpfInput);
    var usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Usuário:';
    registrationForm.appendChild(usernameLabel);
    var usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    registrationForm.appendChild(usernameInput);
    var passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Senha:';
    registrationForm.appendChild(passwordLabel);
    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    registrationForm.appendChild(passwordInput);
    var admCheckboxLabel = document.createElement('label');
    admCheckboxLabel.textContent = 'Administrador:';
    registrationForm.appendChild(admCheckboxLabel);
    var admCheckbox = document.createElement('input');
    admCheckbox.type = 'checkbox';
    admCheckbox.id = 'adm';
    registrationForm.appendChild(admCheckbox);
    var registerButton = document.createElement('button');
    registerButton.textContent = 'Cadastrar';
    registerButton.addEventListener('click', function () {
        var cpf = document.getElementById('cpf').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var isAdmin = document.getElementById('adm').checked;
        cadastrando(cpf, username, password, isAdmin);
    });
    registrationForm.appendChild(registerButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_employee_management_screen);
    registrationForm.appendChild(voltarButton);
    document.body.appendChild(registrationForm);
}
function create_employee_removal_form() {
    clear_body();
    var removalForm = document.createElement('div');
    removalForm.className = 'funcionario-removal-form';
    var title = document.createElement('h1');
    title.textContent = 'Remover Funcionário';
    removalForm.appendChild(title);
    var cpfLabel = document.createElement('label');
    cpfLabel.textContent = 'CPF:';
    removalForm.appendChild(cpfLabel);
    var cpfInput = document.createElement('input');
    cpfInput.type = 'number';
    cpfInput.id = 'cpf';
    removalForm.appendChild(cpfInput);
    var removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', function () {
        var cpf = document.getElementById('cpf').valueAsNumber;
        removendoFuncionario(cpf);
    });
    removalForm.appendChild(removerButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_employee_management_screen);
    removalForm.appendChild(voltarButton);
    document.body.appendChild(removalForm);
}
function create_employee_update_form() {
    clear_body();
    var updateForm = document.createElement('div');
    updateForm.className = 'funcionario-update-form';
    var title = document.createElement('h1');
    title.textContent = 'Atualizar Funcionário';
    updateForm.appendChild(title);
    var loginLabel = document.createElement('label');
    loginLabel.textContent = 'Login:';
    updateForm.appendChild(loginLabel);
    var loginInput = document.createElement('input');
    loginInput.type = 'text';
    loginInput.id = 'login';
    updateForm.appendChild(loginInput);
    var senhaLabel = document.createElement('label');
    senhaLabel.textContent = 'Senha:';
    updateForm.appendChild(senhaLabel);
    var senhaInput = document.createElement('input');
    senhaInput.type = 'password';
    senhaInput.id = 'senha';
    updateForm.appendChild(senhaInput);
    var atualizarButton = document.createElement('button');
    atualizarButton.textContent = 'Atualizar';
    atualizarButton.addEventListener('click', function () {
        var login = document.getElementById('login').value;
        var senha = document.getElementById('senha').value;
        atualizandoFuncionario(login, senha);
    });
    updateForm.appendChild(atualizarButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_employee_management_screen);
    updateForm.appendChild(voltarButton);
    document.body.appendChild(updateForm);
}
function create_employee_list() {
    clear_body();
}
//DESCONTO
function create_discount_management_screen() {
    clear_body();
    var discountManagementScreen = document.createElement('div');
    discountManagementScreen.className = 'discount-management-screen';
    var title = document.createElement('h1');
    title.textContent = 'Gerenciar Descontos';
    discountManagementScreen.appendChild(title);
    var registrarButton = document.createElement('button');
    registrarButton.textContent = 'Registrar';
    registrarButton.addEventListener('click', create_discount_registration_form);
    discountManagementScreen.appendChild(registrarButton);
    var removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', create_discount_removal_form);
    discountManagementScreen.appendChild(removerButton);
    var atualizarButton = document.createElement('button');
    atualizarButton.textContent = 'Atualizar';
    atualizarButton.addEventListener('click', create_discount_update_form);
    discountManagementScreen.appendChild(atualizarButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    discountManagementScreen.appendChild(voltarButton);
    document.body.appendChild(discountManagementScreen);
}
function create_discount_registration_form() {
    clear_body();
    var cadastroForm = document.createElement('div');
    cadastroForm.className = 'desconto-cadastro-form';
    var title = document.createElement('h1');
    title.textContent = 'Cadastrar Desconto';
    cadastroForm.appendChild(title);
    var idProdutoLabel = document.createElement('label');
    idProdutoLabel.textContent = 'ID Produto:';
    cadastroForm.appendChild(idProdutoLabel);
    var idProdutoInput = document.createElement('input');
    idProdutoInput.type = 'number';
    idProdutoInput.id = 'idProduto';
    cadastroForm.appendChild(idProdutoInput);
    var porcentagemLabel = document.createElement('label');
    porcentagemLabel.textContent = 'Porcentagem:';
    cadastroForm.appendChild(porcentagemLabel);
    var porcentagemInput = document.createElement('input');
    porcentagemInput.type = 'number';
    porcentagemInput.step = '0.01';
    porcentagemInput.id = 'porcentagem';
    cadastroForm.appendChild(porcentagemInput);
    var cadastrarButton = document.createElement('button');
    cadastrarButton.textContent = 'Cadastrar';
    cadastrarButton.addEventListener('click', function () {
        var idProduto = document.getElementById('idProduto').valueAsNumber;
        var porcentagem = document.getElementById('porcentagem').valueAsNumber;
        cadastrandoDesconto(idProduto, porcentagem);
    });
    cadastroForm.appendChild(cadastrarButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_discount_management_screen);
    cadastroForm.appendChild(voltarButton);
    document.body.appendChild(cadastroForm);
}
function create_discount_removal_form() {
    clear_body();
    var removalForm = document.createElement('div');
    removalForm.className = 'desconto-removal-form';
    var title = document.createElement('h1');
    title.textContent = 'Remover Desconto';
    removalForm.appendChild(title);
    var idProdutoLabel = document.createElement('label');
    idProdutoLabel.textContent = 'ID Produto:';
    removalForm.appendChild(idProdutoLabel);
    var idProdutoInput = document.createElement('input');
    idProdutoInput.type = 'number';
    idProdutoInput.id = 'idProduto';
    removalForm.appendChild(idProdutoInput);
    var removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', function () {
        var idProduto = document.getElementById('idProduto').valueAsNumber;
        removendoDesconto(idProduto);
    });
    removalForm.appendChild(removerButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_discount_management_screen);
    removalForm.appendChild(voltarButton);
    document.body.appendChild(removalForm);
}
function create_discount_update_form() {
    clear_body();
    var alteracaoForm = document.createElement('div');
    alteracaoForm.className = 'desconto-alteracao-form';
    var title = document.createElement('h1');
    title.textContent = 'Alterar Desconto';
    alteracaoForm.appendChild(title);
    var idProdutoLabel = document.createElement('label');
    idProdutoLabel.textContent = 'ID Produto:';
    alteracaoForm.appendChild(idProdutoLabel);
    var idProdutoInput = document.createElement('input');
    idProdutoInput.type = 'number';
    idProdutoInput.id = 'idProduto';
    alteracaoForm.appendChild(idProdutoInput);
    var porcentagemLabel = document.createElement('label');
    porcentagemLabel.textContent = 'Porcentagem:';
    alteracaoForm.appendChild(porcentagemLabel);
    var porcentagemInput = document.createElement('input');
    porcentagemInput.type = 'number';
    porcentagemInput.step = '0.01';
    porcentagemInput.id = 'porcentagem';
    alteracaoForm.appendChild(porcentagemInput);
    var alterarButton = document.createElement('button');
    alterarButton.textContent = 'Alterar';
    alterarButton.addEventListener('click', function () {
        var idProduto = document.getElementById('idProduto').valueAsNumber;
        var porcentagem = document.getElementById('porcentagem').valueAsNumber;
        alterandoDesconto(idProduto, porcentagem);
    });
    alteracaoForm.appendChild(alterarButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_discount_management_screen);
    alteracaoForm.appendChild(voltarButton);
    document.body.appendChild(alteracaoForm);
}
function create_discount_list() {
    clear_body();
}
//VENDA
function create_sell_registration_form() {
    clear_body();
}
function create_refund_form() {
    clear_body();
    var reembolsoForm = document.createElement('div');
    reembolsoForm.className = 'reembolso-form';
    var title = document.createElement('h1');
    title.textContent = 'Reembolso';
    reembolsoForm.appendChild(title);
    var vendaNumeroLabel = document.createElement('label');
    vendaNumeroLabel.textContent = 'Nº da Venda:';
    reembolsoForm.appendChild(vendaNumeroLabel);
    var vendaNumeroInput = document.createElement('input');
    vendaNumeroInput.type = 'number';
    vendaNumeroInput.id = 'vendaNumero';
    reembolsoForm.appendChild(vendaNumeroInput);
    var reembolsarButton = document.createElement('button');
    reembolsarButton.textContent = 'Reembolsar';
    reembolsarButton.addEventListener('click', function () {
        var vendaNumero = document.getElementById('vendaNumero').valueAsNumber;
        reembolsando(vendaNumero);
    });
    reembolsoForm.appendChild(reembolsarButton);
    var voltarButton = document.createElement('button');
    voltarButton.textContent = 'Voltar';
    voltarButton.addEventListener('click', create_start_screen);
    reembolsoForm.appendChild(voltarButton);
    document.body.appendChild(reembolsoForm);
}
function create_monthly_report() {
    clear_body();
}
//As funções abaixo chamarão funções das classes do nosso diagrama para fazer funcionar.
//ATENÇÃO: abaixo é só pra lidar com o retorno dos métodos do diagrama de classe para mostrar a parte gráfica.
//não deve ser feito nenhum tipo de requisição ou calculo ou qualquer coisa do tipo pra que essa classe não faça alem do seu papel
function cadastrandoCliente(cpfCliente) {
    console.log("CPF Cliente: ".concat(cpfCliente));
}
function cadastrando(cpf, username, password, isAdmin) {
    console.log("CPF: ".concat(cpf, ", Usu\u00E1rio: ").concat(username, ", Senha: ").concat(password, ", Administrador: ").concat(isAdmin));
}
function logando(username, password) {
    console.log("Usu\u00E1rio: ".concat(username, ", Senha: ").concat(password));
}
function removendoCliente(cpfCliente) {
    console.log("CPF Cliente removido: ".concat(cpfCliente));
}
function cadastrandoProduto(nome, valor, quantidade) {
    console.log("Nome: ".concat(nome, ", Valor: ").concat(valor, ", Quantidade: ").concat(quantidade));
}
function removendoProduto(id) {
    console.log("ID do produto removido: ".concat(id));
}
function atualizandoProduto(id, valor, quantidade) {
    console.log("ID: ".concat(id, ", Valor: ").concat(valor, ", Quantidade: ").concat(quantidade));
}
function removendoFuncionario(cpf) {
    console.log("CPF do funcion\u00E1rio removido: ".concat(cpf));
}
function atualizandoFuncionario(login, senha) {
    console.log("Login: ".concat(login, ", Senha: ").concat(senha));
}
function cadastrandoDesconto(idProduto, porcentagem) {
    console.log("ID Produto: ".concat(idProduto, ", Porcentagem: ").concat(porcentagem));
}
function removendoDesconto(idProduto) {
    console.log("ID Produto: ".concat(idProduto));
}
function alterandoDesconto(idProduto, porcentagem) {
    console.log("ID Produto: ".concat(idProduto, ", Porcentagem: ").concat(porcentagem));
}
function reembolsando(vendaNumero) {
    console.log("N\u00BA da Venda: ".concat(vendaNumero));
}
create_start_screen();
