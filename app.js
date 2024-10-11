let spamMode = false;
let spamModeButton = document.getElementById('spam-mode');

spamModeButton.addEventListener('click',() => {
    spamModeButton.classList.toggle('activated');
   if( spamModeButton.classList.contains("activated")){
    spamMode = true;
   }
});

const fruitsArray = ['apple', 'apple', 'banana', 'banana', 'brocoli', 'brocoli', 'cherry', 'cherry', 'pepper', 'pepper', 'straw', 'straw'];

let scoreCounter = 0;
const scoreDisplay = document.getElementById('scoreDisplay')
function scoreHandlerAndDisplayer() {
    // scoreCounter += 0.5;
    // scoreDisplay.textContent = scoreCounter % 1 === 0 ? scoreCounter : Math.floor(scoreCounter);
    scoreCounter++;
    scoreDisplay.textContent = scoreCounter;
}

let previousCard = null;
function resetCard(card) {
    setTimeout(() => {
        card.classList.remove('flipped');
        setTimeout(() => {
            card.firstChild.src = `ressources/question.svg`;
            card.firstChild.alt = `Image of a question mark`;
        }, 200);
        setTimeout(() => {
            card.addEventListener('click', cardHandler);
        }, 400)
    }, 1000)
}

function arrayRandomisation(array) {
    let fruitsArrayRandomised = [...array];
    for (let i = 0; i < 60; i++) {
        const randomNumberArrayOne = Math.floor(Math.random() * fruitsArrayRandomised.length);
        const randomNumberArrayTwo = Math.floor(Math.random() * fruitsArrayRandomised.length);
        [fruitsArrayRandomised[randomNumberArrayOne], fruitsArrayRandomised[randomNumberArrayTwo]] = [fruitsArrayRandomised[randomNumberArrayTwo], fruitsArrayRandomised[randomNumberArrayOne]];
    }
    return fruitsArrayRandomised
}
function cardscreaterAndDisplayer(cardsContainer) {
    const fruitArrayRandomised = arrayRandomisation(fruitsArray);
    console.log(fruitArrayRandomised)

    for (let i = 0; i < fruitArrayRandomised.length; i++) {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.setAttribute('tabindex', '0');

        const img = document.createElement('img');
        img.setAttribute('src', `ressources/question.svg`);
        img.setAttribute('alt', `image of a question mark`);
        img.classList.add('card-img');
        img.dataset.fruit = fruitArrayRandomised[i];

        cardContainer.appendChild(img);
        cardsContainer.appendChild(cardContainer);

        // cardContainer.addEventListener('click', nono);

        // function nono() {
        //     const imgFruitFlipped = cardContainer.firstChild
        //     if (!cardContainer.classList.contains('flipped')) {
        //         cardContainer.classList.add('flipped');
        //         cardContainer.removeEventListener('click', nono);
        //         setTimeout(() => {
        //             imgFruitFlipped.src = `ressources/${imgFruitFlipped.dataset.fruit}.svg`;
        //             imgFruitFlipped.alt = `image of a ${imgFruitFlipped.dataset.fruit}`;
        //         }, 200)

        //         setTimeout(() => {
        //             cardContainer.classList.remove('flipped');
        //             setTimeout(() => {
        //                 imgFruitFlipped.src = `ressources/question.svg`;
        //                 imgFruitFlipped.alt = `Image of a question mark`;
        //             }, 200);
        //             setTimeout(() => {
        //                 cardContainer.addEventListener('click', nono);
        //             },400)
        //         }, 1000)
        //     }
        // }
    }
}
function cardsHandler() {
    const cardsContainer = document.getElementById('cards-container');
    cardscreaterAndDisplayer(cardsContainer);

    cardsContainer.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });

    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        // return false;
    });

    // cardsContainer.addEventListener('click', nono);

    // function nono(event) {
    //     // console.log(event.propertyName)
    //     if (event.target.classList.contains('card-img')) {
    //         const imgFruitFlipped = event.target;
    //         const cardContainer = imgFruitFlipped.parentElement;

    //         if (!cardContainer.classList.contains('flipped')) {
    //             cardContainer.classList.add('flipped');
    //             // cardsContainer.removeEventListener('click', nono);
    //             setTimeout(() => {
    //                 imgFruitFlipped.src = `ressources/${imgFruitFlipped.dataset.fruit}.svg`;
    //                 imgFruitFlipped.alt = `image of a ${imgFruitFlipped.dataset.fruit}`;
    //             }, 200)

    //             // resetCard(cardContainer);
    //             previousCard = cardContainer;
    //         }
    //     }
    // }
}
cardsHandler()

const cards = document.querySelectorAll('.card-container');
cards.forEach((card) => {
    card.addEventListener('click', cardHandler);
});

function cardFlipper(cardContainer, imgFruitFlipped) {
    cardContainer.classList.add('flipped');
    setTimeout(() => {
        imgFruitFlipped.src = `ressources/${imgFruitFlipped.dataset.fruit}.svg`;
        imgFruitFlipped.alt = `image of a ${imgFruitFlipped.dataset.fruit}`;
    }, 200)
}

function cardHandler(event) {
    if (event.target.classList.contains('card-img')) {
        const imgFruitFlipped = event.target;
        const cardContainer = imgFruitFlipped.parentElement;

        if (!cardContainer.classList.contains('flipped') && previousCard) {
            cardFlipper(cardContainer, imgFruitFlipped)

            if(!spamMode){
            // Prevent cards spamming
            cards.forEach((card) => {
                card.removeEventListener("click", cardHandler);
                setTimeout(() => {
                    card.addEventListener("click", cardHandler);
                }, 800)
            });
            }

            if (cardContainer.firstChild.dataset.fruit != previousCard.firstChild.dataset.fruit) {
                resetCard(cardContainer);
                resetCard(previousCard);
            }
            previousCard = null;

        } else if (!cardContainer.classList.contains('flipped')) {
            scoreHandlerAndDisplayer()
            cardFlipper(cardContainer, imgFruitFlipped)
            cardContainer.removeEventListener('click', cardHandler);
            previousCard = cardContainer;
        }
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key == " ") {
      cards.forEach((card) => {
            card.classList.remove('flipped');
            setTimeout(() => {
                card.firstChild.src = `ressources/question.svg`;
                card.firstChild.alt = `Image of a question mark`;
            }, 200);
              card.addEventListener('click', cardHandler);
      });
      scoreCounter = 0;
      scoreDisplay.textContent = 0;
    }
});