// shuffle the deck when the page finishes loading
document.addEventListener("DOMContentLoaded", shuffleDeck);

// add event listener for when username form is submitted
const form = document.getElementById("userinfo");
form.addEventListener('submit', startGame);

// define the modal as a variable
const modal = document.getElementById("modal");
// function to start game when the button on modal is clicked
function startGame(event) {
    // prevent default action of the form
    event.preventDefault();
    let username = document.getElementById("name").value;
    const statInput = document.getElementById("stat-input");
    // add user input into above the game info details
    statInput.innerHTML = `Welcome, <span id=player-name>${username}</span>!<br>Thank you for playing!<br>Your current game stats are here:`;
    modal.style.display = "none";  // remove modal display when the game starts
}

// function to control the timer on the game
let seconds = 0;
let timeInterval = 0;
const matches = document.getElementsByClassName("match");
let startButton = document.getElementById("submit-start");
// set an onclick attribute to the start button to start the timer at 1000ms intervals (interval per second)
startButton.setAttribute('onclick', 'timeInterval =  setInterval(gameTimer, 1000)');
function gameTimer() {
    document.getElementById("time").innerHTML = ++seconds;
    if (matches.length === 6) { // if 6 matches are found, the game ends and the timer stops
        clearInterval(timeInterval);
        endGame();
    }
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
let haltFlip = false;
// function to flip the card on click, used this video for help https://www.youtube.com/watch?v=ZniVgo8U7ek. credited in the readme.
function flipCard() {
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

let previousMoves = 0;
// function to update moves number
function incrementMoves() { // used the Love Maths practice project to help with incrementing the moves
    let previousMoves = parseInt(document.getElementById("moves").innerText);
    if (firstCard.dataset.cat !== secondCard.dataset.cat) { // if the datasets match exactly, its the same card so it should not count as a move
    document.getElementById("moves").innerText = ++previousMoves;
    }
}

// function to check if the cards match
function checkPair() {
    // if first and second card match, remove the click event listener
    // cards match if the dataset matches excluding the last 2 characters
    if (firstCard.dataset.cat.slice(0, -2) === secondCard.dataset.cat.slice(0, -2) && firstCard.dataset.cat.slice(-2) !== secondCard.dataset.cat.slice(-2)) {
        //if the last two characteres in the dataset match, it is the same card so it should not count as a pair
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        secondCard.classList.add("match");
    } else {
        // if they don't match, remove the flip class so the back face of the card is returned
        returnCards();
    }
}

// if the cards do not match, flip them back over.
function returnCards() {
    haltFlip = true; // haltFlip locks the rest of the cards while the second card is turning
    setTimeout(() => { // credit to this tutorial, also in readme https://www.youtube.com/watch?v=ZniVgo8U7ek
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        haltFlip = false;
    }, 900);
}

// reset game function
function resetGame() {
    for (let card of cards) {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        card.classList.remove("match");
    }
    // reset moves to zero
    document.getElementById("moves").innerHTML = 0;
    previousMoves = 0;
    seconds = -1; // reset the timer, set to -1 as was going to 1
    setTimeout(() => { // setting timeout on the shuffle reset, cards were shuffling before flipping back over
        shuffleDeck(); // when game is reset, shuffle cards
    }, 200);
}

// end of game function, re-uses the start modal & edit the content with template literal
function endGame() {
    modal.style.removeProperty("display"); // re-use the welcome modal for the success modal
    const timeScore = document.getElementById('time').innerText;
    const movesScore = document.getElementById("moves").innerText;
    const playerName = document.getElementById("player-name").innerText;
    let successModal = `
    <div id="modal-content">
    <h1>Congratulations!<h1>
    <p>
    ${playerName}, you're a winner!
    <br>
    <br>
    You found all matches in ${timeScore} seconds
    <br>
    <br>
    You managed to find all matches in ${movesScore} moves
    <br>
    <br>
    Well done!
    </p>
    <button onclick="replayGame()" id="restart">Click Here to Play Again!</button>
    </div>
    `;
    modal.innerHTML = successModal;
}

// function to replay the game when the restart button is clicked
function replayGame() {
    timeInterval = setInterval(gameTimer, 1000);
    resetGame(); // shuffle deck and restart the moves and timer to zero
    modal.style.display = "none";
}

// get array from cards Class HTML collection
let cardsArray = Array.from(cards);
// function to shuffle the cards, used this tutorial for help implementing this; https://www.youtube.com/watch?v=3uuQ3g92oPQ 
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