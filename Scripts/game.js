let hard = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'],
    med = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'],
    low = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let memory_array = [],
    memory_values = [],
    memory_tile_ids = [],
    tiles_flipped = 0;

Array.prototype.shuffle = function () { /* array shuffle function */
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

function newBoard() {
    let output = '';
    switch (localStorage.getItem('difficult')) {
        case 'low':
            memory_array = low.shuffle();
            break;
        case 'med':
            memory_array = med.shuffle();
            break;
        case 'hard':
            memory_array = hard.shuffle();
            break;
        case null:
            memory_array = med.shuffle();
            break;
    };

    tiles_flipped = 0;

    (function (array) {
        for (let i = 0, length = array.length; i < length; i++) {
            output += '<div id=tile_' + i + ' class=card ' + ' onclick="memoryFlipTile(this,\'' + array[i] + '\')"></div>';
        }
    })(memory_array);
    document.getElementById('memory_board').innerHTML = output;
}

function canFlipCard(tile) {
    return tile.innerHTML == "" && memory_values.length < 2;
}

function isOneCardFlipped() {
    return memory_values.length == 1
}

function areNoCardsFlipped() {
    return memory_values.length == 0;
}

function setCardAsFlipped(tile, value) {
    memory_values.push(value);
    memory_tile_ids.push(tile.id);
}

function isThereIsAMatch() {
    return memory_values[0] == memory_values[1];
}

function matchCards() {
    tiles_flipped += 2;
    // Clear both arrays
    memory_values = [];
    memory_tile_ids = [];
}

function isGameOver() {
    // Check to see if the whole board is cleared
    return tiles_flipped == memory_array.length;
}

function gameIsOver() {
    alert("Board cleared... generating new board");
    document.getElementById('memory_board').innerHTML = "";
    newBoard();
}

function cardsDoNotMatch() {
    setTimeout(flipCardBack, 700);
}

function flipCard(tile, value) {
    tile.style.background = '#FFF';
    tile.innerHTML = value;
}

function flipCardBack() {
    // Flip the 2 tiles back over
    var tile_1 = document.getElementById(memory_tile_ids[0]);
    var tile_2 = document.getElementById(memory_tile_ids[1]);
    tile_1.style.background = '#FF3399';
    tile_1.innerHTML = "";
    tile_2.style.background = '#FF3399';
    tile_2.innerHTML = "";

    // Clear both arrays
    memory_values = [];
    memory_tile_ids = [];
}

function memoryFlipTile(tile, value) {
    if (canFlipCard(tile)) {
        flipCard(tile, value);
        if (areNoCardsFlipped()) {
            setCardAsFlipped(tile, value);
        } else if (isOneCardFlipped()) {
            setCardAsFlipped(tile, value);
            if (isThereIsAMatch()) {
                matchCards();
                if (isGameOver()) {
                    gameIsOver();
                }
            } else {
                cardsDoNotMatch();
            }
        }
    }
}
