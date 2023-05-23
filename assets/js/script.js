// shuffle the deck when the page finishes loading
document.addEventListener("DOMContentLoaded", shuffleDeck);

// add event listener for when username form is submitted
let form = document.getElementById("userinfo");
form.addEventListener('submit', startGame);

// function to start game whe startButton is clicked
function startGame (event) {
    // prevent default action of the form
    event.preventDefault();
    let username = document.getElementById("name").value;
    let statInput = document.getElementById("stat-input");
    // add user input into above the game info details
    statInput.innerHTML = `Welcome, ${username}!<br>Thank you for playing!<br>Your current game stats are here:`;
    let modal = document.getElementById("modal");
    // remove modal display when the game starts
    modal.style.display = "none";
    // start the timer when the game starts
    let timeDisplay = document.getElementById("time");
    let startTime = Date.now();
    setInterval(function () {
        let timeSpent = Math.floor((Date.now() - startTime) / 1000);
        timeDisplay.innerText = timeSpent;
    })
}

// add event listener to call flipcard function when clicked
let cards = document.getElementsByClassName('card');
for (let card of cards) {
    card.addEventListener('click', flipCard);
}

// set first, second clicked card variables
let firstCard;
let secondCard;
let hasClicked = false;
let haltFlip = false
// function to flip the card on click
function flipCard(event) {
    if (haltFlip) return;
    this.classList.add('flip');
    // check if the first or second card has been clicked
    if (!hasClicked) { // if hasClicked is false, this is the first card being clicked
        hasClicked = true;
        firstCard = this;
    } else { // has clicked is true, this is the second card being clicked
        hasClicked = false;
        secondCard = this;
        incrementMoves();
        checkPair();
    }
}

// function to update moves number
function incrementMoves() {
    let previousMoves = parseInt(document.getElementById("moves").innerText);
    document.getElementById("moves").innerText = ++previousMoves;
}

// function to check if the cards match
function checkPair() {
    // if first and second card match, remove the click event listener
    // cards match if the dataset matches excluding the last 2 characters
    if (firstCard.dataset.cat.slice(0, -2) === secondCard.dataset.cat.slice(0, -2)
    //if the last two characteres in the dataset match, it is the same card so it should not count as a pair
    && firstCard.dataset.cat.slice(-2) !== secondCard.dataset.cat.slice(-2)) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        firstCard.classList.add("flipped");
        secondCard.classList.add("flipped");
    } else {
        // if they don't match, remove the flip class so the back face of the card is returned
        returnCards();
    }
}

function returnCards (){
    haltFlip = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        haltFlip = false
    }, 900);
}

// if the number of flipped cards is 12, run the end timer function
let flippedCards = document.getElementsByClassName("flipped");
if (flippedCards.length === 12) {
    endTimer();
    }
function endTimer () {
    console.log("timer finished");
}

// reset game function
function resetGame() {
    for (let card of cards) {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    }
    // reset moves to zero
    document.getElementById("moves").innerText = 0;
    document.getElementById("time").innerText = 0;
    setTimeout(() => { // setting timeout on the shuffle reset, cards were shuffling before flipping back over
    shuffleDeck(); // when game is reset, shuffle cards
    }, 200);

}

// get array from cards Class HTML collection
let cardsArray = Array.from(cards);
// function to shuffle the cards
function shuffleDeck() {
    for (let i = cardsArray.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        cardsArray[rand].style.order = i;
        cardsArray[i].style.order = rand;
    }
}

// set onclick attribute to call reset game function
let resetButton = document.getElementsByTagName('button')[1];
resetButton.setAttribute('onclick', 'resetGame();');

