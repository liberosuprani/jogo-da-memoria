/* Grupo nº28 PL23
Duarte Alberto - 62235
Libero Suprani - 62220
Ravi Mughal - 62504 
*/

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
    const ITEM_DADOS_USUARIOS_SECUNDARIOS = "usuariosSecundarios";
    const ITEM_DADOS_MULTIPLAYER = "dadosMultiplayer";

    localStorage.removeItem(ITEM_DADOS_USUARIOS_LOGADOS);
    localStorage.removeItem(ITEM_ESTATISTICA);
    localStorage.removeItem(ITEM_DADOS_USUARIOS_SECUNDARIOS);
    localStorage.removeItem(ITEM_DADOS_MULTIPLAYER);
    botaoDeslogar.style.visibility = "hidden";
    
    window.location.href = "index.html";
}