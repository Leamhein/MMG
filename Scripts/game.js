let hard = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'],
    med = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'],
    low = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let memory_array = [],
    memory_values = [],
    memory_tile_ids = [],
    tiles_flipped = 0,
    card_shirt;

window.onload = newBoard;

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
    switch (localStorage.getItem('card_shirt')) {
        case 'first':
            card_shirt = '';
            break;
        case 'second':
            card_shirt = 'style="background-position: 584px"';
            break;
        case 'third':
            card_shirt = 'style="background-position: -586px"';
            break;
        case null:
            card_shirt = '';
            break;
    };

    tiles_flipped = 0;

    (function (array) {
        for (let i = 0, length = array.length; i < length; i++) {
            output += `<div id="card_G" class="cards" onclick="FlipCard(this, 'G')" ${card_shirt}></div>`;
        }
    })(memory_array);
    document.getElementById('card-container').innerHTML = output;
    document.getElementById('card-container').addEventListener("click", selectElement);

    function selectElement (event) {
        let target = event.target;
        if (target.className != 'cards') {
            return;
        }
        timer();
    }
    
    function timer() {
        document.getElementById('card-container').removeEventListener("click", selectElement);
        let milliseconds = 0,
            seconds = 0,
            minutes = 0;
        setInterval(counter, 100);


        function counter() {
            document.getElementById('milliseconds').innerHTML = milliseconds;
            if (seconds < 10) {
                document.getElementById('seconds').innerHTML = '0' + seconds;
            } else {
                document.getElementById('seconds').innerHTML = seconds
            }
            if (minutes < 10) {
                document.getElementById('minutes').innerHTML = '0' + minutes;
            } else {
                document.getElementById('minutes').innerHTML = minutes;
            }
            milliseconds++;
            if (milliseconds > 9) {
                seconds++;
                milliseconds = 0;
            }
            if (seconds > 59) {
                minutes++;
                seconds = 0;
            }
            if (minutes < 10) {
                document.getElementById('minutes').innerHTML = '0' + minutes;
            }
        }
    }
};