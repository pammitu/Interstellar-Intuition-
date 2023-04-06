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
let isFlipping = false; 

function flipCard(event) {
    if(isFlipping) return;

    if (firstCard === null) {
        firstCard = event.currentTarget;
        showCard(firstCard);
    } else if (secondCard === null && event.currentTarget !== firstCard) {
        secondCard = event.currentTarget;
        showCard(secondCard);
        
        isFlipping = true;


        setTimeout(() => {
        if (isMatch(firstCard, secondCard)) {
            pairsFound++;
            score += 100;
            firstCard = null;
            secondCard = null;

            if (pairsFound === 10) {
                showMessage('YOU WON!! FINAL SCORE IS: ' + score);
                resetGame();
            }
        } else {
            badGuesses++;
            score -= 10;
            showMessage("Score: " + score + " You've made " + badGuesses + " bad guesses so far");

            if (badGuesses === 20) {
                showMessage("YOU LOST! FINAL SCORE IS: " + score);
                resetGame();
            } else {
                    hideCard(firstCard);
                    hideCard(secondCard);
                    firstCard = null;
                    secondCard = null;
                }
            }

          if (pairsFound + badGuesses === 19) {
                showMessage("You lost");
                resetGame();
        }
          
            updateStats();
            isFlipping = false;
        }, 800);
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
    }, 5000);
}

function showMessage(msg) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = msg;
    messageElement.style.display = 'block';

    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}