// shuffle the deck when the page finishes loading
document.addEventListener("DOMContentLoaded", shuffleDeck);

// add event listener for when username form is submitted
const form = document.getElementById("userinfo");
form.addEventListener('submit', startGame);

// define the modal as a variable
const modal = document.getElementById("modal");
// function to start game when the button on modal is clicked
function startGame (event) {
    // prevent default action of the form
    event.preventDefault();
    let username = document.getElementById("name").value;
    const statInput = document.getElementById("stat-input");
    // add user input into above the game info details
    statInput.innerHTML = `Welcome, ${username}!<br>Thank you for playing!<br>Your current game stats are here:`;
    modal.style.display = "none";  // remove modal display when the game starts
}

let seconds = 0;
const matches = document.getElementsByClassName("match");
let startButton = document.getElementById("submit-start");
startButton.setAttribute('onclick', 'timeInterval =  setInterval(gameTimer, 1000)');
function gameTimer() {
        document.getElementById("time").innerHTML = ++seconds;
    if ( matches.length === 6) {
        clearInterval(timeInterval);
        endGame();
    }
}

function endGame(){
    modal.style.removeProperty("display"); // re-use the welcome modal for the success modal
    const timeScore = document.getElementById('time').innerText;
    const movesScore = document.getElementById("moves").innerText;
    let successModal = `
    <div id="modal-content">
    <h1>Congratulations, you're a winner!<h1>
    <p>You found all matches in ${timeScore} seconds!
    <br>
    You managed to find all matches in ${movesScore} moves!
    <br>
    Well done!
    </p>
    <button onclick="replayGame()" id="restart">Click Here to Play Again!</button>
    </div>
    `
    modal.innerHTML = successModal
}

function replayGame(){
    timeInterval =  setInterval(gameTimer, 1000);
    resetGame();
    previousMoves = 0;
    seconds = 0;
    modal.style.display = "none";
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

// function to update moves number
function incrementMoves() {
    let previousMoves = parseInt(document.getElementById("moves").innerText);
    document.getElementById("moves").innerText = ++previousMoves;
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
function returnCards (){
    haltFlip = true; // haltFlip locks the rest of the cards while the second card is turning
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        haltFlip = false
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

