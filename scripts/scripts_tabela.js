const NOME_DO_JOGADOR = "nome";
const MODO_DE_JOGO = "modo";
const PONTUAÇÃO = "pontuação";
const NUMERO_DE_CARTAS = "cartas";
const TEMPO = "tempo";
const JOGADOR = "jogador"
const TABELA_JOGADOR = "tblJogador";
const FORMULARIO_JOGADOR = "frmJogador";

/**
 * Construtor de um objeto de tipo JOgador. Cada Jogador tem um nome.
 * 
 * @param {string} nome 
 * @param {string} modo 
 * @param {string} pontuação 
 * @param {string} cartas
 * @param {string} tempo
 */

function Jogador(nome, modo, pontuação, cartas, tempo) {

    this.nome = nome;
    this.modo = modo;
    this.pontuação = pontuação;
    this.cartas = cartas;
    this.tempo = tempo;

}

window.addEventListener("load", principal);

function principal() {

    formulario = document.forms[FORMULARIO_JOGADOR];
    carregaHistoricoJogador();
    mostraHistoricoJogador();
    defineEventHandlersParaElementosHTML();
}

/**
 * @returns {Jogador} Objeto com os dados do jogador.
 */
function obtemDadosJogador() {

    return new jogador(formulario.elements[NOME_DO_JOGADOR].value, formulario.elements[MODO_DE_JOGO].value, formulario.elements[PONTUAÇÃO].value, formulario.elements[NUMERO_DE_CARTAS].value, formulario.elements[TEMPO].value);
}


function carregaHistoricoJogador() {

    encomendas = JSON.parse(localStorage.getItem(JOGADOR)) || [];

}

function gravaHistoricoJogador() {


    localStorage.setItem(JOGADOR, JSON.stringify(jogador));
}

/* ------------------------------------------------------------------------- */

/** 
 * @param {Jogador} jogador 
 */
function gravaJogadorNoHistorico(jogador) {

    jogador.push(jogador);
    gravaHistoricoJogador();
}



function mostraHistoricoJogador() {

    let tabelaAntiga = document.getElementById(TABELA_JOGADOR);

    let tabelaNova = document.createElement("table");
    tabelaNova.setAttribute("id", TABELA_JOGADOR);


    let linhaTabela = document.createElement("tr");
    linhaTabela.innerHTML = "<th>#</th>" +
        "<th>Nome</th>" +
        "<th>Modo</th>" +
        "<th>Pontuação</th>" +
        "<th>Numero de Cartas</th>" +
        "<th>Tempo</th>";
    tabelaNova.appendChild(linhaTabela);

    let numeroJogador = 1;
    for (let jogador of jogador) {

        linhaTabela = document.createElement("tr");
        linhaTabela.innerHTML = "<td>" + numeroJogador + "</td>" +
            "<td>" + jogador.nome + "</td>" +
            "<td>" + jogador.modo + "</td>" +
            "<td>" + jogador.pontuaçâo + "</td>" +
            "<td>" + jogador.cartas + "</td>" +
            "<td>" + jogador.tempo + "</td>";
        tabelaNova.appendChild(linhaTabela);
        numeroJogador++;
    }

    tabelaAntiga.parentNode.replaceChild(tabelaNova, tabelaAntiga);
}