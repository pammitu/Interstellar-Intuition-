const startBtn = document.getElementById("start-button");
const stats = document.getElementById("score");
const spaceObjects = document.querySelectorAll(".space-object");


let firstCard = null;
let secondCard = null;
let pairsFound = 0;
let badGuesses = 0;
let score = 0;

startBtn.addEventListener("click",startGame);
    let timerInterval; 

function startTimer(){
    let timeRemaining = 120;

    timerInterval = setInterval(() => {
        timeRemaining--;

    const timerElement = document.getElementById("timer");
        timerElement.textContent = "Time Remaining: " + timeRemaining + "s";

if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    timeUp();
     }
    }, 1000);
}

function timeUp() {
    clearInterval(timerInterval);
    showMessage("You ran out of time! Your final score is: " + score);
    resetGame();
}

function resetGame(){
    clearInterval(timerInterval);

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

function startGame() {
 clearInterval(timerInterval);
 startTimer();
    const spaceObjectsArray = Array.from(spaceObjects);
    spaceObjectsArray.sort(() => Math.random() - 0.5);

    for(let i = 0; i < spaceObjectsArray.length; i++) {
        spaceObjectsArray[i].style.order = i;
    }

    spaceObjects.forEach(spaceObject => {
        spaceObject.addEventListener("click", flipCard);
    });
    hideMessage();
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
            disableCards(firstCard, secondCard);
            firstCard = null;
            secondCard = null;

            if (pairsFound === 10) {
                clearInterval(timerInterval);
                showMessage('YOU WON!! FINAL SCORE IS: ' + score);
                resetGame();
            }
        } else {
            badGuesses++;
            score -= 10;
            showMessage("Score: " + score + " You've made " + badGuesses + " bad guesses so far");

            if (badGuesses === 20) {
                clearInterval(timerInterval)
                showMessage("YOU LOST! FINAL SCORE IS: " + score);
                restartGame();

            } else {
                    hideCard(firstCard);
                    hideCard(secondCard);
                    firstCard = null;
                    secondCard = null;
                }
            }
          
            updateStats();
            isFlipping = false;
        }, 800);
    }
}

function showCard(card) {
    const openFace = card.querySelector('.open-face');
    const hiddenSide = card.querySelector(".hidden-side");

    openFace.style.display = 'none';
    hiddenSide.style.display = 'block';
}

function hideCard(card) {
    const openFace = card.querySelector('.open-face');
    const hiddenSide = card.querySelector('.hidden-side');

    openFace.style.display = 'block';
    hiddenSide.style.display = 'none';
}

function isMatch(card1,card2) {
    const img1 = card1.querySelector('.hidden-side');
    const img2 = card2.querySelector('.hidden-side');

    return img1.src === img2.src;
}
function updateStats(){
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score;

    const pairsElement = document.getElementById("pairs");
    pairsElement.textContent = "Pairs Found: " + pairsFound;

    const foulsElement = document.getElementById("fouls");
    foulsElement.textContent = "Bad Guesses: " + badGuesses;
}

function showMessage(text) {
    const message = document.getElementById("message");
    message.textContent = text;
    message.style.display = 'block';
}

function hideMessage() {
    const message = document.getElementById("message");
    message.style.display = 'none';
}

function disableCards(card1, card2) {
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click",flipCard);
}

const restartBtn = document.getElementById("restart-button");
restartBtn.addEventListener("click",restartGame);

function restartGame() {
restartBtn.style.display = 'none';
resetGame();
}

const stopBtn = document.getElementById("stop-button");
stopBtn.addEventListener('click',pauseGame);

let isPaused = false;
function pauseGame() {
    if(!isPause) {
        clearInterval(timerInterval);
        isPaused = true;
    } else {
        startTimer();
        isPaused = false;
    }
}

