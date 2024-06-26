/* Grupo nº28 PL23
Duarte Alberto - 62235
Libero Suprani - 62220
Ravi Mughal - 62504 
*/

const ITEM_DADOS_USUARIO = "dados";
const ITEM_DADOS_USUARIOS_LOGADOS = "usuariosLogados";
const ITEM_DADOS_USUARIOS_SECUNDARIOS = "usuariosSecundarios";

const FORMULARIO_LOGIN = "loginForm";
const EMAIL_ID = "email";
const NOME_ID = "nome";
const PASSWORD_ID = "password";
const BOTAO_LOGIN = "botaoLogin";

let formulario = null;
let dados = [];
let usuariosLogados;
let usuariosSecundarios = [];
let jaTinhaAlguemLogado;

class User {
    constructor(email, nome = null, senha, idade = null, scores = { jogos: null, tempoTotal: null, tempoPorJogo: [] }) {
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.idade = idade;
        this.scores = scores;
    }
}

window.addEventListener("load", principal);

function principal() {
    obtemDadosUsuario();

    // if (usuariosLogados.length != 0) {
    //     window.href.location = "jogo.html";
    // }
    // else {
        formulario = document.forms[FORMULARIO_LOGIN];
        defineEventListeners();
    // }
}

function defineEventListeners() {
    document.getElementById(BOTAO_LOGIN).addEventListener("click", tentaLogin);
}

function obtemDadosUsuario() {
    dados = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIO)) || [];
    usuariosLogados = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIOS_LOGADOS)) || null;
    usuariosSecundarios = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIOS_SECUNDARIOS)) || [];
}

function tentaLogin() {
    let errorMsg = document.getElementById("errorMsg");
    let email = formulario.elements[EMAIL_ID].value;
    let password = formulario.elements[PASSWORD_ID].value;
    let user = new User(email, null, password);

    let loginValido = validaLogin(user);

    if (loginValido) {
        errorMsg.style.visibility = "hidden";

        if (jaTinhaAlguemLogado) {
            localStorage.setItem(ITEM_DADOS_USUARIOS_SECUNDARIOS, JSON.stringify(usuariosSecundarios));
        }
        else
            localStorage.setItem(ITEM_DADOS_USUARIOS_LOGADOS, JSON.stringify(usuariosLogados));
        
        window.location.href = "jogo.html";
    }
    else {
        errorMsg.style.visibility = "visible";
    }
}

function validaLogin(user) {
    let achou = false;

    for (i = 0; i < dados.length; i++) {
        if (user.email == dados[i].email && user.senha == dados[i].senha) {
            achou = true;

            if (usuariosLogados != null) {
                jaTinhaAlguemLogado = true;
                usuariosSecundarios.push(dados[i]);
            }
            else {
                jaTinhaAlguemLogado = false;
                usuariosLogados = dados[i];
            }
        }
    }

    return achou;
}