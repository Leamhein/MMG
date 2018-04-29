let hard = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'],
    med = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'],
    low = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let memory_array = [],
    cards_flipped = 0,
    card_shirt;

window.onload = newBoard;

Array.prototype.shuffle = function () { //array shuffle function
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

function newBoard() { //create new game board with cards
    let output = '',
        firstFlippedCard,
        secondFlippedCard,
        count = 0;

    //flag which shows how many cards are flipped
    cards_flipped = 0;
    //choose cards quantity
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
    //choose cards shirts
    switch (localStorage.getItem('card_shirt')) {
        case 'first':
            card_shirt = '';
            break;
        case 'second':
            card_shirt = 'style="background-position: 548px"';
            break;
        case 'third':
            card_shirt = 'style="background-position: -549px"';
            break;
        case null:
            card_shirt = '';
            break;
    };

    (function (array) { //create every card
        for (let i = 0, length = array.length; i < length; i++) {
            output += `<div id="card_${i} ${array[i]}" class="cards" ${card_shirt}><div class="card-face">${array[i]}</div></div>`;
        }
    })(memory_array);
    //fill the game board with cards
    document.getElementById('card-container').innerHTML = output;

    document.getElementById('card-container').addEventListener("click", timer);
    document.getElementById('card-container').addEventListener("click", flipCard);

    function timer() {
        let target = event.target,
            milliseconds = 0,
            seconds = 0,
            minutes = 0;
        if (target.className != 'cards') {
            return;
        }
        document.getElementById('card-container').removeEventListener("click", timer);
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
    };

    function flipCard() {

        switch (cards_flipped) {
            case 0:
                if (event.target.id == "card-container") {
                    break;
                } else {
                    if (firstFlippedCard !== undefined) {
                        firstFlippedCard.classList.remove("rotate");
                        secondFlippedCard.classList.remove("rotate");
                    }
                }
                firstFlippedCard = document.getElementById(event.target.id);
                firstFlippedCard.classList.add("rotate");
                cards_flipped++;
                break;

            case 1:
                if (event.target.id == "card-container") {
                    break;
                };
                secondFlippedCard = document.getElementById(event.target.id);
                secondFlippedCard.classList.add("rotate");
                if (firstFlippedCard.id.split(' ')[1] == secondFlippedCard.id.split(' ')[1]) {
                    firstFlippedCard.style.opacity = 0;
                    secondFlippedCard.classList.add('hidden');
                    count++;
                };
                if (count == (memory_array.length / 2)) {
                    //stop timer
                    //load new page
                }
                cards_flipped = 0;
                break;
        }
    };
};
