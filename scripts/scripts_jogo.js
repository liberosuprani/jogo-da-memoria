/* Grupo nº28 PL23
Duarte Alberto - 62235
Libero Suprani - 62220
Ravi Mughal - 62504 
*/

// CONSTANTES
const BOTAO_INICIA_JOGO = 'iniciaJogo';
const BOTAO_ENCERRA_JOGO = 'encerraJogo';
const BOTAO_CONFIGURA_TABULEIRO = "configuraTabuleiro";

const NOME_RADIO_DIFICULDADE = "dificuldade";
const NOME_RADIO_MODOS = "";

const SPAN_TEMPO_PASSADO = 'segPassados';
const SPAN_TEMPO_RESTANTE = 'segRestantes';
const SPAN_PONTUACAO_ATUAL = 'pontuacaoAtual';

const DURACAO_MAXIMA_OMISSAO = 10;
const DURACAO_MINIMA_OMISSAO = 10;

const ITEM_ESTATISTICA = "leaderboard";
const TODOS_OS_JOGADORES = "todosOsJogadores";


const ITEM_DADOS_USUARIOS_LOGADOS = "usuariosLogados";


// VARIÁVEIS
let botaoIniciaJogo;
let botaoEncerraJogo;
let botaoConfiguraTabuleiro;
let dificuldades;
let modos;

let timerTempoJogo;
let timerPontuacaoJogo;
let pontuacao = 0;
let segundos = 0;

let totalDeCartas = [];
let matrizTabuleiro = [];
let acertos = 0
let cartasAcertadas = [];
let cartasClicadas = {
    quantidade: 0,
    cartas: [],
};


let configuracao = {
    dificuldade: "facil",
    modo: "normal",
    duracaoMaxima: DURACAO_MAXIMA_OMISSAO,
    altura: 5,
    largura: 6,
}


window.addEventListener("load", carregaPagina);


function carregaPagina() {

    botaoIniciaJogo = document.getElementById(BOTAO_INICIA_JOGO);
    botaoEncerraJogo = document.getElementById(BOTAO_ENCERRA_JOGO);
    botaoConfiguraTabuleiro = document.getElementById(BOTAO_CONFIGURA_TABULEIRO);
    dificuldades = document.getElementsByName(NOME_RADIO_DIFICULDADE);

    botaoIniciaJogo.disabled = false;
    botaoEncerraJogo.disabled = true;
    botaoConfiguraTabuleiro.disabled = false;

    for (let i = 0; i < dificuldades.length; i++)
        dificuldades[i].disabled = false;


    carregaTabuleiro();
    mostraHistoricoEstatistica();
    defineEventListeners();
}

function iniciaJogo() {
    botaoIniciaJogo.disabled = true;
    botaoEncerraJogo.disabled = false;
    botaoConfiguraTabuleiro.disabled = true;

    for (let i = 0; i < dificuldades.length; i++) {
        dificuldades[i].disabled = true;
        if (dificuldades[i].checked == true)
            configuracao.dificuldade = dificuldades[i].value;
    }
    // for (let i = 0; i < modos.length; i++) {
    //     modos[i].disabled = true;
    //     if (modos[i].checked == true)
    //         configuracao.modo = modos[i].value;
    // }

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

    clearInterval(timerTempoJogo);

    botaoIniciaJogo.disabled = false;
    botaoEncerraJogo.disabled = true;
    botaoConfiguraTabuleiro.disabled = false;

    if (configuracao.dificuldade == "medio")
        pontuacao *= 1.25;
    else if (configuracao.dificuldade == "dificil")
        pontuacao *= 1.65;

    console.log("PONTUACAO FINAL" + pontuacao);

    for (let i = 0; i < dificuldades.length; i++)
        dificuldades[i].disabled = false;


    console.log("tempo total de jogo: " + segundos);
    trataFazerRegistroPontuacao();
    adicionaLocalStorageTodosOsJogadores();
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
    timerPontuacaoJogo = setInterval(function () { atualizaPontuacao(null); }, 10000);
}


function atualizaPontuacao(incrementar = null) {
    if (incrementar == null) {
        let decremento;
        configuracao.dificuldade == "facil" ? decremento = 1 : (configuracao.dificuldade == "medio" ? decremento = 3 : decremento = 5);
        pontuacao -= decremento;
    }
    else
        pontuacao += incrementar;
    document.getElementById(SPAN_PONTUACAO_ATUAL).innerHTML = pontuacao;
}


function encerraTimerPontuacao() {
    clearInterval(timerPontuacaoJogo);
    console.log("Pontuação total: " + pontuacao);
}


function atualizaCronometro() {
    segundos++;
    document.getElementById(SPAN_TEMPO_PASSADO).innerHTML = segundos;
}

// -------------------------------- TABULEIRO ---------------------------------------

class Carta {
    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}

let listaDeCartasEsportes = [
    new Carta(0, "Futebol", "./img/colecoes/esportes/futebol.jpg"),
    new Carta(1, "Basquete", "./img/colecoes/esportes/basquete.jpg"),
    new Carta(2, "Vôlei", "./img/colecoes/esportes/volei.jpg"),
    new Carta(3, "Handball", "./img/colecoes/esportes/handball.jpg"),
    new Carta(4, "Natação", "./img/colecoes/esportes/natacao.jpg"),
    new Carta(5, "Hockey", "./img/colecoes/esportes/hockey.jpg"),
    new Carta(6, "Rugby", "./img/colecoes/esportes/rugby.jpg"),
    new Carta(7, "Baseball", "./img/colecoes/esportes/baseball.jpg"),
    new Carta(8, "Capoeira", "./img/colecoes/esportes/capoeira.jpg"),
    new Carta(9, "Tênis", "./img/colecoes/esportes/tenis.jpg"),
    new Carta(10, "Skate", "./img/colecoes/esportes/skate.jpg"),
    new Carta(11, "Cricket", "./img/colecoes/esportes/cricket.jpg"),
    new Carta(12, "Ping-pong", "./img/colecoes/esportes/pingpong.jpg"),
    new Carta(13, "Atletismo", "./img/colecoes/esportes/atletismo.jpg"),
    new Carta(14, "Arco e flecha", "./img/colecoes/esportes/arcoeflecha.jpg"),
];

function embaralhaCartas(linhas = configuracao.altura, colunas = configuracao.largura) {
    totalDeCartas = [];
    if (linhas * colunas < listaDeCartasEsportes.length * 2) {
        for (let i = 0; i < (linhas * colunas) / 2; i++)
            totalDeCartas.push(listaDeCartasEsportes[i]);
        totalDeCartas = totalDeCartas.concat(totalDeCartas);
    }
    else {
        totalDeCartas = listaDeCartasEsportes.concat(listaDeCartasEsportes);
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
            let carta = document.getElementById(`carta${linha}-${coluna}`);
            carta.addEventListener("click", cartaClicada);
            carta.addEventListener("click", toggleFlip);
        }
    }
}

function toggleFlip() {
    this.classList.toggle("flip");
}

function encerraTabuleiro() {
    for (let linha = 0; linha < matrizTabuleiro.length; linha++) {
        for (let coluna = 0; coluna < matrizTabuleiro[linha].length; coluna++) {
            let carta = document.getElementById(`carta${linha}-${coluna}`);
            carta.removeEventListener("click", cartaClicada);
            carta.removeEventListener("click", toggleFlip);
        }
    }
}

function configuraTabuleiro() {
    //TODO falta verificar se o numero digitado pelo usuario é inteiro

    while (true) {
        configuracao.largura = prompt("Largura (entre 5 e 10):");

        if (!isNaN(configuracao.largura)) {
            configuracao.largura = parseInt(configuracao.largura);
            let largura = configuracao.largura;
            
            let altura = configuracao.altura = Math.floor(listaDeCartasEsportes.length * 2 / largura);

            if (largura >= 5 && largura <= 10) {
                if (listaDeCartasEsportes.length * 2 % largura == 0 || largura*altura % 2 == 0 || largura == 2)
                    configuracao.altura = altura;
                else
                    configuracao.altura = altura - 1;

                carregaTabuleiro();
                break;
            }
            else
                alert("Valor deve estar entre 5 e 10");
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

            let divCartaContainer = document.createElement("div");
            divCartaContainer.classList.add("carta");
            divCartaContainer.id = `carta${linha}-${coluna}`;
            
            
            let imgCartaAtras = document.createElement("div");
            imgCartaAtras.id = "atras";
            imgCartaAtras.classList.add("face");

            // CRIA UMA DIV PRA CARTA, CUJO ID É "cartaN-K", EM QUE N==Nª DA LINHA E K==Nª DA COLUNA
            let imgCartaFrente = document.createElement("img");
            imgCartaFrente.id = "frente";
            imgCartaFrente.classList.add("face");
            imgCartaFrente.src = totalDeCartas[posicaoLista].image;

            divCartaContainer.append(imgCartaAtras);
            divCartaContainer.append(imgCartaFrente);

            divTabuleiro.append(divCartaContainer);
        }
    }
}

function cartaClicada() {

    if (cartasAcertadas.includes(this)) {
        this.removeEventListener("click", cartaClicada);
        this.removeEventListener("click", toggleFlip);
        console.log("CARTAS JA FORAM ACERTADAS");
        cartasClicadas.quantidade = 0;
        cartasClicadas.cartas = [];
    }

    // MESMA CARTA CLICADA MAIS DE UMA VEZ
    else if (cartasClicadas.cartas.length > 0 && this == cartasClicadas.cartas[cartasClicadas.cartas.length - 1]) {
        // cartasClicadas.cartas[0].style.border = "";
        console.log("MESMA CARTA CLICADA NOVAMENTE");
        cartasClicadas.quantidade = 0;
        cartasClicadas.cartas = [];
    }
    else {
        cartasClicadas.quantidade += 1;
        cartasClicadas.cartas.push(this);

        // this.style.border = "solid red 2px";

        // CASO SEJA A SEGUNDA CARTA A SER CLICADA
        if (cartasClicadas.quantidade == 2) {
            let acertou = true;
            let cartasClicadasObjetos = [];

            // PERCORRE A LISTA DE CARTAS CLICADAS (EM FORMATO DE this)
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
                if (cartaClicadaObj.id != primeiroId) {
                    acertou = false;
                    // for (let cartaClicada of cartasClicadas.cartas)
                    //     cartaClicada.style.border = "";
                }
            }

            if (acertou) {
                console.log("ACERTOU!!!!!!!!");
                
                for (let cartaClicadaAtual of cartasClicadas.cartas) {
                    cartasAcertadas.push(cartaClicadaAtual);
                }
                atualizaPontuacao(10);
                cartasClicadas.quantidade = 0;
                cartasClicadas.cartas = [];

                if (cartasAcertadas.length == configuracao.largura*configuracao.altura) {
                    cartasAcertadas[cartasAcertadas.length-1].classList.toggle("flip");
                    encerraJogo();
                }   
            }
            else {
                const reseta = async () => {
                    console.log(1);
                    await sleep(800);
                    console.log(2)
                    for (let i = 0; i < cartasClicadas.cartas.length; i++) {
                        cartasClicadas.cartas[i].classList.toggle("flip");
                    } 
                    cartasClicadas.quantidade = 0;
                    cartasClicadas.cartas = [];
                }
                reseta();
            }  
        }
    }
}

const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

// -------------------------------- ESTATISTICAS ---------------------------------------

const TABELA_ESTATISTICAS = 'tblEstatisticas';
let pontuacoes = JSON.parse(localStorage.getItem(ITEM_ESTATISTICA)) || [];

class Estatistica {
    constructor(email ,pont, cartasAcertadas, tempo) {
        this.email = email;
        this.pont = pont;
        this.cartasAcertadas = cartasAcertadas;
        this.tempo = tempo;
    }
}

function pegarDadosUsuarioLogado() {
    return JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIOS_LOGADOS));
}


function trataFazerRegistroPontuacao() {
    usuarioLogado = pegarDadosUsuarioLogado()
    
    let userEstatistica = new Estatistica(usuarioLogado.email,pontuacao, (cartasAcertadas.length) / 2, segundos);

    gravaPontuacaoNoHistorico(userEstatistica)
    mostraHistoricoEstatistica()
}

function gravaPontuacaoNoHistorico(userEstatistica) {
    
    if (pontuacoes.length == 10) {
        let menor = 0;

        for (let i = 1; i < pontuacoes.length; i++) {
            if (pontuacoes[i] < menor)
                menor = i
        }
        pontuacoes.splice(menor, 1);
    }

    pontuacoes.push(userEstatistica);

    gravaHistoricoPontuacao(pontuacoes)
}

function gravaHistoricoPontuacao(pontuacoes) {
    localStorage.setItem(ITEM_ESTATISTICA, JSON.stringify(pontuacoes))
}

function mostraHistoricoEstatistica() {

    let tabelaAntiga = document.getElementById(TABELA_ESTATISTICAS);
    let divLeaderboard = document.getElementById("leaderboard");

    let tabelaNova = document.createElement("table");
    tabelaNova.setAttribute("id", TABELA_ESTATISTICAS);
    divLeaderboard.append(tabelaNova);

    let linhaTabela = document.createElement("tr");

    linhaTabela.innerHTML = "<th>#</th>" +
        "<th>Nome</th>" +
        "<th>Pontuação</th>" +
        "<th>Pares Acertados</th>" +
        "<td>Tempo</th>"
    tabelaNova.appendChild(linhaTabela);

    let dadosUsuarioLogado = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIOS_LOGADOS));

    let nome = dadosUsuarioLogado.nome;

    let numeroDeJogos = 1;
    let tempoPorJogo = [];
    for (let pontuacao of pontuacoes) {
        linhaTabela = document.createElement("tr");
        linhaTabela.innerHTML = "<td>" + numeroDeJogos + "</td>" + "<td>" + nome + "</td>" + "<td>" + pontuacao.pont + "</td>" + "<td>" + pontuacao.cartasAcertadas + "</td>" + "<td>" + pontuacao.tempo + "</td>"

        tabelaNova.appendChild(linhaTabela)
        numeroDeJogos++;
    }

    tabelaAntiga.parentNode.replaceChild(tabelaNova, tabelaAntiga);
    toScores(numeroDeJogos - 1, pontuacoes, dadosUsuarioLogado);
    // somarTemposObjeto(pontuacoes)
}

function toScores(numeroDeJogos, pontuacoes, dados) {
    // definir para o objeto User o numero de jogos, tempo total jogado e tempo de cada jogo no dicionário scores
    // numeroDeJogos: número total de jogos
    // pontuacoes: objeto em local storage de leaderBoard com estatisticas de pontuacao, cartas acertadas e tempo do jogo 
    // dados: objeto do tipo User de ITEM_DADOS_USUARIOS_LOGADOS 
    atualizarNumeroDeJogos(dados, numeroDeJogos);
    atualizarTempoTotal(pontuacoes, dados);
    atualizarTempoPorJogo(dados, pontuacoes);
    atualizaDadosScores();
}


function atualizarTempoPorJogo(dados, pontuacoes) {
    temposDosJogos = []
    for (let jogo of pontuacoes) {
        temposDosJogos.push(jogo.tempo)
    }

    dados.scores.tempoPorJogo = temposDosJogos

    localStorage.setItem(ITEM_DADOS_USUARIOS_LOGADOS, JSON.stringify(dados))
}

function atualizarNumeroDeJogos(dados, numeroDeJogos) {
    dados.scores.jogos = numeroDeJogos;
    localStorage.setItem(ITEM_DADOS_USUARIOS_LOGADOS, JSON.stringify(dados));

}

function atualizarTempoTotal(pontuacoes, dados) {
    tempoTotal = somarTemposObjeto(pontuacoes)

    dados.scores.tempoTotal = tempoTotal
    localStorage.setItem(ITEM_DADOS_USUARIOS_LOGADOS, JSON.stringify(dados))
}

function somarTemposObjeto(objeto) {
    let total = 0
    for (let i of objeto) {
        total += i.tempo
    }
    // console.log("tempo total: " + total)
    return total
}

const ITEM_DADOS_USUARIO = "dados";



function atualizaDadosScores() {
    let userRegistro = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIO));

    let userEstatistica = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIOS_LOGADOS));

    let usuario;
    for (let user of userRegistro) {
        if (user.email == userEstatistica.email) {
            user = userEstatistica;
            usuario = user;
        }
    }

    if (usuario) {

        //RESOLVER 
        // SUBSTITUIR VALOR POR INDICE DO DICIONARIO DE DADOS
        // console.log(userRegistro)
        let index = userRegistro.findIndex(user => user.email === usuario.email)
        console.log("index", index)

        if (index !== -1) {
            userRegistro[index] = usuario
            

            localStorage.setItem(ITEM_DADOS_USUARIO, JSON.stringify(userRegistro))
        }
        
    }



}


function pegarTodosOsJogadores() {
    return JSON.parse(localStorage.getItem(TODOS_OS_JOGADORES)) || [];
}

function pegarLeaderBoard() {
    return JSON.parse(localStorage.getItem(ITEM_ESTATISTICA)) || [];
}

function gravaPontuacaoLogadoEmTodosOsJogadores(pontuacoesJogador) {
    localStorage.removeItem(TODOS_OS_JOGADORES)
    localStorage.setItem(TODOS_OS_JOGADORES, JSON.stringify(pontuacoesJogador))
}

function adicionaLocalStorageTodosOsJogadores() {
    let pontuacoesJogador = pegarLeaderBoard()
    
    let pontuacaoTodosOsJogadores = pegarTodosOsJogadores();

    console.log("antes: ",pontuacaoTodosOsJogadores)
    ultimoElemeto = pontuacoesJogador[pontuacoesJogador.length - 1]
    pontuacaoTodosOsJogadores.push(ultimoElemeto)
    

    console.log("depois: ",pontuacaoTodosOsJogadores)

    gravaPontuacaoLogadoEmTodosOsJogadores(pontuacaoTodosOsJogadores)
}
