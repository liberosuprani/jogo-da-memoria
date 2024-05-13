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


let configuração = {
    duracaoMaxima: DURACAO_MAXIMA_OMISSAO 
}

let segundos = 0;

function iniciarTemporizador() {
    segundos = 0;
    temporizadorTempoJogo = setInterval(atualizarCronometro, 1000);
    document.getElementById(BOTAO_INICIAR_JOGO).disabled = true;
    document.getElementById(BOTAO_ENCERRAR_JOGO).disabled = false;
}

function encerrarJogo() {
    console.log("encerrado");
    jogo_iniciado = false;
    clearInterval(temporizadorTempoJogo);
    document.getElementById(BOTAO_INICIAR_JOGO).disabled = false;
    document.getElementById(BOTAO_ENCERRAR_JOGO).disabled = true
    console.log("tempo total de jogo: " + segundos);

}

let pont = 0

function pontuacao() {
    pont = 0
    pontuacaoJogo = setInterval(atualizarPontuacao, 10000)
}

function atualizarPontuacao() {
    pont--;
    document.getElementById(SPAN_PONTUACAO_ATUAL).innerHTML = pont
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