//classes for html element
const cardClass = [
	"enemy",
	"player"
];

var input;
var streak = 0;

var body = document.querySelector("body");
var lowerButton = document.querySelector(".lower__button");
var higherButton = document.querySelector(".higher__button");
var shuffleButton = document.querySelector(".shuffle__button");
var helpButton = document.querySelector(".help");


//start game
function start () {

	//create card elements
	for (let i = 0; i < cardClass.length; i++) {

		//create img element with empty content
		var cardElement = document.createElement('img'),
			cardContent = document.createTextNode('');

		cardElement.classList.add(cardClass[i]);

		//put element into html
		cardElement.appendChild(cardContent);
		var cardPosition = document.getElementsByTagName('div')[i+1];
		cardPosition.appendChild(cardElement);

		cardElement.src = '00.png';
		
	}

	alert('Press the "Lower" or "Higher" button to guess if your card (the lower one) is lower or higher than the opponents card (the upper one). \n\n You win the game if you guess correctly. \n\n Hit shuffle to restart the game.');

}

function removeScore () {

	var resultNode = document.querySelector(".result");
	var streakNode = document.querySelector(".streak");

	if (resultNode) {
		body.removeChild(resultNode);
	};

	if (streakNode) {
		body.removeChild(streakNode);
	};
	
}

//generate new deck with cards 2~9 of hearts
function getNewDeck () {

	removeScore();

	// Create a request variable and assign a new XMLHttpRequest object to it.
	var shuffleCards = new XMLHttpRequest();

	// Open a new connection, using the GET shuffleCards on the URL endpoint
	shuffleCards.open('GET', 'https://deckofcardsapi.com/api/deck/new/shuffle/?cards=2H,3H,4H,5H,6H,7H,8H,9H', true);

	shuffleCards.onload = function () {
		// Begin accessing JSON data here
		var data = JSON.parse(shuffleCards.response);
		getCards(data.deck_id);
	}

	// Send request
	shuffleCards.send();

}

//get 2 random cards
function getCards(deckId){

	// Create a request variable and assign a new XMLHttpRequest object to it.
	var drawCards = new XMLHttpRequest();

	// Open a new connection, using the GET drawCards on the URL endpoint
	drawCards.open('GET', 'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=2', true);

	drawCards.onload = function () {
		// Begin accessing JSON data here
		var data = JSON.parse(drawCards.response);
		play(data);
	}

	// Send request
	drawCards.send();

}

function selectLower () {
	input = false;
	getNewDeck();
}

function selectHigher () {
	input = true;
	getNewDeck();
}

function play (array) {

	//get card element
	var enemyCardReal = document.querySelector(".enemy");
	var playerCardReal = document.querySelector(".player");

	//retreive card images links from API
	var enemyCard = array.cards[0].image;
	var yourCard = array.cards[1].image;

	//retreive card values from API
	var enemyScore = array.cards[0].value;
	var yourScore = array.cards[1].value;

	enemyCardReal.src = enemyCard;
	playerCardReal.src = yourCard;

	//calculate the result
	var higher;
	var result;

	if (yourScore > enemyScore) {
		higher = true;
	} else {
		higher = false;
	}

	//compare the result to the input
	if (input === higher) {
		result = "You win!";
		streak++;
	} else {
		result = "You lose";
		streak = 0;
	}

	//create img element with empty content
	var winElement = document.createElement('div'),
		winContent = document.createTextNode(result);

	winElement.classList.add('result');

	//put element into html
	winElement.appendChild(winContent);
	var winPosition = document.getElementsByTagName('body')[0];
	winPosition.appendChild(winElement);

	if (streak > 1) {
		//create img element with empty content
		var streakElement = document.createElement('div'),
			streakContent = document.createTextNode('streak = ' + streak);

		streakElement.classList.add('streak');

		//put element into html
		streakElement.appendChild(streakContent);
		var streakPosition = document.getElementsByTagName('body')[0];
		streakPosition.appendChild(streakElement);
	};

}

lowerButton.addEventListener('click', selectLower);
higherButton.addEventListener('click', selectHigher);
shuffleButton.addEventListener('click', restart);
helpButton.addEventListener('click', help);

function restart () {

	//get card element
	var enemyCardReal = document.querySelector(".enemy");
	var playerCardReal = document.querySelector(".player");
	enemyCardReal.src = "00.png";
	playerCardReal.src = "00.png";
	removeScore();
	console.clear();
}

function help () {
	alert('Press the "Lower" or "Higher" button to guess if your card (the lower one) is lower or higher than the opponents card (the upper one). \n\n You win the game if you guess correctly. \n\n Hit shuffle to restart the game.');
}

start();