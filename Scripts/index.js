window.onload = function () {
    document.getElementById('card_shirt').onchange = function () {

        switch (this.selectedIndex) {
            case 1:
                localStorage.setItem('card_shirt', 'first');
                break;
            case 2:
                localStorage.setItem('card_shirt', 'second');
                break;
            case 3:
                localStorage.setItem('card_shirt', 'third');
                break;
        };
    };
    document.getElementById('difficult').onchange = function () {

        switch (this.selectedIndex) {
            case 1:
                localStorage.setItem('difficult', 'low');
                break;
            case 2:
                localStorage.setItem('difficult', 'med');
                break;
            case 3:
                localStorage.setItem('difficult', 'hard');
                break;
        };
    };

};
