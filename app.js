
const fruitsArray = ['apple', 'apple', 'banana', 'banana', 'brocoli', 'brocoli', 'cherry', 'cherry', 'pepper', 'pepper', 'straw', 'straw'];

function arrayRandomisation(array) {
    let fruitsArrayRandomised = [...array];
    for (let i = 0; i < 60; i++) {
        const randomNumberArrayOne = Math.floor(Math.random() * fruitsArrayRandomised.length);
        const randomNumberArrayTwo = Math.floor(Math.random() * fruitsArrayRandomised.length);
        [fruitsArrayRandomised[randomNumberArrayOne], fruitsArrayRandomised[randomNumberArrayTwo]] = [fruitsArrayRandomised[randomNumberArrayTwo], fruitsArrayRandomised[randomNumberArrayOne]];
    }
    return fruitsArrayRandomised
}

function cardsDisplayer() {
    const fruitArrayRandomised = arrayRandomisation(fruitsArray);
    console.log(fruitArrayRandomised)
    const cardsContainer = document.getElementById('cards-container');

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

        cardContainer.addEventListener('click', nono);

        function nono() {
            const imgFruitFlipped = cardContainer.firstChild
            if (!cardContainer.classList.contains('flipped')) {
                cardContainer.classList.add('flipped');
                cardContainer.removeEventListener('click', nono);
                setTimeout(() => {
                    imgFruitFlipped.src = `ressources/${imgFruitFlipped.dataset.fruit}.svg`;
                    imgFruitFlipped.alt = `image of a ${imgFruitFlipped.dataset.fruit}`;
                }, 200)

                setTimeout(() => {
                    cardContainer.classList.remove('flipped');
                    setTimeout(() => {
                        imgFruitFlipped.src = `ressources/question.svg`;
                        imgFruitFlipped.alt = `Image of a question mark`;
                    }, 200);
                    setTimeout(() => {
                        cardContainer.addEventListener('click', nono);
                    },400)
                }, 1000)
            }
        }
    }

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

    //             setTimeout(() => {
    //                 cardContainer.classList.remove('flipped');
    //                 setTimeout(() => {
    //                     imgFruitFlipped.src = `ressources/question.svg`;
    //                     imgFruitFlipped.alt = `Image of a question mark`;   
    //                 }, 200);

    //                 // cardsContainer.addEventListener('click', nono);

    //             }, 1000)
    //         }
    //     }
    // }

    // const cardContainer = event.target.closest('.card-container');
    // const imgFruitFlipped = cardContainer.firstChild;

    // //    console.log(cardContainer,imgFruitFlipped )
    // //    console.log(cardContainer.classList.contains('flipped'))

    // if (!cardContainer.classList.contains('flipped')) {
    //     cardContainer.classList.add('flipped');
    //     setTimeout(() => {
    //         imgFruitFlipped.src = `ressources/${imgFruitFlipped.dataset.fruit}.svg`;
    //         imgFruitFlipped.alt = `image of a ${imgFruitFlipped.dataset.fruit}`;
    //     }, 200)

    //     setTimeout(() => {
    //         cardContainer.classList.remove('flipped')
    //         setTimeout(() => {
    //             imgFruitFlipped.src = `ressources/question.svg`;
    //             imgFruitFlipped.alt = `Image of a question mark`;
    //         }, 200)
    //     }, 1000)
    // }

}

cardsDisplayer()


