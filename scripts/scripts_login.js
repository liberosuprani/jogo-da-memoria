
const ITEM_DADOS_USUARIO = "dados";
const ITEM_DADOS_USUARIOS_LOGADOS = "usuariosLogados";
const FORMULARIO_LOGIN = "loginForm";
const EMAIL_ID = "email";
const PASSWORD_ID = "password";
const BOTAO_LOGIN = "botaoLogin";


let formulario = null;
let dados = [];
let usuariosLogados;


class User {
    constructor (email, senha, idade=null, scores=[]) {
        this.email = email;
        this.senha = senha;
        this.idade = idade;  
        this.scores = scores;  
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
    dados = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIO)) || [];
}



function tentaLogin() {
    let errorMsg = document.getElementById("errorMsg");
    let email = formulario.elements[EMAIL_ID].value;
    let password = formulario.elements[PASSWORD_ID].value;
    let user = new User(email, password);
    
    let loginValido = validaLogin(user);
    
    if (loginValido) {
        errorMsg.style.visibility = "hidden";
        localStorage.setItem(ITEM_DADOS_USUARIOS_LOGADOS, JSON.stringify(usuariosLogados));
        window.location.href = "game_modes.html";
    }
    else {
        errorMsg.style.visibility = "visible";
    }
}

function validaLogin(user) {
    let achou = false;

    for (i = 0; i<dados.length; i++) {
        if (user.email == dados[i].email && user.senha == dados[i].senha) {
            achou = true;
            usuariosLogados = dados[i];
        }
    }

    return achou;
}