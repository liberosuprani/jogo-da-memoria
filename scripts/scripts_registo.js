
const FORMULARIO_REGISTRO = "registerForm";
const BOTAO_REGISTRO = "botaoRegisto";
const ITEM_DADOS_USUARIO = "dados";
const EMAIL_ID = "email";
const GENDER_ID = "gender";
const PASSWORD_ID = "password";
const AGE_ID = "age";

let formulario = null
let dados = [];


class User {
    constructor (email, senha, idade=null) {
        this.email = email;
        this.senha = senha;
        this.idade = idade;  
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
    console.log("DADOS REFRESHING");
    console.log(dados);
    dados = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIO)) || [];
}


function gravaDadosUser() {
    let email = formulario.elements[EMAIL_ID].value;
    console.log(email);
    let password = formulario.elements[PASSWORD_ID].value;
    console.log(password);
    let age = formulario.elements[AGE_ID].value;
    console.log(age);
    dados.push(new User(email, password, age));
    console.log(dados);
    localStorage.setItem(ITEM_DADOS_USUARIO, JSON.stringify(dados));
}