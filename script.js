var canvas = document.getElementById("jogo");
var ctx = canvas.getContext('2d');

var boardSize = 600; /*tamanho*/
var block = 3; /*quantidade de linhas*/
var blockSize = boardSize / block; /*tamanho de cada bloco, 600/200*/
var currentPlayer = 1;

game = [];

function initGame() {
    ctx.clearRect(0, 0, boardSize, boardSize);
    game = [];
    for (let x = 0; x < block; x++) {
        game.push([]);
        for (let y = 0; y < block; y++) {
            game[x].push(0);
        }
    }   
}


function paintBoard() {
    initGame();
    ctx.beginPath();
    ctx.lineWidth = 3;


    for (var i = 1; i < block; i++) { /*for acrescenta a segunda linha e no ctx acrecento a multiplicação ao i, sendo o resultado os 200px para cada linha, ou seja sem o for e o * i tem apenas a primeira linha*/
    ctx.moveTo(blockSize * i, 0); /*insere a linha verticais*/
    ctx.lineTo(blockSize * i, boardSize);
    

    ctx.moveTo(0, blockSize * i); /*insere a linha horizontais*/
    ctx.lineTo(boardSize, blockSize * i);
}
    ctx.stroke(); /*preenche*/
}
/*desenho do x*/
function drawX(x, y) {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#fff';
    

;
    x = x * blockSize; /*=200 equivale a um quadrado dentro do jogo*/
    y = y * blockSize;

    offset = 20; /*margin*/

    ctx.moveTo(x + offset, y + offset);/*primeira linha*/
    ctx.lineTo(x + blockSize - offset, y + blockSize - offset);

    ctx.moveTo(x + offset, y + blockSize - offset); /*segunda linha */
    ctx.lineTo(x + blockSize - offset, y + offset);

    ctx.stroke();
}

drawX(); /*conforme as coordenadas, 0, 0, forem alteradas o x altera o bloco*/

/*segundo jogador*/

function drawO(x, y) {
    ctx.beginPath();

    x = x * blockSize + blockSize / 2; /*=200 equivale a um quadrado dentro do jogo, mas como é o arco precisamos somar devido ao local onde o arco se baseia*/
    y = y * blockSize + blockSize / 2;

    offset = 20; /*margin*/
    radius = (blockSize / 2 - offset);

    /*para fazr o circulo*/

    ctx.arc(x, y, radius, 0, 2 * Math.PI); /* o arco se baseia no centro circulo, então para movimentar para o centro, precisamos somar pela metade do block*/

    ctx.stroke();

}

/*jogar*/

    function checkWin() { /*loop verificar quem ganha*/
    let transversal = 0;
    let tranversalInvertido = 0;
        for (let x = 0; x < block; x++) {
            let vertical = 0;
            let horizontal = 0;

            transversal += game[x][x];
            
            tranversalInvertido += game[x][block -1 -x];

            for (let y = 0; y < block; y++) {
                vertical += game[x][y];
                horizontal += game[y][x];
            }
            if (vertical === block || vertical === -block) {
                return true;
            }
            
            if (horizontal === block || horizontal === -block) {
                return true;
            }
        }

        if (transversal === block || transversal === -block) {
            return true;
        }

        
        if (tranversalInvertido  === block || tranversalInvertido  === -block) {
            return true;
        }
        return false;
    }

    function checkLost() {
        for (let x = 0; x < block; x++) {
            for (let y = 0; y < block; y++) {
                if (game[x][y] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    function play ({x, y}) {
        if (currentPlayer === 0) {
            paintBoard();
            currentPlayer = 1;
        }


        if (game[x][y] !== 0) {
            return;
        }

        /* if define se é o jogador 1 ou não*/
        if (currentPlayer === 1 ) {
            drawX(x, y);
        } else if (currentPlayer === -1) {
            drawO(x, y);
        }

        game[x][y] = currentPlayer;

        if (checkWin()) {
            alert(`${currentPlayer === 1 ? 'O' : 'X'} ganhou`);
            currentPlayer = 0;
        } else if (checkLost()) {
            alert(`Deu Velha!!! Tente Novamente`);
            currentPlayer = 0;
        }   else {
            currentPlayer *= -1;
        }
    }

/*ação do click*/

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();

        const position = {
            x: Math.floor((event.clientX - rect.left) / blockSize),
            y: Math.floor((event.clientY - rect.top) / blockSize),
        }


        play(position);

    })


paintBoard();
