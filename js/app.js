
// cards array holds all cards (MAYBE ONE ARRAY DIRECTLY)
let card = document.getElementsByClassName("card");
let cardsList = [...card];
//The deck that contains the cards.
const deck = document.querySelector(".deck");

/* List of open cards */
let openCards = [];
/* List of matched cards */
let matchedCards =[];
/* Number of moves */
var numberMoves = 0;

/* Number of Stars */
const stars = document.querySelector('.stars');
const star = document.querySelector('li');
const starIcon = document.getElementsByClassName('fa-star');



/* Game start when page is loaded*/
document.onload = gameStart();

/* Game start function */
function gameStart() {
	cardsList = shuffle(cardsList);
	numberMoves = 0;
	matchedCards = [];
	openCards = [];

	for (let i = 0; i < cardsList.length; i++) {
		deck.innerHTML = "";
		[].forEach.call(cardsList, function(addCards) {
			deck.appendChild(addCards);
		});

		for (let j = 0; j < cardsList.length; j++) {
			cardsList[j].classList.remove('open','show','match');
		}
	}
}


/*Restart game when click on Restart button */
const restart = document.querySelector('.restart');
restart.addEventListener('click', function() {
	console.log('restart button clicked');
	gameStart();
});



/* Show card when click on it */
document.querySelector('.deck').addEventListener('click', function(event) {
	if (event.target.nodeName === 'LI') {
		event.target.classList.add('open', 'show');
		openCards.push(event.target);
		movesConter();
	}
});



/* Numer moves in two cards */
function movesConter () {
	numberMoves += 1;
	//moves.textContent = numberMoves;
	starRating();
}


/* Start Rating */
function starRating() {
	if (numberMoves === 10) {
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
