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

    let todosOsJogadores = ordenarJogadores()
    
    
    
    let posicao = 1;
    for (let jogo of todosOsJogadores) {
        linhaTabela = document.createElement("tr");
        linhaTabela.innerHTML = "<td>" + posicao + "</td>" + "<td>" + jogo.email + "</td>" + "<td>" + jogo.pont + "</td>" + "<td>" + jogo.cartasAcertadas + "</td>" + "<td>" + jogo.tempo + "</td>"

        tabelaNova.appendChild(linhaTabela)
        if (posicao >= 10) {
            break;
        }
        posicao++;
    }
}


function ordenarJogadores() {
    let todosOsJogadores = pegarTodosOsJogadores()
    todosOsJogadores.sort((a, b) => {
        if (b.pont !== a.pont) {
            return b.pont - a.pont; // Ordena por pontuação em ordem decrescente
        } else if (b.cartasAcertadas !== a.cartasAcertadas) {
            return b.cartasAcertadas - a.cartasAcertadas; // Desempata por cartas acertadas em ordem decrescente
        } else {
            return a.tempo - b.tempo; // Desempata por tempo em ordem crescente
        }
    });


    return todosOsJogadores
}