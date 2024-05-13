/* Grupo nº28 PL23
Duarte Alberto - 62235
Libero Suprani - 62220
Ravi Mughal - 62504 
*/

window.addEventListener("load", iniciaJogo);

function iniciaJogo() {
    embaralhaCartas();
    iniciaTabuleiro(5, 4);
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

let totalDeCartas;
let matrizTabuleiro = [];

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

    // MESMA CARTA CLICADA MAIS DE UMA VEZ
    if(cartasClicadas.cartas.length > 0 && event.target == cartasClicadas.cartas[cartasClicadas.cartas.length-1]) {
        console.log("MESMA CARTA CLICADA NOVAMENTE");
        cartasClicadas.quantidade = 0;
        cartasClicadas.cartas = [];
    }
    else {
        cartasClicadas.quantidade += 1;
        cartasClicadas.cartas.push(event.target);

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
            for (let cartaClicada of cartasClicadasObjetos) {
                if(cartaClicada.id != primeiroId)
                    acertou = false;
            } 

            // RESETA AS CARTAS CLICADAS
            cartasClicadas.quantidade = 0;
            cartasClicadas.cartas = [];

            if(acertou)
                console.log("ACERTOU!!!!!!!!");
            else
                console.log("ERROU!!!!!!!!");
        }
    }
}
