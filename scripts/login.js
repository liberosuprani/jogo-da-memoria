const FORMULARIO_REGISTRO = "registerForm";

const BOTAO_REGISTRO = "botaoRegisto";

const DADOS_USUARIO = "DADOS";

const EMAIL_ID = "email";
const GENDER_ID = "gender";
const PASSWORD_ID = "password";
const AGE_ID = "age";


window.addEventListener("load", principal)

function defineEventHandlersParaElementosHTML() {

    document.getElementById(BOTAO_REGISTRO).addEventListener("click", gravaDadosUser())
}


formulario = null
function principal() {
    formulario = document.forms[FORMULARIO_REGISTRO]
    defineEventHandlersParaElementosHTML();
}

function obtemDadosUsuario() {

    
    return new User(formulario.elements[EMAIL_ID].value, formulario.elements[PASSWORD_ID].value, formulario.elements[AGE_ID].value)
}

class User {
    constructor (email, senha, idade) {
        this.senha = senha;
        this.email = email;
        this.idade = idade;  
    }
}


let dados = [];

function gravaDadosUser() 
{
    let email = formulario.elements[EMAIL_ID].value;
    console.log(email);
    let password = formulario.elements[PASSWORD_ID].value;
    console.log(password);
    // let gender = formulario.elements[GENDER_ID].value; 
    let age = formulario.elements[AGE_ID].value;
    console.log(age);
    dados.push(new User(email, password, age));
    console.log(dados);
    localStorage.setItem(DADOS_USUARIO, JSON.stringify(dados));
}