const gameState = {
    transitionning: false,
    previousCard: null,
    counter: 0,
    fastMode: null,
    slowMode: 1000
}

const fastModeButton = document.getElementById('spam-mode');
fastModeButton.addEventListener('click', () => {
    fastModeButton.classList.toggle('activated');
    if (fastModeButton.classList.contains("activated")) {
        gameState.fastMode = 400;
        fastModeButton.textContent = "Slow mode"
    } else {
        gameState.fastMode = null;
        fastModeButton.textContent = "Fast mode"
    }
});
fastModeButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.target.click();
    }
});

const scoreDisplay = document.getElementById('scoreDisplay');
function counterDisplayer() {
    gameState.counter += 0.5
    scoreDisplay.textContent = gameState.counter % 1 !== 0 ? Math.floor(gameState.counter) : gameState.counter;
}

const cards = document.querySelectorAll('.card');
function cardsEventHandler() {

    cards.forEach((card, index) => {
        function shuffleArray() {
            card.style.order =  Math.floor(Math.random() * cards.length);
        }
        shuffleArray();
    });

    function gridClickHandler(event) {
        const card = event.target.closest('.card');
        if (gameState.transitionning || !card) return;

        function checkForCorrespondance() {
            if (gameState.previousCard.dataset.attr == card.dataset.attr) {
                gameState.previousCard = null;
            }
            else if (gameState.previousCard) {
                gameState.transitionning = true;
                setTimeout(() => {
                    card.firstElementChild.classList.remove('active');
                    gameState.previousCard.firstElementChild.classList.remove('active');
                    gameState.transitionning = false;
                    gameState.previousCard = null;
                }, gameState.fastMode || gameState.slowMode)
            }
        }

        function flipCard() {
            if (card.firstElementChild.classList.contains('active')) return;
            card.firstElementChild.classList.add('active');
            counterDisplayer();

            if (gameState.previousCard) {
                checkForCorrespondance()

            } else {
                gameState.previousCard = card;
            }
        }
        flipCard();
    }

    const grid = document.querySelector('.grid');

    grid.addEventListener('click', gridClickHandler);
    grid.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.target.click();
        }
    });
}
cardsEventHandler()

function handleReset() {
    gameState.previousCard = null;
    cards.forEach((card) => {
        card.firstElementChild.classList.remove('active');
    });

    setTimeout(() => {
        cardsEventHandler();
        gameState.counter = 0;
        counterDisplayer();
    }, 260);
}

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', handleReset);
resetBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleReset();
    };
});

window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault()
        handleReset();
    };
});

// Claude
// ==================================
// Constants
// const TRANSITION_DELAY = 1000;
// const FAST_MODE_DELAY = 400;

// // Game state
// const gameState = {
//   isTransitioning: false,
//   previousCard: null,
//   score: 0,
//   isFastMode: false
// };

// // DOM Elements
// const fastModeButton = document.getElementById('spam-mode');
// const scoreDisplay = document.getElementById('scoreDisplay');
// const cards = document.querySelectorAll('.card');
// const resetBtn = document.getElementById('reset');

// // Event Listeners
// fastModeButton.addEventListener('click', toggleFastMode);
// resetBtn.addEventListener('click', handleReset);
// document.addEventListener('keydown', handleKeyPress);

// // Delegate card events to parent container
// document.querySelector('.grid').addEventListener('click', handleCardClick);

// function toggleFastMode() {
//   gameState.gameState.fastMode = !gameState.isFastMode;
//   fastModeButton.classList.toggle('activated');
//   fastModeButton.textContent = gameState.isFastMode ? "Slow mode" : "Fast mode";
// }

// function updateScoreDisplay() {
//   scoreDisplay.textContent = gameState.score;
// }

// function shuffleCards() {
//   cards.forEach(card => {
//     card.style.order = `${Math.floor(Math.random() * cards.length)}`;
//   });
// }

// function handleCardClick(event) {
//   const card = event.target.closest('.card');
//   if (!card || gameState.isTransitioning) return;

//   flipCard(card);
// }

// function flipCard(card) {
//   if (card.firstElementChild.classList.contains('active')) return;

//   card.firstElementChild.classList.add('active');
//   gameState.score++;
//   updateScoreDisplay();

//   if (gameState.previousCard) {
//     checkForMatch(card);
//   } else {
//     gameState.previousCard = card;
//   }
// }

// function checkForMatch(card) {
//   if (gameState.previousCard.dataset.attr === card.dataset.attr) {
//     gameState.previousCard = null;
//   } else {
//     gameState.isTransitioning = true;
//     setTimeout(() => {
//       card.firstElementChild.classList.remove('active');
//       gameState.previousCard.firstElementChild.classList.remove('active');
//       gameState.isTransitioning = false;
//       gameState.previousCard = null;
//     }, gameState.isFastMode ? FAST_MODE_DELAY : TRANSITION_DELAY);
//   }
// }

// function handleReset() {
//   cards.forEach(card => card.firstElementChild.classList.remove('active'));
//   setTimeout(() => {
//     shuffleCards();
//     gameState.score = 0;
//     updateScoreDisplay();
//   }, 260);
// }

// function handleKeyPress(e) {
//   if (e.key === ' ') {
//     e.preventDefault();
//     handleReset();
//   }
// }

// // Initialize game
// shuffleCards();
// updateScoreDisplay();