// import User from "./scripts_registo"; 

const ITEM_DADOS_USUARIO = "dados";
const FORMULARIO_LOGIN = "loginForm";
const EMAIL_ID = "email";
const PASSWORD_ID = "password";
const BOTAO_LOGIN = "botaoLogin";

let formulario = null;
let dados = [];

class User {
    constructor (email, senha, idade=null) {
        this.email = email;
        this.senha = senha;
        this.idade = idade;  
    }
}

window.addEventListener("load", principal);

function principal() {
    obtemDadosUsuario();
    formulario = document.forms[FORMULARIO_LOGIN];
    defineEventListeners();
}

function defineEventListeners() {
    document.getElementById(BOTAO_LOGIN).addEventListener("click", tentaLogin);
}

function obtemDadosUsuario() {
    console.log("DADOS REFRESHING");
    dados = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIO));
    console.log(dados);
}

function tentaLogin() {
    let email = formulario.elements[EMAIL_ID].value;
    let password = formulario.elements[PASSWORD_ID].value;
    let user = new User(email, password);
    
    loginValido = validaLogin(user);

    if (loginValido) {
        console.log("USUARIO LOGADO");
    }
    else {
        console.log("USUARIO NAO EXISTE");
    }
}

function validaLogin(user) {
    let achou = false;

    for (i = 0; i<dados.length; i++) {
        if (user.email == dados[i].email && user.senha == dados[i].senha)
            achou = true;
    }

    return achou;
}