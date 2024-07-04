//A classe app tem como objetivo gerenciar a navegação pelas páginas da aplicação e chamar caixa para realizar alguma ação quando o usuário clicar em um botão
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var App = /** @class */ (function () {
    function App() {
        this.caixa = Caixa.getInstance();
        this.constrVenda = new ConstrutorVenda();
        this.constrVenda.registrarObservador(this.caixa);
    }
    App.prototype.clear_body = function () {
        var body = document.body;
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
    };
    App.prototype.create_start_screen = function () {
        var _this = this;
        this.clear_body();
        var header = document.createElement('div');
        header.className = 'header';
        var titulo = document.createElement('h1');
        titulo.textContent = 'Início';
        header.appendChild(titulo);
        var divBotoes = document.createElement('div');
        divBotoes.className = 'botoes';
        //somente logado
        var funcionario = this.caixa.getObjetoFuncionarioAtivo();
        if (funcionario) {
            var gerenciarClientesButton = document.createElement('button');
            gerenciarClientesButton.textContent = 'Gerenciar Clientes';
            gerenciarClientesButton.addEventListener('click', this.create_client_management_screen.bind(this));
            divBotoes.appendChild(gerenciarClientesButton);
            /*
            const mostrarRelatorioButton = document.createElement('button');
            mostrarRelatorioButton.textContent = 'Mostrar Relatório';
            mostrarRelatorioButton.addEventListener('click', this.create_monthly_report.bind(this));
            divBotoes.appendChild(mostrarRelatorioButton);
            */
            //Somente se o caixa estiver aberto
            if (this.caixa.getStatus() == true) {
                var registrarVendaButton = document.createElement('button');
                registrarVendaButton.textContent = 'Registrar Venda';
                registrarVendaButton.addEventListener('click', this.create_sell_registration_form.bind(this));
                divBotoes.appendChild(registrarVendaButton);
                var fecharCaixaButton = document.createElement('button');
                fecharCaixaButton.textContent = 'Fechar Caixa';
                fecharCaixaButton.addEventListener('click', function () {
                    _this.caixa.trocarStatus();
                    _this.create_start_screen();
                });
                divBotoes.appendChild(fecharCaixaButton);
            }
            else {
                var abrirCaixaButton = document.createElement('button');
                abrirCaixaButton.textContent = 'Abrir Caixa';
                abrirCaixaButton.addEventListener('click', function () {
                    _this.caixa.trocarStatus();
                    _this.create_start_screen();
                });
                divBotoes.appendChild(abrirCaixaButton);
            }
            //Somente gerente
            if (funcionario.getTipoFuncionario() == "Gerente") {
                var gerenciarProdutosButton = document.createElement('button');
                gerenciarProdutosButton.textContent = 'Gerenciar Produtos';
                gerenciarProdutosButton.addEventListener('click', this.create_product_management_screen.bind(this));
                divBotoes.appendChild(gerenciarProdutosButton);
                var gerenciarFuncionariosButton = document.createElement('button');
                gerenciarFuncionariosButton.textContent = 'Gerenciar Funcionários';
                gerenciarFuncionariosButton.addEventListener('click', this.create_employee_management_screen.bind(this));
                divBotoes.appendChild(gerenciarFuncionariosButton);
                var gerenciarDescontosButton = document.createElement('button');
                gerenciarDescontosButton.textContent = 'Gerenciar Descontos';
                gerenciarDescontosButton.addEventListener('click', this.create_discount_management_screen.bind(this));
                divBotoes.appendChild(gerenciarDescontosButton);
            }
            /*
            const reembolsarButton = document.createElement('button');
            reembolsarButton.textContent = 'Reembolsar';
            reembolsarButton.addEventListener('click', this.create_refund_form.bind(this));
            divBotoes.appendChild(reembolsarButton);
            */
        }
        var botaoLogin = document.createElement('button');
        botaoLogin.textContent = 'Login';
        botaoLogin.addEventListener('click', this.create_login_form.bind(this));
        divBotoes.appendChild(botaoLogin);
        header.appendChild(divBotoes);
        document.body.appendChild(header);
    };
    App.prototype.create_login_form = function () {
        var _this = this;
        this.clear_body();
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
            _this.logando(username, password);
        });
        loginForm.appendChild(loginButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        loginForm.appendChild(voltarButton);
        document.body.appendChild(loginForm);
    };
    //CLIENTE
    App.prototype.create_client_management_screen = function () {
        this.clear_body();
        var clientManagementScreen = document.createElement('div');
        clientManagementScreen.className = 'client-management-screen';
        var title = document.createElement('h1');
        title.textContent = 'Gerenciar Clientes';
        clientManagementScreen.appendChild(title);
        var registrarButton = document.createElement('button');
        registrarButton.textContent = 'Registrar';
        registrarButton.addEventListener('click', this.create_client_registration_form.bind(this));
        clientManagementScreen.appendChild(registrarButton);
        var removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', this.create_client_removal_form.bind(this));
        clientManagementScreen.appendChild(removerButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        clientManagementScreen.appendChild(voltarButton);
        document.body.appendChild(clientManagementScreen);
    };
    App.prototype.create_client_registration_form = function () {
        var _this = this;
        this.clear_body();
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
            _this.cadastrandoCliente(cpfCliente);
        });
        registrationForm.appendChild(cadastrarButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_client_management_screen.bind(this));
        registrationForm.appendChild(voltarButton);
        document.body.appendChild(registrationForm);
    };
    App.prototype.create_client_removal_form = function () {
        var _this = this;
        this.clear_body();
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
            _this.removendoCliente(cpfCliente);
        });
        removalForm.appendChild(removerButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_client_management_screen.bind(this));
        removalForm.appendChild(voltarButton);
        document.body.appendChild(removalForm);
    };
    //PRODUTO
    App.prototype.create_product_management_screen = function () {
        this.clear_body();
        var productManagementScreen = document.createElement('div');
        productManagementScreen.className = 'product-management-screen';
        var title = document.createElement('h1');
        title.textContent = 'Gerenciar Produtos';
        productManagementScreen.appendChild(title);
        var registrarButton = document.createElement('button');
        registrarButton.textContent = 'Registrar';
        registrarButton.addEventListener('click', this.create_product_registration_form.bind(this));
        productManagementScreen.appendChild(registrarButton);
        var removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', this.create_product_removal_form.bind(this));
        productManagementScreen.appendChild(removerButton);
        var atualizarButton = document.createElement('button');
        atualizarButton.textContent = 'Atualizar';
        atualizarButton.addEventListener('click', this.create_product_update_form.bind(this));
        productManagementScreen.appendChild(atualizarButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        productManagementScreen.appendChild(voltarButton);
        document.body.appendChild(productManagementScreen);
    };
    App.prototype.create_product_registration_form = function () {
        var _this = this;
        this.clear_body();
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
            _this.cadastrandoProduto(nome, valor, quantidade);
        });
        registrationForm.appendChild(cadastrarButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_product_management_screen.bind(this));
        registrationForm.appendChild(voltarButton);
        document.body.appendChild(registrationForm);
    };
    App.prototype.create_product_removal_form = function () {
        var _this = this;
        this.clear_body();
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
            _this.removendoProduto(id);
        });
        removalForm.appendChild(removerButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_product_management_screen.bind(this));
        removalForm.appendChild(voltarButton);
        document.body.appendChild(removalForm);
    };
    App.prototype.create_product_update_form = function () {
        var _this = this;
        this.clear_body();
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
            _this.atualizandoProduto(id, valor, quantidade);
        });
        updateForm.appendChild(atualizarButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_product_management_screen.bind(this));
        updateForm.appendChild(voltarButton);
        document.body.appendChild(updateForm);
    };
    App.prototype.create_product_list = function () {
        this.clear_body();
    };
    //FUNCIONARIO
    App.prototype.create_employee_management_screen = function () {
        this.clear_body();
        var employeeManagementScreen = document.createElement('div');
        employeeManagementScreen.className = 'employee-management-screen';
        var title = document.createElement('h1');
        title.textContent = 'Gerenciar Funcionários';
        employeeManagementScreen.appendChild(title);
        var registrarButton = document.createElement('button');
        registrarButton.textContent = 'Registrar';
        registrarButton.addEventListener('click', this.create_employee_registration_form.bind(this));
        employeeManagementScreen.appendChild(registrarButton);
        var removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', this.create_employee_removal_form.bind(this));
        employeeManagementScreen.appendChild(removerButton);
        var atualizarButton = document.createElement('button');
        atualizarButton.textContent = 'Atualizar';
        atualizarButton.addEventListener('click', this.create_employee_update_form.bind(this));
        employeeManagementScreen.appendChild(atualizarButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        employeeManagementScreen.appendChild(voltarButton);
        document.body.appendChild(employeeManagementScreen);
    };
    App.prototype.create_employee_registration_form = function () {
        var _this = this;
        this.clear_body();
        var registrationForm = document.createElement('div');
        registrationForm.className = 'registration-form';
        var title = document.createElement('h1');
        title.textContent = 'Cadastrar Funcionário';
        registrationForm.appendChild(title);
        var cpfLabel = document.createElement('label');
        cpfLabel.textContent = 'CPF:';
        registrationForm.appendChild(cpfLabel);
        var cpfInput = document.createElement('input');
        cpfInput.type = 'number';
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
            var cpf = document.getElementById('cpf').valueAsNumber;
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            var isAdmin = document.getElementById('adm').checked;
            _this.cadastrandoFuncionario(cpf, username, password, isAdmin);
        });
        registrationForm.appendChild(registerButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_employee_management_screen.bind(this));
        registrationForm.appendChild(voltarButton);
        document.body.appendChild(registrationForm);
    };
    App.prototype.create_employee_removal_form = function () {
        var _this = this;
        this.clear_body();
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
            _this.removendoFuncionario(cpf);
        });
        removalForm.appendChild(removerButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_employee_management_screen.bind(this));
        removalForm.appendChild(voltarButton);
        document.body.appendChild(removalForm);
    };
    App.prototype.create_employee_update_form = function () {
        var _this = this;
        this.clear_body();
        var updateForm = document.createElement('div');
        updateForm.className = 'funcionario-update-form';
        var title = document.createElement('h1');
        title.textContent = 'Atualizar Funcionário';
        updateForm.appendChild(title);
        var cpfLabel = document.createElement('label');
        cpfLabel.textContent = 'CPF:';
        updateForm.appendChild(cpfLabel);
        var cpfInput = document.createElement('input');
        cpfInput.type = 'number';
        cpfInput.id = 'cpf';
        updateForm.appendChild(cpfInput);
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
            var cpf = document.getElementById('cpf').valueAsNumber;
            var login = document.getElementById('login').value;
            var senha = document.getElementById('senha').value;
            _this.atualizandoFuncionario(cpf, login, senha);
        });
        updateForm.appendChild(atualizarButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_employee_management_screen.bind(this));
        updateForm.appendChild(voltarButton);
        document.body.appendChild(updateForm);
    };
    App.prototype.create_employee_list = function () {
        this.clear_body();
    };
    //DESCONTO
    App.prototype.create_discount_management_screen = function () {
        this.clear_body();
        var discountManagementScreen = document.createElement('div');
        discountManagementScreen.className = 'discount-management-screen';
        var title = document.createElement('h1');
        title.textContent = 'Gerenciar Descontos';
        discountManagementScreen.appendChild(title);
        var registrarButton = document.createElement('button');
        registrarButton.textContent = 'Registrar';
        registrarButton.addEventListener('click', this.create_discount_registration_form.bind(this));
        discountManagementScreen.appendChild(registrarButton);
        var removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', this.create_discount_removal_form.bind(this));
        discountManagementScreen.appendChild(removerButton);
        var atualizarButton = document.createElement('button');
        atualizarButton.textContent = 'Atualizar';
        atualizarButton.addEventListener('click', this.create_discount_update_form.bind(this));
        discountManagementScreen.appendChild(atualizarButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        discountManagementScreen.appendChild(voltarButton);
        document.body.appendChild(discountManagementScreen);
    };
    App.prototype.create_discount_registration_form = function () {
        var _this = this;
        this.clear_body();
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
            _this.cadastrandoDesconto(idProduto, porcentagem);
        });
        cadastroForm.appendChild(cadastrarButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_discount_management_screen.bind(this));
        cadastroForm.appendChild(voltarButton);
        document.body.appendChild(cadastroForm);
    };
    App.prototype.create_discount_removal_form = function () {
        var _this = this;
        this.clear_body();
        var removalForm = document.createElement('div');
        removalForm.className = 'desconto-removal-form';
        var title = document.createElement('h1');
        title.textContent = 'Remover Desconto';
        removalForm.appendChild(title);
        var idProdutoLabel = document.createElement('label');
        idProdutoLabel.textContent = 'ID Desconto:';
        removalForm.appendChild(idProdutoLabel);
        var idProdutoInput = document.createElement('input');
        idProdutoInput.type = 'number';
        idProdutoInput.id = 'idProduto';
        removalForm.appendChild(idProdutoInput);
        var removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', function () {
            var idProduto = document.getElementById('idProduto').valueAsNumber;
            _this.removendoDesconto(idProduto);
        });
        removalForm.appendChild(removerButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_discount_management_screen.bind(this));
        removalForm.appendChild(voltarButton);
        document.body.appendChild(removalForm);
    };
    App.prototype.create_discount_update_form = function () {
        var _this = this;
        this.clear_body();
        var alteracaoForm = document.createElement('div');
        alteracaoForm.className = 'desconto-alteracao-form';
        var title = document.createElement('h1');
        title.textContent = 'Alterar Desconto';
        alteracaoForm.appendChild(title);
        var idProdutoLabel = document.createElement('label');
        idProdutoLabel.textContent = 'ID Desconto:';
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
            _this.atualizandoDesconto(idProduto, porcentagem);
        });
        alteracaoForm.appendChild(alterarButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_discount_management_screen.bind(this));
        alteracaoForm.appendChild(voltarButton);
        document.body.appendChild(alteracaoForm);
    };
    App.prototype.create_discount_list = function () {
        this.clear_body();
    };
    //VENDA
    App.prototype.create_sell_registration_form = function () {
        var _this = this;
        this.clear_body();
        this.constrVenda.iniciaVenda();
        var sellRegisterScreen = document.createElement('div');
        var productList = document.createElement('div');
        var cpfLabel = document.createElement('label');
        cpfLabel.textContent = 'CPF Cliente:';
        sellRegisterScreen.appendChild(cpfLabel);
        var cpfInput = document.createElement('input');
        cpfInput.type = 'number';
        cpfInput.id = 'cpfCliente';
        sellRegisterScreen.appendChild(cpfInput);
        var idProdutoLabel = document.createElement('label');
        idProdutoLabel.textContent = 'ID do produto:';
        sellRegisterScreen.appendChild(idProdutoLabel);
        var productIdInput = document.createElement('input');
        productIdInput.type = 'number';
        productIdInput.id = 'idProduto';
        sellRegisterScreen.appendChild(productIdInput);
        var qtdProdutoLabel = document.createElement('label');
        qtdProdutoLabel.textContent = 'Quantidade do produto:';
        sellRegisterScreen.appendChild(qtdProdutoLabel);
        var productQtdInput = document.createElement('input');
        productQtdInput.type = 'number';
        productQtdInput.id = 'qtdProduto';
        sellRegisterScreen.appendChild(productQtdInput);
        var addButton = document.createElement('button');
        addButton.textContent = 'Adicionar';
        sellRegisterScreen.appendChild(addButton);
        addButton.addEventListener('click', function () {
            var productId = productIdInput.valueAsNumber;
            var productQtd = productQtdInput.valueAsNumber;
            if (productId) {
                _this.constrVenda.adicionarProdutoLido(productId, productQtd);
                var productLabel_1 = document.createElement('label');
                productLabel_1.textContent = "Produto: ".concat(productId);
                var removeButton_1 = document.createElement('button');
                removeButton_1.textContent = 'Remover';
                removeButton_1.addEventListener('click', function () {
                    _this.constrVenda.removeProdutoLido(productLabel_1.textContent);
                    productLabel_1.remove();
                    removeButton_1.remove();
                });
                productList.appendChild(productLabel_1);
                productList.appendChild(removeButton_1);
            }
        });
        sellRegisterScreen.appendChild(addButton);
        sellRegisterScreen.appendChild(productList);
        var backButton = document.createElement('button');
        backButton.textContent = 'Voltar';
        backButton.addEventListener('click', function () {
            _this.constrVenda.cancelaVenda();
            _this.create_start_screen();
        });
        sellRegisterScreen.appendChild(backButton);
        var submitButton = document.createElement('button');
        submitButton.textContent = 'Cadastrar';
        submitButton.addEventListener('click', function () {
            var cpfCliente = document.getElementById('cpfCliente').valueAsNumber;
            var cpfFuncionario = _this.caixa.getFuncionarioAtivo();
            _this.cadastrandoVenda(cpfCliente, cpfFuncionario);
        });
        sellRegisterScreen.appendChild(submitButton);
        document.body.appendChild(sellRegisterScreen);
    };
    App.prototype.create_refund_form = function () {
        var _this = this;
        this.clear_body();
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
            _this.reembolsando(vendaNumero);
        });
        reembolsoForm.appendChild(reembolsarButton);
        var voltarButton = document.createElement('button');
        voltarButton.textContent = 'Voltar';
        voltarButton.addEventListener('click', this.create_start_screen.bind(this));
        reembolsoForm.appendChild(voltarButton);
        document.body.appendChild(reembolsoForm);
    };
    App.prototype.create_monthly_report = function () {
        this.clear_body();
    };
    //As funções a seguir devem apenas chamar os métodos das classes onde os códigos foram implementados
    //VENDA
    App.prototype.cadastrandoVenda = function (cpfCliente, cpfFuncionario) {
        console.log("Cadastrando compra de ".concat(cpfCliente, " gerenciado por ").concat(cpfFuncionario));
        if (cpfFuncionario)
            this.constrVenda.encerraConstrucao(cpfCliente, cpfFuncionario);
    };
    //CLIENTE
    App.prototype.cadastrandoCliente = function (cpfCliente) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("CPF Cliente: ".concat(cpfCliente));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.cadastraCliente(cpfCliente)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Cliente registrado");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao registrar cliente");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.removendoCliente = function (cpfCliente) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("CPF Cliente removido: ".concat(cpfCliente));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.removeCliente(cpfCliente)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Cliente removido");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao remover cliente");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //FUNCIONARIO
    App.prototype.cadastrandoFuncionario = function (cpf, username, password, isAdmin) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("CPF: ".concat(cpf, ", Usu\u00E1rio: ").concat(username, ", Senha: ").concat(password, ", Administrador: ").concat(isAdmin));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.cadastraFuncionario(cpf, username, password, isAdmin)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Funcionário registrado");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao registrar funcionário");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.removendoFuncionario = function (cpf) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("funcion\u00E1rio removido: ".concat(cpf));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.removeFuncionario(cpf)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Funcionário removido");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao remover funcionário");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.atualizandoFuncionario = function (cpf, login, senha) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Login: ".concat(login, ", Senha: ").concat(senha));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.atualizaFuncionario(cpf, login, senha)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Funcionário atualizado");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao atualizar funcionário");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.listandoFuncionarios = function () {
        return __awaiter(this, void 0, void 0, function () {
            var funcionario, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.consultaFuncionarios()];
                    case 2:
                        data = _a.sent();
                        if (data) {
                            alert("Funcionários listados");
                            console.log("".concat(data));
                        }
                        else {
                            alert("Falha ao buscar funcionários");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //PRODUTO
    App.prototype.cadastrandoProduto = function (nome, valor, quantidade) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Nome: ".concat(nome, ", Valor: ").concat(valor, ", Quantidade: ").concat(quantidade));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.cadastraProduto(nome, valor, quantidade)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Produto cadastrado");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao cadastrar produto");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.removendoProduto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ID do produto removido: ".concat(id));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.removeProduto(id)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Produto removido");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao remover produto");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.atualizandoProduto = function (id, valor, quantidade) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ID: ".concat(id, ", Valor: ").concat(valor, ", Quantidade: ").concat(quantidade));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.atualizaProduto(id, valor, quantidade)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Produto atualizado");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao atualizar produto");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.listandoProdutos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var funcionario, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.consultaProdutos()];
                    case 2:
                        data = _a.sent();
                        if (data) {
                            alert("Produtos listados");
                            console.log("".concat(data));
                        }
                        else {
                            alert("Falha ao buscar produtos");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //DESCONTO
    App.prototype.cadastrandoDesconto = function (idProduto, porcentagem) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ID Produto: ".concat(idProduto, ", Porcentagem: ").concat(porcentagem));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.cadastraDesconto(idProduto, porcentagem)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Desconto registrado");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao registrar desconto");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.removendoDesconto = function (idProduto) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ID Produto: ".concat(idProduto));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.removeDesconto(idProduto)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Desconto removido");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao remover desconto");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.atualizandoDesconto = function (idProduto, porcentagem) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, funcionario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("ID Produto: ".concat(idProduto, ", Porcentagem: ").concat(porcentagem));
                        sucess = false;
                        return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.atualizaDesconto(idProduto, porcentagem)];
                    case 2:
                        sucess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sucess) {
                            alert("Desconto atualizado");
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao atualizar desconto");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.listandoDescontos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var funcionario, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.caixa.getObjetoFuncionarioAtivo()];
                    case 1:
                        funcionario = _a.sent();
                        if (!funcionario) return [3 /*break*/, 3];
                        return [4 /*yield*/, funcionario.consultaDescontos()];
                    case 2:
                        data = _a.sent();
                        if (data) {
                            alert("Desconto listados");
                            console.log("".concat(data));
                            this.create_start_screen();
                        }
                        else {
                            alert("Falha ao buscar descontos");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //EXTRA
    App.prototype.logando = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var sucess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Usu\u00E1rio: ".concat(username, ", Senha: ").concat(password));
                        return [4 /*yield*/, this.caixa.validaLogin(username, password)];
                    case 1:
                        sucess = _a.sent();
                        if (sucess) {
                            alert("Funcionario logado");
                            this.create_start_screen();
                        }
                        else {
                            alert("Funcinario não logado");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.reembolsando = function (vendaNumero) {
        console.log("N\u00BA da Venda: ".concat(vendaNumero));
    };
    return App;
}());
var Funcionario = /** @class */ (function () {
    function Funcionario(cpf, login) {
        this.cpf = cpf;
        this.login = login;
    }
    Funcionario.prototype.getTipoFuncionario = function () {
        return 'Funcionario';
    };
    Funcionario.prototype.getCpf = function () {
        return this.cpf;
    };
    Funcionario.prototype.getLogin = function () {
        return this.login;
    };
    //CLIENTE
    Funcionario.prototype.cadastraCliente = function (cpfCliente) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, options, response, errorMessage, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = 'http://localhost:8000/clientes/';
                        data = JSON.stringify({ cpf: cpfCliente });
                        options = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: data,
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Cliente com CPF ".concat(cpfCliente, " cadastrado com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao cadastrar cliente: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.error("Erro ao cadastrar cliente: ".concat(error_1.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Funcionario.prototype.removeCliente = function (cpfCliente) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, errorMessage, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = 'http://localhost:8000/clientes/';
                        options = {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ cpf: cpfCliente }),
                        };
                        return [4 /*yield*/, fetch("".concat(url).concat(cpfCliente), options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Cliente com CPF ".concat(cpfCliente, " removido com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao remover cliente: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error("Erro ao remover cliente: ".concat(error_2.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //PRODUTOS
    Funcionario.prototype.consultaProdutos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, data, errorMessage, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        url = 'http://localhost:8000/produtos/';
                        options = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3: return [4 /*yield*/, response.text()];
                    case 4:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao consultar produtos: ".concat(errorMessage));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        console.error("Erro ao consultar produtos: ".concat(error_3.message));
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //DESCONTOS  
    Funcionario.prototype.consultaDescontos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, data, errorMessage, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        url = 'http://localhost:8000/descontos/';
                        options = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3: return [4 /*yield*/, response.text()];
                    case 4:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao consultar descontos: ".concat(errorMessage));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        console.error("Erro ao consultar descontos: ".concat(error_4.message));
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Funcionario;
}());
var Gerente = /** @class */ (function (_super) {
    __extends(Gerente, _super);
    function Gerente(cpf, login) {
        return _super.call(this, cpf, login) || this;
    }
    Gerente.prototype.getTipoFuncionario = function () {
        return 'Gerente';
    };
    //FUNCIONARIOS
    Gerente.prototype.cadastraFuncionario = function (cpf, login, senha, is_gerente) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, options, response, errorMessage, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = 'http://localhost:8000/funcionarios/';
                        data = JSON.stringify({
                            cpf: cpf,
                            login: login,
                            senha: senha,
                            is_gerente: is_gerente,
                        });
                        options = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: data,
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Funcion\u00E1rio com CPF ".concat(cpf, ", username ").concat(login, " cadastrado com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao cadastrar funcion\u00E1rio: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        console.error("Erro ao cadastrar funcion\u00E1rio: ".concat(error_5.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gerente.prototype.removeFuncionario = function (cpf) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, errorMessage, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = "http://localhost:8000/funcionarios/".concat(cpf);
                        options = {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Funcion\u00E1rio com CPF ".concat(cpf, " removido com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao remover funcion\u00E1rio: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        console.error("Erro ao remover funcion\u00E1rio: ".concat(error_6.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gerente.prototype.atualizaFuncionario = function (//Falta na api
    cpf, login, senha) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, options, response, errorMessage, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = "http://localhost:8000/funcionarios/".concat(cpf);
                        data = JSON.stringify({
                            login: login,
                            senha: senha,
                        });
                        options = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: data,
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Funcion\u00E1rio com CPF ".concat(cpf, " atualizado com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao atualizar funcion\u00E1rio: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_7 = _a.sent();
                        console.error("Erro ao atualizar funcion\u00E1rio: ".concat(error_7.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gerente.prototype.consultaFuncionarios = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, data, errorMessage, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        url = 'http://localhost:8000/funcionarios/';
                        options = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3: return [4 /*yield*/, response.text()];
                    case 4:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao consultar funcion\u00E1rios: ".concat(errorMessage));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_8 = _a.sent();
                        console.error("Erro ao consultar funcion\u00E1rios: ".concat(error_8.message));
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //PRODUTOS
    Gerente.prototype.cadastraProduto = function (nome, valor, quantidade) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, options, response, errorMessage, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = 'http://localhost:8000/produtos/';
                        data = JSON.stringify({
                            nome: nome,
                            valor: valor,
                            quantidade_estoque: quantidade,
                        });
                        options = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: data,
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Produto com nome ".concat(nome, " cadastrado com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao cadastrar produto: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_9 = _a.sent();
                        console.error("Erro ao cadastrar produto: ".concat(error_9.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gerente.prototype.removeProduto = function (idProduto) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, errorMessage, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = "http://localhost:8000/produtos/".concat(idProduto);
                        options = {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Produto com ID ".concat(idProduto, " removido com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao remover produto: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_10 = _a.sent();
                        console.error("Erro ao remover produto: ".concat(error_10.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gerente.prototype.atualizaProduto = function (idProduto, valor, quantidade) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, options, response, errorMessage, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = "http://localhost:8000/produtos/".concat(idProduto);
                        data = JSON.stringify({
                            nome: "oi",
                            valor: valor,
                            quantidade_estoque: quantidade,
                        });
                        options = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: data,
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Produto com ID ".concat(idProduto, " atualizado com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao atualizar produto: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_11 = _a.sent();
                        console.error("Erro ao atualizar produto: ".concat(error_11.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gerente.prototype.consultaProdutos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, data, errorMessage, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        url = 'http://localhost:8000/produtos/';
                        options = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3: return [4 /*yield*/, response.text()];
                    case 4:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao consultar produtos: ".concat(errorMessage));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_12 = _a.sent();
                        console.error("Erro ao consultar produtos: ".concat(error_12.message));
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //DESCONTOS
    Gerente.prototype.cadastraDesconto = function (idProduto, porcentagem) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, options, response, errorMessage, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = 'http://localhost:8000/descontos/';
                        data = JSON.stringify({
                            porcentagem: porcentagem,
                            id_produto: idProduto,
                        });
                        options = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: data,
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Desconto de ".concat(porcentagem, "% para o produto com ID ").concat(idProduto, " cadastrado com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao cadastrar desconto: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_13 = _a.sent();
                        console.error("Erro ao cadastrar desconto: ".concat(error_13.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gerente.prototype.removeDesconto = function (idDesconto) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, errorMessage, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = "http://localhost:8000/descontos/".concat(idDesconto);
                        options = {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Desconto para o produto com ID ".concat(idDesconto, " removido com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao remover desconto: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_14 = _a.sent();
                        console.error("Erro ao remover desconto: ".concat(error_14.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gerente.prototype.atualizaDesconto = function (idDesconto, porcentagem) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, options, response, errorMessage, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = "http://localhost:8000/descontos/".concat(idDesconto);
                        data = JSON.stringify({
                            porcentagem: porcentagem,
                        });
                        options = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: data,
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Desconto com ID ".concat(idDesconto, " atualizado com sucesso para ").concat(porcentagem, "%!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao atualizar desconto: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_15 = _a.sent();
                        console.error("Erro ao atualizar desconto: ".concat(error_15.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gerente.prototype.consultaDescontos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, data, errorMessage, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        url = 'http://localhost:8000/descontos/';
                        options = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3: return [4 /*yield*/, response.text()];
                    case 4:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao consultar descontos: ".concat(errorMessage));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_16 = _a.sent();
                        console.error("Erro ao consultar descontos: ".concat(error_16.message));
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Gerente;
}(Funcionario));
var Produto = /** @class */ (function () {
    function Produto(codigo, quantidade, valor) {
        this.codigo = codigo;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    Produto.prototype.getValor = function () {
        return this.valor;
    };
    Produto.prototype.setQuantidade = function (qtd) {
        this.quantidade = qtd;
    };
    Produto.prototype.getQuantidade = function () {
        return this.quantidade;
    };
    Produto.prototype.getCodigo = function () {
        return this.codigo;
    };
    return Produto;
}());
var Venda = /** @class */ (function () {
    function Venda(data, cpfCliente, cpfFuncionario) {
        this.data = data;
        this.produtos = [];
        this.cpfCliente = cpfCliente;
        this.cpfFuncionario = cpfFuncionario;
    }
    Venda.prototype.adicionaProduto = function (produto) {
        this.produtos.push(produto);
    };
    Venda.prototype.removeProduto = function (codigoProduto) {
        var index = this.produtos.findIndex(function (produto) { return produto.getCodigo() === codigoProduto; });
        if (index !== -1) {
            this.produtos.splice(index, 1);
        }
    };
    Venda.prototype.editaProduto = function (codigoProduto, qtd) {
        var index = this.produtos.findIndex(function (produto) { return produto.getCodigo() === codigoProduto; });
        if (index !== -1) {
            this.produtos[index].setQuantidade(qtd);
        }
    };
    Venda.prototype.getValorVenda = function () {
        return this.valorTotal;
    };
    Venda.prototype.setValorVenda = function (valor) {
        this.valorTotal = valor;
    };
    Venda.prototype.getData = function () {
        return this.data;
    };
    Venda.prototype.getCpfCliente = function () {
        return this.cpfCliente;
    };
    Venda.prototype.setCpfCliente = function (cpf) {
        this.cpfCliente = cpf;
    };
    Venda.prototype.getCpfFuncionario = function () {
        return this.cpfFuncionario;
    };
    Venda.prototype.setCpfFuncionario = function (cpf) {
        this.cpfFuncionario = cpf;
    };
    Venda.prototype.getProdutos = function () {
        return this.produtos;
    };
    return Venda;
}());
var Caixa = /** @class */ (function () {
    function Caixa() {
        this.aberto = false;
        this.listaVendas = [];
        this.funcionarioLogado = null;
    }
    Caixa.getInstance = function () {
        if (!this._instance) {
            this._instance = new Caixa();
        }
        return this._instance;
    };
    Caixa.prototype.trocarStatus = function () {
        if (this.aberto) {
            this.aberto = false;
        }
        else {
            this.aberto = true;
        }
    };
    Caixa.prototype.getStatus = function () {
        return this.aberto;
    };
    Caixa.prototype.getFuncionarioAtivo = function () {
        if (this.funcionarioLogado)
            return this.funcionarioLogado.getCpf();
        return null;
    };
    Caixa.prototype.getObjetoFuncionarioAtivo = function () {
        return this.funcionarioLogado;
    };
    //VENDAS
    Caixa.prototype.cadastraVenda = function (valorVenda, idCliente, idFuncionario, data, listaProdutos) {
        return __awaiter(this, void 0, void 0, function () {
            var url, vendaData, options, response, errorMessage, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = 'http://localhost:8000/vendas';
                        vendaData = {
                            valor_venda: valorVenda,
                            id_cliente: idCliente,
                            id_funcionario: idFuncionario,
                            data: data.toISOString(), // Converte Date para ISO pra ter compatibilidade com JSON
                            produtos: listaProdutos
                        };
                        options = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(vendaData),
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Venda com valor ".concat(valorVenda, " para o cliente com ID ").concat(idCliente, " cadastrada com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao cadastrar venda: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_17 = _a.sent();
                        console.error("Erro ao cadastrar venda: ".concat(error_17.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Caixa.prototype.removeVenda = function (idVenda) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, errorMessage, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = "http://localhost:8000/vendas/".concat(idVenda);
                        options = {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Venda com ID ".concat(idVenda, " removida com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao remover venda: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_18 = _a.sent();
                        console.error("Erro ao remover venda: ".concat(error_18.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //Usar (this.funcionarioLogado as Gerente) para acessar métodos exclusivos de gerente
    Caixa.prototype.validaLogin = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, loginData, errorMessage, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        url = "http://localhost:8000/login/".concat(username, "/").concat(password);
                        options = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        loginData = _a.sent();
                        if (loginData.is_gerente) {
                            this.funcionarioLogado = new Gerente(loginData.cpf, loginData.login);
                            console.log('Login como gerente realizado com sucesso!');
                            return [2 /*return*/, true];
                        }
                        else {
                            this.funcionarioLogado = new Funcionario(loginData.cpf, loginData.login);
                            console.log('Login como funcionário realizado com sucesso!');
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, response.text()];
                    case 4:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao validar login: ".concat(errorMessage));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_19 = _a.sent();
                        console.error("Erro ao validar login: ".concat(error_19.message));
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //FUNÇÃO QUE CHAMA CADASTRAR VENDA E AUXILIARES
    Caixa.prototype.concluiVenda = function (venda) {
        return __awaiter(this, void 0, void 0, function () {
            var valorTotal, idCliente, idFuncionario, data, listaCodigos, _i, _a, produto, codigoProduto, quantidade, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.atualizarEstoque(venda.getProdutos());
                        valorTotal = venda.getValorVenda();
                        idCliente = venda.getCpfCliente();
                        idFuncionario = venda.getCpfFuncionario();
                        data = venda.getData();
                        listaCodigos = [];
                        for (_i = 0, _a = venda.getProdutos(); _i < _a.length; _i++) {
                            produto = _a[_i];
                            codigoProduto = produto.getCodigo();
                            quantidade = produto.getQuantidade();
                            // Adiciona o código do produto à lista a quantidade de vezes especificada
                            for (i = 0; i < quantidade; i++) {
                                listaCodigos.push(codigoProduto);
                            }
                        }
                        this.listaVendas.push(venda);
                        return [4 /*yield*/, this.cadastraVenda(valorTotal, idCliente, idFuncionario, data, listaCodigos)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Caixa.prototype.atualizarEstoque = function (listaProdutos) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, listaProdutos_1, produto, produtoConsultado, quantidade;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, listaProdutos_1 = listaProdutos;
                        _a.label = 1;
                    case 1:
                        if (!(_i < listaProdutos_1.length)) return [3 /*break*/, 5];
                        produto = listaProdutos_1[_i];
                        return [4 /*yield*/, this.consultaProduto(produto.getCodigo())];
                    case 2:
                        produtoConsultado = _a.sent();
                        quantidade = produtoConsultado.quantidade_estoque;
                        quantidade -= produto.getQuantidade();
                        return [4 /*yield*/, this.atualizaProduto(produto.getCodigo(), produto.getValor(), quantidade)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Caixa.prototype.consultaProduto = function (idProduto) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, produtoData, errorMessage, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        url = "http://localhost:8000/produtos/".concat(idProduto);
                        options = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        produtoData = _a.sent();
                        return [2 /*return*/, produtoData];
                    case 3: return [4 /*yield*/, response.text()];
                    case 4:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao consultar produto: ".concat(errorMessage));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_20 = _a.sent();
                        console.error("Erro ao consultar produto: ".concat(error_20.message));
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Caixa.prototype.atualizaProduto = function (idProduto, valor, quantidade) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, options, response, errorMessage, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        url = "http://localhost:8000/produtos/".concat(idProduto);
                        data = JSON.stringify({
                            valor: valor,
                            quantidade_estoque: quantidade,
                            nome: "oi"
                        });
                        options = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: data,
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 2];
                        console.log("Produto com ID ".concat(idProduto, " atualizado com sucesso!"));
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao atualizar produto: ".concat(errorMessage));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_21 = _a.sent();
                        console.error("Erro ao atualizar produto: ".concat(error_21.message));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Caixa;
}());
var ConstrutorVenda = /** @class */ (function () {
    function ConstrutorVenda() {
        this.observadores = [];
    }
    ConstrutorVenda.prototype.registrarObservador = function (observador) {
        this.observadores.push(observador);
    };
    ConstrutorVenda.prototype.update = function (venda) {
        for (var _i = 0, _a = this.observadores; _i < _a.length; _i++) {
            var observador = _a[_i];
            observador.concluiVenda(venda);
        }
    };
    ConstrutorVenda.prototype.cancelaVenda = function () {
        this.vendaAtual = null;
    };
    ConstrutorVenda.prototype.iniciaVenda = function () {
        var data = new Date;
        this.vendaAtual = new Venda(data, -1, -1);
    };
    ConstrutorVenda.prototype.adicionarProdutoLido = function (codigo, quantidade) {
        return __awaiter(this, void 0, void 0, function () {
            var produto, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.consultaProduto(codigo)];
                    case 1:
                        produto = _a.sent();
                        p = new Produto(codigo, quantidade, produto.valor);
                        if (this.vendaAtual)
                            this.vendaAtual.adicionaProduto(p);
                        return [2 /*return*/];
                }
            });
        });
    };
    ConstrutorVenda.prototype.removeProdutoLido = function (codigo) {
        if (this.vendaAtual && codigo)
            this.vendaAtual.removeProduto(Number(codigo));
    };
    ConstrutorVenda.prototype.encerraConstrucao = function (cpfCliente, cpfFuncionario) {
        return __awaiter(this, void 0, void 0, function () {
            var valor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.vendaAtual) return [3 /*break*/, 2];
                        console.log("vendaAtual existe e entrou no if de encerra construção");
                        this.vendaAtual.setCpfFuncionario(cpfFuncionario);
                        if (cpfCliente)
                            this.vendaAtual.setCpfCliente(cpfCliente);
                        return [4 /*yield*/, this.calculaValorTotal(this.vendaAtual.getProdutos(), cpfCliente)];
                    case 1:
                        valor = _a.sent();
                        this.vendaAtual.setValorVenda(valor);
                        console.log("calculou o valor total da venda");
                        this.update(this.vendaAtual);
                        console.log("fez a chamada de update");
                        this.vendaAtual = null;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ConstrutorVenda.prototype.calculaValorTotal = function (produtos, idCliente) {
        return __awaiter(this, void 0, void 0, function () {
            var valorTotal, _i, produtos_1, produto, descontoProduto, descontoFidelidade;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        valorTotal = 0;
                        _i = 0, produtos_1 = produtos;
                        _a.label = 1;
                    case 1:
                        if (!(_i < produtos_1.length)) return [3 /*break*/, 4];
                        produto = produtos_1[_i];
                        return [4 /*yield*/, this.consultaDesconto(produto.getCodigo())];
                    case 2:
                        descontoProduto = _a.sent();
                        if (descontoProduto > 0) {
                            valorTotal += produto.getValor() * (1 - descontoProduto / 100);
                        }
                        else {
                            valorTotal += produto.getValor();
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!idCliente) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.consultaFidelidade(idCliente)];
                    case 5:
                        descontoFidelidade = _a.sent();
                        if (descontoFidelidade > 0) {
                            valorTotal *= (1 - descontoFidelidade / 100);
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/, valorTotal];
                }
            });
        });
    };
    ConstrutorVenda.prototype.consultaFidelidade = function (idCliente) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, fidelidadeData, errorMessage, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        url = "http://localhost:8000/clientes/fidelidade/".concat(idCliente);
                        options = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        fidelidadeData = _a.sent();
                        return [2 /*return*/, fidelidadeData.porcentagem];
                    case 3: return [4 /*yield*/, response.text()];
                    case 4:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao consultar fidelidade: ".concat(errorMessage));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_22 = _a.sent();
                        console.error("Erro ao consultar fidelidade: ".concat(error_22.message));
                        return [2 /*return*/, 0];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ConstrutorVenda.prototype.consultaDesconto = function (idProduto) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, descontoData, errorMessage, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        url = "http://localhost:8000/produtos/descontos/".concat(idProduto);
                        options = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        descontoData = _a.sent();
                        return [2 /*return*/, descontoData.porcentagem];
                    case 3: return [4 /*yield*/, response.text()];
                    case 4:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao consultar descontos: ".concat(errorMessage));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_23 = _a.sent();
                        console.error("Erro ao consultar descontos: ".concat(error_23.message));
                        return [2 /*return*/, 0];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ConstrutorVenda.prototype.consultaProduto = function (idProduto) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, produtoData, errorMessage, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        url = "http://localhost:8000/produtos/".concat(idProduto);
                        options = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        };
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        produtoData = _a.sent();
                        return [2 /*return*/, produtoData];
                    case 3: return [4 /*yield*/, response.text()];
                    case 4:
                        errorMessage = _a.sent();
                        throw new Error("Erro ao consultar produto: ".concat(errorMessage));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_24 = _a.sent();
                        console.error("Erro ao consultar produto: ".concat(error_24.message));
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return ConstrutorVenda;
}());
//Chamadas
var my_app = new App();
my_app.create_start_screen();
