const TODOS_OS_JOGADORES = 'todosOsJogadores';
const TABELA_ESTATISTICAS = 'tblEstatisticas';


window.addEventListener("load", carregaPagina);

function carregaPagina() {
    mostrarTodosOsJogadores()
}

function pegarTodosOsJogadores() {
    return JSON.parse(localStorage.getItem(TODOS_OS_JOGADORES)) || [];
}


function mostrarTodosOsJogadores() {
    let tabelaAntiga = document.getElementById(TABELA_ESTATISTICAS);
    
    let divLeaderboard = document.getElementById("leaderboard")

    let tabelaNova = document.createElement('table')
    tabelaNova.setAttribute('id', TABELA_ESTATISTICAS)
    divLeaderboard.append(tabelaNova)

    let linhaTabela = document.createElement('tr');

    linhaTabela.innerHTML = "<th>#</th>" +
    "<th>Nome</th>" +
    "<th>Pontuação</th>" +
    "<th>Pares Acertados</th>" +
    "<td>Tempo</th>"
    tabelaNova.appendChild(linhaTabela);

    let todosOsJogadores = pegarTodosOsJogadores()


    for (let jogo of todosOsJogadores) {
        linhaTabela = document.createElement("tr");
        linhaTabela.innerHTML = "<td>" + '0' + "</td>" + "<td>" + jogo.email + "</td>" + "<td>" + jogo.pont + "</td>" + "<td>" + jogo.cartasAcertadas + "</td>" + "<td>" + jogo.tempo + "</td>"

        tabelaNova.appendChild(linhaTabela)
    }
}