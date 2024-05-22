const BOTAO_DESLOGAR = "botaoDeslogar";

let botaoDeslogar;

window.addEventListener("load", principal);

function principal() {
    console.log("PRINCIPAL DO DESLOGAR RODANDO...");
    botaoDeslogar = document.getElementById(BOTAO_DESLOGAR);

    if (usuariosLogados.length == 0) {
        botaoDeslogar.style.visibility = "hidden";
    }
    else {
        botaoDeslogar.style.visibility = "visible";
    }
    
    defineEventListeners();
}

function defineEventListeners() {
    
    botaoDeslogar.addEventListener("click", deslogar);
}

function deslogar () {
    localStorage.removeItem(ITEM_DADOS_USUARIOS_LOGADOS);
    botaoDeslogar.style.visibility = "hidden";
    botaoJogar.href = "login.html";
    window.location.href = "index.html";
}