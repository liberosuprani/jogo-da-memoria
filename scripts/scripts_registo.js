/* Grupo nº28 PL23
Duarte Alberto - 62235
Libero Suprani - 62220
Ravi Mughal - 62504 
*/

const FORMULARIO_REGISTRO = "registerForm";
const BOTAO_REGISTRO = "botaoRegisto";
const ITEM_DADOS_USUARIO = "dados";
const EMAIL_ID = "email";
const NAME_ID = "nome";
const GENDER_ID = "genero";
const PASSWORD_ID = "senha";
const AGE_ID = "idade";

let formulario = null;
let dados = [];

console.log("lista aqui", dados)

class User {
    constructor(email, nome, senha, idade = null, genero, scores = { jogos: null, tempoTotal: null, tempoPorJogo: [] }) {
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.idade = idade;
        this.genero = genero;
        this.scores = scores;
    }
}

window.addEventListener("load", principal);

function defineEventListeners() {
    document.getElementById(BOTAO_REGISTRO).addEventListener("click", gravaDadosUser);
}

function principal() {
    obtemDadosUsuario();
    formulario = document.forms[FORMULARIO_REGISTRO];
    console.log(formulario);
    defineEventListeners();
}

function obtemDadosUsuario() {
    dados = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIO)) || [];
}

function gravaDadosUser() {
    let errorMsg = document.getElementById("errorMsg");
    let usuarioJaExiste = false;

    let email = formulario.elements[EMAIL_ID].value;

    //regex serve para identificar cadeia de caracteres
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        errorMsg.innerText = "Digite um email válido";
        errorMsg.style.visibility = "visible";
        return; 
    }

    for (let i = 0; i < dados.length; i++) {
        if (email == dados[i].email) {
            usuarioJaExiste = true;
            break;
        }
    }
    if (usuarioJaExiste) {
        errorMsg.innerText = "Usuário já existe";
        errorMsg.style.visibility = "visible";
    }
    else {
        errorMsg.style.visibility = "hidden";

        let name = formulario.elements[NAME_ID].value;
        let password = formulario.elements[PASSWORD_ID].value;
        let age = formulario.elements[AGE_ID].value;
        let gender = formulario.elements[GENDER_ID].value;

        console.log("dados user: ", dados);
        dados.push(new User(email, name, password, age, gender));
        localStorage.setItem(ITEM_DADOS_USUARIO, JSON.stringify(dados));
        window.location.href = "login.html";
    }
}
