/* Grupo nº28 PL23
Duarte Alberto - 62235
Libero Suprani - 62220
Ravi Mughal - 62504 
*/

// CONSTANTES
const SPAN_TEMPO_PASSADO = 'segPassados';
const BOTAO_INICIA_JOGO = 'iniciaJogo';
const BOTAO_ENCERRA_JOGO = 'encerraJogo';
const BOTAO_CONFIGURA_TABULEIRO = "configuraTabuleiro";
const SPAN_TEMPO_RESTANTE = 'segRestantes';
const BOTAO_FAZ_RESTART = 'restartJogo';
const SPAN_PONTUACAO_ATUAL =  'pontuacaoAtual';
const DURACAO_MAXIMA_OMISSAO = 10;
const DURACAO_MINIMA_OMISSAO = 10;

// VARIÁVEIS
let botaoIniciaJogo;
let botaoEncerraJogo;
let botaoConfiguraTabuleiro;

let timerTempoJogo;
let timerPontuacaoJogo;
let pontuacao = 0
let segundos = 0;

let totalDeCartas = [];
let matrizTabuleiro = [];
let acertos = 0
let cartasAcertadas = [];
let cartasClicadas = {
    quantidade: 0,
    cartas: [],
};
let cartasListeners = [];

let configuracao = {
    duracaoMaxima: DURACAO_MAXIMA_OMISSAO,
    altura: 5,
    largura: 6,
}


window.addEventListener("load", carregaPagina);


function carregaPagina() {

    botaoIniciaJogo = document.getElementById(BOTAO_INICIA_JOGO);
    botaoEncerraJogo = document.getElementById(BOTAO_ENCERRA_JOGO);
    botaoConfiguraTabuleiro = document.getElementById(BOTAO_CONFIGURA_TABULEIRO);

    botaoIniciaJogo.disabled = false;
    botaoEncerraJogo.disabled = true;
    botaoConfiguraTabuleiro.disabled = false;

    carregaTabuleiro();
    defineEventListeners();
}

function iniciaJogo() {
    botaoIniciaJogo.disabled = true;
    botaoEncerraJogo.disabled = false;
    botaoConfiguraTabuleiro.disabled = true;

    cartasAcertadas = [];
    acertos = 0;
    cartasClicadas.cartas = [];
    cartasClicadas.quantidade = 0;
    
    carregaTabuleiro();
    iniciaTabuleiro();

    iniciaTimerTempo();
    iniciaTimerPontuacao();
}

function encerraJogo() {

    encerraTabuleiro();

    console.log("encerrado");
    encerraTimerPontuacao();
    jogoIniciado = false;

    clearInterval(timerTempoJogo);

    botaoIniciaJogo.disabled = false;
    botaoEncerraJogo.disabled = true;
    botaoConfiguraTabuleiro.disabled = false;
    console.log("tempo total de jogo: " + segundos);
}

function defineEventListeners() {
    botaoIniciaJogo.addEventListener("click", iniciaJogo);
    botaoEncerraJogo.addEventListener("click", encerraJogo);
    botaoConfiguraTabuleiro.addEventListener("click", configuraTabuleiro);
}

function iniciaTimerTempo() {
    segundos = 0;
    document.getElementById(SPAN_TEMPO_PASSADO).innerHTML = segundos;
    timerTempoJogo = setInterval(atualizaCronometro, 1000);
    document.getElementById(BOTAO_INICIA_JOGO).disabled = true;
    document.getElementById(BOTAO_ENCERRA_JOGO).disabled = false;
}


function iniciaTimerPontuacao() {
    pontuacao = 0;
    document.getElementById(SPAN_PONTUACAO_ATUAL).innerHTML = pontuacao;
    timerPontuacaoJogo = setInterval(function() {atualizaPontuacao(null);}, 10000);
}


function atualizaPontuacao(incrementar=null) {
    if (incrementar == null)
        pontuacao -= 2;
    else
        pontuacao += incrementar;
    document.getElementById(SPAN_PONTUACAO_ATUAL).innerHTML = pontuacao;
}


function encerraTimerPontuacao() {
    clearInterval(timerPontuacaoJogo);
    console.log("Pontuação total: "+ pontuacao);
}


function atualizaCronometro() {
    segundos++;
    document.getElementById(SPAN_TEMPO_PASSADO).innerHTML = segundos;
}


class Carta {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

let listaDeCartas1 = [
    new Carta(0, "Futebol"), 
    new Carta(1, "Basquete"), 
    new Carta(2, "Vôlei"), 
    new Carta(3, "Handball"), 
    new Carta(4, "Natação"),
    new Carta(5, "Hockey"),
    new Carta(6, "Rugby"),
    new Carta(7, "Baseball"),
    new Carta(8, "Capoeira"),
    new Carta(9, "Tênis"),
    new Carta(10, "Skate"),
    new Carta(11, "Cricket"),
    new Carta(12, "Ping-pong"),
    new Carta(13, "Atletismo"),
    new Carta(14, "Arco e flecha"),
];


function embaralhaCartas(linhas = configuracao.altura, colunas = configuracao.largura) {
    totalDeCartas = [];
    if (linhas * colunas < listaDeCartas1.length*2) {
        for (let i = 0; i < (linhas*colunas)/2; i++) 
            totalDeCartas.push(listaDeCartas1[i]); 
        totalDeCartas = totalDeCartas.concat(totalDeCartas);   
    }
    else {
        totalDeCartas = listaDeCartas1.concat(listaDeCartas1);
    }
    for (let i = 0; i < totalDeCartas.length; i++) {
        // PEGA UMA POSICAO ALEATORIA 
        let posicaoAleatoria = Math.floor(Math.random() * totalDeCartas.length);

        // TROCA AS CARTAS DE LUGAR
        let aux = totalDeCartas[i];
        totalDeCartas[i] = totalDeCartas[posicaoAleatoria];
        totalDeCartas[posicaoAleatoria] = aux;
    }
}

function iniciaTabuleiro() {
    for (let linha = 0; linha < matrizTabuleiro.length; linha++) {
        for (let coluna = 0; coluna < matrizTabuleiro[linha].length; coluna++) {
            let divCarta = document.getElementById(`carta${linha}-${coluna}`);
            console.log(divCarta);
            divCarta.addEventListener("click", cartaClicada);
        }
    }
}

function encerraTabuleiro() {
    for (let linha = 0; linha < matrizTabuleiro.length; linha++) {
        for (let coluna = 0; coluna < matrizTabuleiro[linha].length; coluna++) {
            let divCarta = document.getElementById(`carta${linha}-${coluna}`);
            divCarta.removeEventListener("click", cartaClicada);
        }
    }
}

function configuraTabuleiro () {
    //TODO falta verificar se o numero digitado pelo usuario é inteiro

    while (true) {
        configuracao.largura = prompt("Largura (entre 2 e 15):");

        if (!isNaN(configuracao.largura)){
            configuracao.largura = parseInt(configuracao.largura);

            if (configuracao.largura >= 2 && configuracao.largura <= 15) {
                if (listaDeCartas1.length*2 % configuracao.largura == 0 || Math.floor(listaDeCartas1.length*2 / configuracao.largura) % 2 == 0 || configuracao.largura == 2) 
                    configuracao.altura = Math.floor(listaDeCartas1.length*2 / configuracao.largura);
                else 
                    configuracao.altura = Math.floor(listaDeCartas1.length*2 / configuracao.largura) - 1;

                carregaTabuleiro();
                break;
            }
            else
                alert("Valor deve estar entre 2 e 15");
        }
        else {
            alert("Valor inválido");
        }
    }
}

function carregaTabuleiro(linhas = configuracao.altura, colunas = configuracao.largura) {
    matrizTabuleiro = [];
    embaralhaCartas(linhas, colunas);

    let divTabuleiro = document.getElementById("divTabuleiro");
    divTabuleiro.innerHTML = "";
    // ATRIBUI N-LINHAS E K-COLUNAS À DIV DO TABULEIRO, DE ACORDO COM OS ARGUMENTOS PASSADOS À FUNÇÃO
    divTabuleiro.style.gridTemplateRows = `repeat(${linhas}, 1fr)`;
    divTabuleiro.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;
    
    for (let linha = 0, posicaoLista = 0; linha < linhas; linha++) {
        matrizTabuleiro.push([])
        for (let coluna = 0; coluna < colunas; coluna++, posicaoLista++) {
            matrizTabuleiro[linha].push(totalDeCartas[posicaoLista]);
            
            // CRIA UMA DIV PRA CARTA, CUJO ID É "cartaN-K", EM QUE N==Nª DA LINHA E K==Nª DA COLUNA
            let divCarta = document.createElement("div");
            divCarta.id = `carta${linha}-${coluna}`;
            divTabuleiro.append(divCarta);
            divCarta.classList.add("carta");
            
            // POR ENQUANTO, SÓ PARA MOSTRAR O NOME E ID DO OBJETO CARTA NA DIV (#TODO)
            divCarta.append(
                `${totalDeCartas[posicaoLista].id} - ${totalDeCartas[posicaoLista].name}`
            );
        }
    }
}

function resetarCartas() {
    

    for (let k = 0; k < cartasAcertadas.length; k++) {
        carta_id = cartasAcertadas[k].id
        let carta_modificada = document.getElementById(carta_id)
        carta_modificada.style.border = 'solid yellow 3px'
    }  

    
    cartasAcertadas = []
}
                

function cartaClicada(event) {

    if (cartasAcertadas.includes(event.target)) {
        console.log("CARTAS JA FORAM ACERTADAS");
        cartasClicadas.quantidade = 0;
        cartasClicadas.cartas = [];
    }
    // MESMA CARTA CLICADA MAIS DE UMA VEZ
    else if(cartasClicadas.cartas.length > 0 && event.target == cartasClicadas.cartas[cartasClicadas.cartas.length-1]) {
        cartasClicadas.cartas[0].style.border = "";
        console.log("MESMA CARTA CLICADA NOVAMENTE");
        cartasClicadas.quantidade = 0;
        cartasClicadas.cartas = [];
    }
    else {
        cartasClicadas.quantidade += 1;
        cartasClicadas.cartas.push(event.target);
        event.target.style.border = "solid red 2px";
        // CASO SEJA A SEGUNDA CARTA A SER CLICADA
        if (cartasClicadas.quantidade == 2) {
            let acertou = true;
            let cartasClicadasObjetos = [];

            // PERCORRE A LISTA DE CARTAS CLICADAS (EM FORMATO DE EVENT.TARGET)
            for (let cartaClicada of cartasClicadas.cartas) {
                let idAtual = cartaClicada.id;

                // DÁ A POSICÃO (LINHA E COLUNA) DA CARTA CLICADA, NA MATRIZ QUE REPRESENTA O TABULEIRO 
                let posicaoNaMatriz = idAtual.slice(5); // retira a substring "carta" do id
                posicaoNaMatriz = posicaoNaMatriz.split("-");
                let linha = parseInt(posicaoNaMatriz[0]);
                let coluna = parseInt(posicaoNaMatriz[1]);

                // ADICIONA O OBJETO DO TIPO CARTA À CARTAS_CLICADAS_OBJETOS
                cartasClicadasObjetos.push(
                    matrizTabuleiro[linha][coluna]
                );
            }

            // VERIFICA SE ALGUMA DAS CARTAS CLICADAS TEM O ATRIBUTO ID (DO OBJETO) DIFERENTE (I.E. NÃO ACERTOU O PAR)
            let primeiroId = cartasClicadasObjetos[0].id;
            for (let cartaClicadaObj of cartasClicadasObjetos) {
                if(cartaClicadaObj.id != primeiroId){
                    acertou = false;
                    for (let cartaClicada of cartasClicadas.cartas) 
                        cartaClicada.style.border = "";
                }

            } 
            
            if(acertou) {
                console.log("ACERTOU!!!!!!!!");
                for (let cartaClicadaAtual of cartasClicadas.cartas) 
                    cartasAcertadas.push(cartaClicadaAtual);
                
                atualizaPontuacao(10);
            }
            else{
                console.log("ERROU!!!!!!!!");
            }
            cartasClicadas.quantidade = 0;
            cartasClicadas.cartas = [];
        }
    }
}


function pegarId() {
    for (let cartaClicada of cartasClicadas.cartas) {
        let idAtual = cartaClicada.id;

        // DÁ A POSICÃO (LINHA E COLUNA) DA CARTA CLICADA, NA MATRIZ QUE REPRESENTA O TABULEIRO 
        let posicaoNaMatriz = idAtual.slice(5); // retira a substring "carta" do id
        posicaoNaMatriz = posicaoNaMatriz.split("-");
        let linha = parseInt(posicaoNaMatriz[0]);
        let coluna = parseInt(posicaoNaMatriz[1]);
    }
    return [linha, coluna]
}
    
