const app = new Vue({
	el: "#app",
	data: {
		input: true,
		streak: 0,
		lowerButton: document.querySelector(".lower__button"),
		higherButton: document.querySelector(".higher__button"),
		shuffleButton: document.querySelector(".shuffle__button"),
		helpButton: document.querySelector(".help"),
	},
	methods: {
		start(){
			alert('Press the "Lower" or "Higher" button to guess if your card (the lower one) is lower or higher than the opponents card (the upper one).\n\n You win the game if you guess correctly. \n\n Hit shuffle to restart the game.');
		},
		removeScore(){

			var body = document.querySelector("body");
			var resultNode = document.querySelector(".result");
			var streakNode = document.querySelector(".streak");
		
			if (resultNode) {
				body.removeChild(resultNode);
			};
		
			if (streakNode) {
				body.removeChild(streakNode);
			};

			var enemyCardReal = document.querySelector(".enemy");
			var playerCardReal = document.querySelector(".player");
			enemyCardReal.src = "00.png";
			playerCardReal.src = "00.png";
			
		},
		getNewDeck(){
			this.removeScore();
		
			// Create a request variable and assign a new XMLHttpRequest object to it.
			var shuffleCards = new XMLHttpRequest();
		
			// Open a new connection, using the GET shuffleCards on the URL endpoint
			shuffleCards.open('GET', 'https://deckofcardsapi.com/api/deck/new/shuffle/?cards=2H,3H,4H,5H,6H,7H,8H,9H', true);
		
			shuffleCards.onload = () => {
				// Begin accessing JSON data here
				var data = JSON.parse(shuffleCards.response);
				this.getCards(data.deck_id);
			}
		
			// Send request
			shuffleCards.send();
		},
		getCards(deckId){

			// Create a request variable and assign a new XMLHttpRequest object to it.
			var drawCards = new XMLHttpRequest();
		
			// Open a new connection, using the GET drawCards on the URL endpoint
			drawCards.open('GET', 'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=2', true);
		
			drawCards.onload = () => {
				// Begin accessing JSON data here
				var data = JSON.parse(drawCards.response);
				this.play(data);
			}
		
			// Send request
			drawCards.send();
		
		},
		play(array){

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
				this.streak++;
			} else {
				result = "You lose";
				this.streak = 0;
			}

			//create win element with empty content
			var winElement = document.createElement('div'),
				winContent = document.createTextNode(result);
		
			winElement.classList.add('result');
		
			//put element into html
			winElement.appendChild(winContent);
			var winPosition = document.getElementsByTagName('body')[0];
			winPosition.appendChild(winElement);
		
			if (this.streak > 1) {
				//create img element with empty content
				var streakElement = document.createElement('div'),
					streakContent = document.createTextNode('streak = ' + this.streak);
		
				streakElement.classList.add('streak');
		
				//put element into html
				streakElement.appendChild(streakContent);
				var streakPosition = document.getElementsByTagName('body')[0];
				streakPosition.appendChild(streakElement);
			};
		},
		selectLower(){
			input = false;
			this.getNewDeck();
		},
		selectHigher(){
			input = true;
			this.getNewDeck();
		},
		restart(){
			this.removeScore();
		}
	},
	template:`
	<div class="game">
		<div class="deck">
			<div class="card">
				<img class="enemy" src="00.png">
			</div>
			<div class="card">
				<img class="player" src="00.png">
			</div>
		</div>
		<div class="footer">
			<span class="lower__button" v-on:click="selectLower">Lower</span>
			<span class="higher__button" v-on:click="selectHigher">Higher</span>
			<span class="shuffle__button" v-on:click="restart">Shuffle</span>
			<span class="help" v-on:click="start">Help</span>
		</div>
	</div>
	`
})
