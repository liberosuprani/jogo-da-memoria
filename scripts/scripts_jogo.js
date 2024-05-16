/* Grupo nº28 PL23
Duarte Alberto - 62235
Libero Suprani - 62220
Ravi Mughal - 62504 
*/

window.addEventListener("load", iniciaJogo);

/* Grupo nº28 PL23
Duarte Alberto - 62235
Libero Suprani - 62220
Ravi Mughal - 62504 
*/

const SPAN_TEMPO_PASSADO = 'segPassados';
const BOTAO_INICIAR_JOGO = 'iniciarJogo';
const BOTAO_ENCERRAR_JOGO = 'encerrarJogo';
const SPAN_TEMPO_RESTANTE = 'segRestantes';
const BOTAO_FAZ_RESTART = 'restartJogo';
const SPAN_PONTUACAO_ATUAL =  'pontuacaoAtual';
const DURACAO_MAXIMA_OMISSAO = 10;
const DURACAO_MINIMA_OMISSAO = 10;


let jogo_iniciado = false;
let temporizadorTempoJogo;
let pontuacaoJogo;
let pont = 0
let segundos = 0;


let configuração = {
    duracaoMaxima: DURACAO_MAXIMA_OMISSAO 
}


function iniciarTemporizador() {
    segundos = 0;
    temporizadorTempoJogo = setInterval(atualizarCronometro, 1000);
    document.getElementById(BOTAO_INICIAR_JOGO).disabled = true;
    document.getElementById(BOTAO_ENCERRAR_JOGO).disabled = false;
}


function encerrarJogo() {
    console.log("encerrado");
    atualizarPontuacao(-1*pont);
    jogo_iniciado = false;
    clearInterval(temporizadorTempoJogo);
    document.getElementById(BOTAO_INICIAR_JOGO).disabled = false;
    document.getElementById(BOTAO_ENCERRAR_JOGO).disabled = true
    console.log("tempo total de jogo: " + segundos);

}


function iniciarPontuacao() {
    pont = 0;
    pontuacaoJogo = setInterval(function() {atualizarPontuacao(0);}, 10000);
}


function atualizarPontuacao(incrementar=0) {
    if (incrementar == 0)
        pont -= 2;
    else
        pont += incrementar;
    document.getElementById(SPAN_PONTUACAO_ATUAL).innerHTML = pont;
}


function pararPontuacao() {
    clearInterval(pontuacaoJogo);
    console.log("Pontuação total: "+ pont)
}


function atualizarCronometro() {
    segundos++;
    document.getElementById(SPAN_TEMPO_PASSADO).innerHTML = segundos;
}


function restart() {
    document.getElementById(BOTAO_FAZ_RESTART).disabled = true;
}


let totalDeCartas;
let matrizTabuleiro = [];
let acertos = 0
let cartasAcertadas = [];

function iniciaJogo() {
    iniciarTemporizador();
    iniciarPontuacao();
    embaralhaCartas();
    iniciaTabuleiro(4, 5);
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
];


function embaralhaCartas() {
    totalDeCartas = listaDeCartas1.concat(listaDeCartas1);

    for (let i = 0; i < totalDeCartas.length; i++) {
        // PEGA UMA POSICAO ALEATORIA 
        let posicaoAleatoria = Math.floor(Math.random() * totalDeCartas.length);

        // TROCA AS CARTAS DE LUGAR
        let aux = totalDeCartas[i];
        totalDeCartas[i] = totalDeCartas[posicaoAleatoria];
        totalDeCartas[posicaoAleatoria] = aux;
    }
}

function iniciaTabuleiro(linhas = 5, colunas = 4) {
    let divTabuleiro = document.getElementById("divTabuleiro");

    // ATRIBUI N-LINHAS E K-COLUNAS À DIV DO TABULEIRO, DE ACORDO COM OS ARGUMENTOS PASSADOS À FUNÇÃO
    divTabuleiro.style.gridTemplateRows = `repeat(${linhas}, 1fr)`;
    divTabuleiro.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;
    
    for (let linha = 0, posicaoLista = 0; linha < linhas; linha++) {
        matrizTabuleiro.push([])
        for (let coluna = 0; coluna < colunas; coluna++, posicaoLista++) {
            matrizTabuleiro[linha].push(totalDeCartas[posicaoLista]);
            
            // CRIA UMA DIV PRA CARTA, CUJO ID É "cartaN-K", EM QUE N==Nª DA LINHA E K==Nª DA COLUNA
            divCarta = document.createElement("div");
            divCarta.id = `carta${linha}-${coluna}`;
            divTabuleiro.append(divCarta);
            divCarta.classList.add("carta");
            
            // POR ENQUANTO, SÓ PARA MOSTRAR O NOME E ID DO OBJETO CARTA NA DIV (#TODO)
            divCarta.append(
                `${totalDeCartas[posicaoLista].id} - ${totalDeCartas[posicaoLista].name}`

            );
            divCarta.addEventListener("click", cartaClicada);
        }
    }
    //console.log(matrizTabuleiro);
}

let cartasClicadas = {
    quantidade: 0,
    cartas: [],
};

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
        event.target.style.border = "solid blue";
        // CASO SEJA A SEGUNDA CARTA A SER CLICADA
        if (cartasClicadas.quantidade == 2) {
            let acertou = true;
            let cartasClicadasObjetos = [];

            // PERCORRE A LISTA DE CARTAS CLICADAS (EM FORMATO DE EVENT.TARGET)
            for (let cartaClicada of cartasClicadas.cartas) {
                let idAtual = cartaClicada.id;

                // DÁ A POSICÃO (LINHA E COLUNA) DA CARTA CLICADA, NA MATRIZ QUE REPRESENTA O TABULEIRO 
                let posicaoNaMatriz = idAtual.slice(5);
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

            // RESETA AS CARTAS CLICADAS
            cartasClicadas.quantidade = 0;
            cartasClicadas.cartas = [];

            if(acertou) {
                console.log("ACERTOU!!!!!!!!");
                cartasAcertadas.push(event.target);
                atualizarPontuacao(10);
            }
            else
                console.log("ERROU!!!!!!!!");
        }
    }
}



    
