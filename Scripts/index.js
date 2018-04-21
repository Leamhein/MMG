window.onload = function () {
    document.getElementById('difficult').onchange = function () {

        switch (this.selectedIndex) {
            case 1:
                localStorage.setItem('difficult','low');
                break;
            case 2:
                localStorage.setItem('difficult','med');
                break;
            case 3:
                localStorage.setItem('difficult','hard');
                break;
        };
    };
    
    document.getElementById('card_back').onchange = function () {

        switch (this.selectedIndex) {
            case 1:
                localStorage.setItem('card_back','1');
                break;
            case 2:
                localStorage.setItem('card_back','2');
                break;
            case 3:
                localStorage.setItem('card_back','3');
                break;
        };
    };
};


