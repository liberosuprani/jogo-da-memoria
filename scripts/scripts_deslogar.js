const BOTAO_DESLOGAR = "botaoDeslogar";


let botaoDeslogar;

window.addEventListener("load", principal);

function principal() {
    console.log("PRINCIPAL DO DESLOGAR RODANDO...");

    botaoDeslogar = document.getElementById(BOTAO_DESLOGAR);
    botaoDeslogar.addEventListener("click", deslogar);

    let usuariosLogados = JSON.parse(localStorage.getItem("usuariosLogados")) || [];
    

    if (usuariosLogados.length == 0) {
        botaoDeslogar.style.visibility = "hidden";
    }
    else {
        botaoDeslogar.style.visibility = "visible";
    }

}

function deslogar() {
    const ITEM_DADOS_USUARIOS_LOGADOS = "usuariosLogados";
    const ITEM_ESTATISTICA = "leaderboard";

    localStorage.removeItem(ITEM_DADOS_USUARIOS_LOGADOS);
    localStorage.removeItem(ITEM_ESTATISTICA);
    botaoDeslogar.style.visibility = "hidden";
    
    window.location.href = "index.html";
}