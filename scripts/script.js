class Carta {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

let cartas = {
    0: Carta(0, "sapo"),
    1: Carta(1, "cão"),
    2: Carta(2, "gato"),
    3: Carta(3, "papagaio")
}

function criaTabuleiro(linhas, colunas) {
    let tabuleiro = document.getElementById("tabuleiroContainer");
    tabuleiro.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;
    tabuleiro.style.gridTemplateRows = `repeat(${linhas}, 1fr)`;

    let cartasMatriz = [];
    for (let linha in linhas) {
        cartasMatriz.push([]);
        for (let coluna in colunas) {
            cartasMatriz[coluna].push(cartas[linha+coluna]);
        }
    }

    // TODO
    shuffle();

    for (let linha in linhas) {
        for (let coluna in colunas) {
            let elementoCarta = document.createElement("div");
            elementoCarta.setAttribute("id", `carta${linha+coluna}`);
            elementoCarta.style.
        }
    } 
    
}

function shuffle() {
    return true;
}

