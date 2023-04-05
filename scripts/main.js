const startBtn = document.getElementById("start-button");
const stats = document.getElementById("score");
const spaceObjects = document.querySelectorAll(".space-object");

let firstCard = null;
let secondCard = null;
let pairsFound = 0;
let badGuesses = 0;
let score = 0;

startBtn.addEventListener("click",startGame);

function startGame() {
    //shuffle cards????????????????? how
    
    const spaceObjectsArray = Array.from(spaceObjects);
    spaceObjectsArray.sort(() => Math.random() - 0.5);

    for(let i = 0; i<spaceObjectsArray.length; i++) {
        spaceObjectsArray[i].style.order = i;
    }

    //add click event listeners to cards???? 

    spaceObjects.forEach(spaceObject => {
        spaceObject.addEventListener("click", flipCard);
    });
}

function flipCard(event) {
    if (firstCard === null) {
        firstCard = event.currentTarget;
        showCard(firstCard);
    } else if (secondCard === null && event.currentTarget !== firstCard) {
        secondCard = event.currentTarget;
        showCard(secondCard);

        spaceObjects.forEach(spaceObject => {
            spaceObject.removeEventListener("click", flipCard);
        });

        setTimeout(() => {

        if (isMatch(firstCard, secondCard)) {
            pairsFound++;
            score += 100;
            firstCard = null;
            secondCard = null;

            if (pairsFound === 10) {
                alert ('YOU WON!! IT LOOKS LIKE YOUR FINAL SCORE IS: ' + score);
                resetGame();
            }
        } else {
            badGuesses++;
            score -= 10;
            alert("DUDE? are you serious... Score: " + score + " You've made " + badGuesses + " so far");

            if (badGuesses === 6) {
                alert("YOU LOST! FINAL SCORE IS: " + score);
                resetGame();
            } else {
                    hideCard(firstCard);
                    hideCard(secondCard);
                    firstCard = null;
                    secondCard = null;
                }
            }

            spaceObjects.forEach(spaceObject => {
                spaceObject.addEventListener("click",flipCard);
            });

            updateStats();
        }, 500);
    }
}

function showCard(card) {
    const openFace = card.querySelector('.open-face');
    const hiddenSide = card.querySelector(".hidden-side");

    openFace.style.opacity = 0;
    hiddenSide.style.opacity = 1;
}

function hideCard(card) {
    const openFace = card.querySelector('.open-face');
    const hiddenSide = card.querySelector('.hidden-side');

    openFace.style.opacity = 1;
    hiddenSide.style.opacity = 0;
}

function isMatch(card1,card2) {
    const img1 = card1.querySelector('.hidden-side');
    const img2 = card2.querySelector('.hidden-side');

    return img1.src === img2.src;
}

function updateStats() {
    const pairsElement = document.getElementById('pairs');
    const foulsElement = document.getElementById('fouls');

    stats.textContent = "Score: " + score;
    pairsElement.textContent = "Total Pairs: " + pairsFound;
    foulsElement.textContent = "Fouls: " + badGuesses;
}

function resetGame() {
    spaceObjects.forEach(spaceObject => {
        hideCard(spaceObject);
    });

    setTimeout(() => {
        startGame();
        pairsFound = 0;
        badGuesses = 0;
        score = 0;
        updateStats();
    }, 1000);
}