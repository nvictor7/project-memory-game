let moves = 0,
	status = ['open', 'match', 'mismatch'],
	openedCards = [],
	matchedPairs = 0,
	setTimer;

//Star ratings based on moves
const setRatings = () => {
	if (moves > 21 && moves < 30) {
		$('.star3').removeClass().addClass('fa fa-star-o');
	} else if (moves > 30) {
		$('.star2').removeClass().addClass('fa fa-star-o');
	}
}

// Create timer
const timer = () => {
	let timeStart = new Date().getTime();
	setTimer = setInterval(() => {
		let now = new Date().getTime();
		let elapsedTime = now - timeStart;
		let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
		if (seconds < 10) {
			seconds = '0' + seconds
		}
		let displayTimer = minutes + ':' + seconds;
		$('.timer').html(displayTimer);
	}, 1000);
}

// Stop timer
const stopTimer = () => {
	clearInterval(setTimer);
}

// Game restarts when a user clicks
const restartGame = () => {
	$('.restart').click(function() {
		location.reload();
	})
}

const playGame = () => {
	
	const clearOpenCards = (array) => {
		array.length = 0;
		return array;
	}
	let setTimer;

	// Shuffle function from http://stackoverflow.com/a/2450976
	const shuffle = (array) => {
	    let currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

	    return array;
	};
	restartGame();
	let randomizedCards = shuffle(cards);
	for (let card of randomizedCards) {
		let liElem = document.createElement('li');
		let iElem = document.createElement('i');
		$(liElem).addClass('card').addClass(card.id);
		$(iElem).addClass(card.symbol);
		$(liElem).append(iElem);
		$('.deck').append(liElem);

		// When each card is clicked 
		$(liElem).click(function() {
			if ($(liElem).hasClass('open')) {
				return false;
			} else {
				moves++;
				if (moves === 1) {
					timer();
				};
				$('.moves').html(moves);
				setRatings();				
				$(liElem).addClass('open show');

				// Store cards that are opened
				openedCards.push(liElem);
				if (openedCards.length > 1) {
					let firstCard = openedCards[0];
					let secondCard = openedCards[1];

					// Check card matching
					if (($(firstCard).hasClass(card.id)) === ($(secondCard).hasClass(card.id))) {
						matchedPairs++;
						$(firstCard).addClass('match');
						$(secondCard).addClass('match');
						clearOpenCards(openedCards);
					} else {
						$(firstCard).addClass('mismatch');
						$(secondCard).addClass('mismatch');

						// Hide symbols if not matched
						setTimeout(function() {
							$(firstCard).removeClass('open show');
							$(secondCard).removeClass('open show');
							clearOpenCards(openedCards); 	
						}, 500);
					}
				}
				// End game
				if (matchedPairs === 8) {
	 	 				stopTimer();
	 	 				setTimeout(() => {
	 	 					$('#congrats-modal').css('display', 'block');
	 	 				}, 1000);
				}
			}
		})
	}
};

playGame();

