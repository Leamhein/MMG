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
            output += '<div id=tile_' + array[i] + ' class=card ' + ' onclick="memoryFlipTile(this,\'' + array[i] + '\')"></div>';
        }
    })(memory_array);
    document.getElementById('card-container').innerHTML = output;
}

function timer() {
    let miliseconds = 0,
    seconds = 0,
    minutes = 0;
    
    function counter () {
        document.getElementById('miliseconds').innerHTML = miliseconds;
        miliseconds++;
        if (miliseconds == 60) {
            miliseconds = 0;
            seconds++;
            document.getElementById('seconds').innerHTML = seconds;
        }
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            document.getElementById('minutes').innerHTML = minutes;
        }
        setTimeout(counter(), 100);
    }
}