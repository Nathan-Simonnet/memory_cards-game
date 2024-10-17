let transitionning = false;
let previousCard = null;
let counter = 0;
let fastMode = null;

const fastModeButton = document.getElementById('spam-mode');
fastModeButton.addEventListener('click', () => {
    fastModeButton.classList.toggle('activated');
    if (fastModeButton.classList.contains("activated")) {
        fastMode = 400;
        fastModeButton.textContent = "Slow mode"
    } else {
        fastMode = null;
        fastModeButton.textContent = "Fast mode"
    }
});

const scoreDisplay = document.getElementById('scoreDisplay');
function counterDisplayer() {
    scoreDisplay.textContent = counter;
}

const fruitsArray = ['apple', 'apple', 'banana', 'banana', 'brocoli', 'brocoli', 'cherry', 'cherry', 'pepper', 'pepper', 'straw', 'straw'];
function arrayRandomisation(array) {
    let fruitsArrayRandomised = [...array];
    for (let i = 0; i < 60; i++) {
        const randomNumberArrayOne = Math.floor(Math.random() * fruitsArrayRandomised.length);
        const randomNumberArrayTwo = Math.floor(Math.random() * fruitsArrayRandomised.length);
        [fruitsArrayRandomised[randomNumberArrayOne], fruitsArrayRandomised[randomNumberArrayTwo]] = [fruitsArrayRandomised[randomNumberArrayTwo], fruitsArrayRandomised[randomNumberArrayOne]];
    }
    return fruitsArrayRandomised
};

function cardsEventHandler() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {

        function cardsFlipperHandler() {
            if (!transitionning) {

                if (!card.firstElementChild.classList.contains('active')) {

                    if (previousCard && previousCard.dataset.attr == card.dataset.attr) {
                        card.firstElementChild.classList.add('active');
                        previousCard = null;
                        counter++;
                        counterDisplayer();
                    }
                    else if (previousCard) {
                        transitionning = true;
                        card.firstElementChild.classList.add('active');
                        setTimeout(() => {
                            card.firstElementChild.classList.remove('active');
                            previousCard.firstElementChild.classList.remove('active');
                            transitionning = false;
                            previousCard = null;
                        }, fastMode || 1000)
                        counter++;
                        counterDisplayer();
                    } else {
                        card.firstElementChild.classList.add('active');
                        previousCard = card;
                    }
                }
            }
        }

        card.addEventListener('click', cardsFlipperHandler);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.target.click();
            }
        });
    });
}

function cardCreationAndDisplaying(reset) {
    const fruitArrayRandomised = arrayRandomisation(fruitsArray);
    const gridContainer = document.querySelector('.grid');
    if (reset) {
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
    }

    for (let i = 0; i < fruitArrayRandomised.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-attr', fruitArrayRandomised[i]);
        card.setAttribute('tabindex', 0);

        const doubleFace = document.createElement('div');
        doubleFace.classList.add('double-face');

        const frontFace = document.createElement('div');
        frontFace.classList.add('face', 'front');

        const frontImg = document.createElement('img');
        frontImg.src = `ressources/${fruitArrayRandomised[i]}.svg`;

        frontFace.appendChild(frontImg);

        const backFace = document.createElement('div');
        backFace.classList.add('face', 'back');

        const backImg = document.createElement('img');
        backImg.src = 'ressources/question.svg';
        backImg.classList.add('back-img');

        backFace.appendChild(backImg);
        doubleFace.appendChild(frontFace);
        doubleFace.appendChild(backFace);
        card.appendChild(doubleFace);
        gridContainer.appendChild(card)

    }
    cardsEventHandler();
}
cardCreationAndDisplaying()


function handleReset() {
    cardCreationAndDisplaying('reset');
    counter = 0;
    counterDisplayer()
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