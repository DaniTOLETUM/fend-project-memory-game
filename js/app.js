// cards array holds all cards (MAYBE ONE ARRAY DIRECTLY)
let card = document.getElementsByClassName("card");
let cardsList = [...card];
//The deck that contains the cards.
const deck = document.querySelector(".deck");

/* List of open cards */
let openCards = [];
/*Cards Opened at time */
let opened = 0;
/* List of matched cards */
let matchedCards = [];
/* Number of moves */
var numberMoves = 0;
var moves = document.querySelector('.moves');
/* Timer */
let second = 0;
let minute = 0;
var timer = document.querySelector('.timer');
var finalTime = 0;
var interval;
/* Number of Stars */
const starIcon = document.getElementsByClassName('fa-star');
var starRate = 0;


/* Game start when page is loaded*/
document.onload = gameStart();

/* Game start function */
function gameStart() {
    cardsList = shuffle(cardsList);
    /*Reset variables*/
    numberMoves = 0;
    opened = 0;
    second = 0;
    minute = 0;
    matchedCards = [];
    openCards = [];
    /*Reset timer*/
    var timer = document.querySelector('.timer');
    timer.innerHTML = '0 mins 0 secs';
    clearInterval(interval);
    finalTime = 0;
    /*Reset moves*/
    moves = document.querySelector('.moves');
    moves.innerHTML = '0 Move(s)';
    /*Reset stars*/
    for (var i = 0; i < starIcon.length; i++) {
        starIcon[i].style.visibility = 'visible';
    };
    console.log('game started');

    for (let i = 0; i < cardsList.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cardsList, function(addCards) {
            deck.appendChild(addCards);
        });
        cardsList[i].classList.remove('show', 'open', 'match');
    };


}


/*Restart game when click on Restart button */
const restart = document.querySelector('.restart');
restart.addEventListener('click', function() {
    console.log('restart button clicked');
    gameStart();
});


/*Function timer of the game */
function Timer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + 'mins ' + second + 'secs';
        second++;
        if (second === 60) {
            minute++;
            second = 0;
        }
    }, 1000);
}


/* Numer moves while playing */
function movesConter() {
    console.log('function movesConter active');
    numberMoves += 1;
    moves.innerHTML = numberMoves + ' Move(s)';
    if (numberMoves === 1) {
        Timer();
    }
    starRating();
}


/* Start Rating */
function starRating() {
    if (numberMoves > 22 && numberMoves < 30) {
        console.log('you have made 18 moves');
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                starIcon[i].style.visibility = 'collapse';
            }
        }
    } else if (numberMoves > 31) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                starIcon[i].style.visibility = 'collapse';
            }
        }
    }
}


/* Show card when click on it */
document.querySelector('.deck').addEventListener('click', function(event) {
    if (openCards.length !== 2) {
        if (event.target.nodeName === 'LI') {
            console.log('number of moves' + numberMoves);
            event.target.classList.add('open', 'show');
            console.log(event.target);
            openCards.push(event.target);
            console.log(openCards.length);
            movesConter();
        }
    }
    if (openCards.length === 2 && (openCards[0].innerHTML !== openCards[1].innerHTML)) {
        notMatch();

    } else if (openCards.length === 2 && (openCards[0].innerHTML == openCards[1].innerHTML)) {
        match();
    }
});


/* Function when two cards don't match */
function notMatch() {
    console.log('function not match active');
    setTimeout(function() {
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
    }, 1000);
}

/* Function when two cards match */
function match() {
    console.log('funciton match active');
    openCards[0].classList.add('open', 'match');
    openCards[1].classList.add('open', 'match');
    matchedCards.push(openCards);
    openCards = [];
    if (matchedCards.length === 8) {
        gameOver();
    } else {
        console.log('number of cards matched' + matchedCards);
    }
}

/* Function when Game is Over */
function gameOver() {
    console.log('Game Over my Friend');
    /*Getting final time */
    finalTime = timer.innerHTML;
    clearInterval(interval);
    console.log(finalTime);
    /*Show Modal message*/
    /*Declare modal and close x */
    var modal = document.getElementById('myModal');
    var closeX = document.querySelector('.close');

    modal.classList.add('show');
    starRate = document.querySelector('.stars').innerHTML;
    document.getElementById('finalMove').innerHTML = numberMoves;
    document.getElementById('starRating').innerHTML = starRate;
    document.getElementById('totalTime').innerHTML = finalTime;
    /* if click on close x*/
    closeX.addEventListener('click', function() {
            modal.classList.remove('show');
            numberMoves = numberMoves;
        })
        /*IF click on Play Again*/
    playAgain = document.getElementById('playAgain');
    playAgain.addEventListener('click', function() {
        modal.classList.remove('show');
        gameStart();
    })

}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */