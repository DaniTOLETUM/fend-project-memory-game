
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
let matchedCards =[];
/* Number of moves */
var numberMoves = 0;
/* Timer */
let second = 0;
let minute = 0;
var timer = document.querySelector('.timer');
var interval;


/* Number of Stars */
const stars = document.querySelector('.stars');
const star = document.querySelector('li');
const starIcon = document.getElementsByClassName('fa-star');



/* Game start when page is loaded*/
document.onload = gameStart();

/* Game start function */
function gameStart() {
	cardsList = shuffle(cardsList);
	console.log('game started');

	for (let i = 0; i < cardsList.length; i++) {
		deck.innerHTML = "";
		[].forEach.call(cardsList, function(addCards) {
			deck.appendChild(addCards);
		});
		cardsList[i].classList.remove('show', 'open', 'match');
	}

	/*Reset variables*/
	numberMoves = 0;
	opened = 0;
	second = 0;
	minute = 0;
	matchedCards = [];
	openCards = [];
	/*Reset timer*/
	var timer = document.querySelector('.timer');
	timer.innerHTML="0 mins 0 secs";
	clearInterval(interval);
}


/*Restart game when click on Restart button */
const restart = document.querySelector('.restart');
restart.addEventListener('click', function() {
	console.log('restart button clicked');
	gameStart();
});


/*Function timer of the game */
function Timer() {
	interval = setInterval(function(){
		timer.innerHTML = minute+'mins '+second+'secs';
		second++;
		if (second === 60) {
			minute ++;
			second = 0;
		}
	}, 1000);
}


/* Numer moves while playing */
function movesConter () {
	console.log('function movesConter active');
	numberMoves += 1;
	if (numberMoves === 1) {
		Timer();
	}
}




/* Show card when click on it */
document.querySelector('.deck').addEventListener('click', function(event) {
if (event.target.nodeName === 'LI') {
	console.log('number of moves' + numberMoves);
    event.target.classList.add('open', 'show');
    console.log(event.target);
    openCards.push(event.target);
    console.log(openCards.length);
    movesConter();
}
if (openCards.length === 2 && (openCards[0].innerHTML !== openCards[1].innerHTML)) {
	notMatch();

}else if (openCards.length === 2 && (openCards[0].innerHTML == openCards[1].innerHTML)) {
	match();
}
});


/* Function when two cards don't match */
function notMatch() {
	console.log('function not match active');
	setTimeout(function () {
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
	console.log('number of cards matched' + matchedCards)
	allMatched();
}

/* Function to know if all cards are matched */
function allMatched() {
	if (matchedCards.length === 16) {
		gameOver();
	}
};



/* Function when Game is Over */
function gameOver() {
	console.log('Game Over my Friend');
}

/* Start Rating */
function starRating() {
	if (numberMoves === 16) {
		console.log('you have made 10 moves');
		stars.removeChild(star);
	}
	if (numberMoves ===25) {
		console.log('you have made 30 moves');
		stars.removeChild(star);
	}
	if (numberMoves === 35) {
		console.log('you made too much moves');
		stars.removeChild(star);
	}
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
