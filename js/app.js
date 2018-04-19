/*
 * Create a list that holds all of your cards
 */


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
let numberMoves = 0;





/* Game start function */
function gameStart() {
	cardsList = shuffle(cardsList);

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


/* Show card when click on it */
document.querySelector('.deck').addEventListener('click', function(event) {
	if (event.target.nodeName === 'LI') {
		event.target.classList.add('open', 'show');
		openCards.push(event.target);
	}
});


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
