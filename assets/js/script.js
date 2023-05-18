// add event listener to call flipcard function when clicked
let cards = document.getElementsByClassName('card');
for (let card of cards) {
    card.addEventListener('click', flipCard);
}

// set first, second clicked card variables
let firstCard;
let secondCard;
let hasClicked = false;

// function to flip the card on click
function flipCard(event) {
    this.classList.add('flip');
    // check if the first or second card has been clicked
    if (!hasClicked) { // if hasClicked is false, this is the first card being clicked
        hasClicked = true;
        firstCard = this;
    } else { // has clicked is true, this is the second card being clicked
        hasClicked = false;
        secondCard = this;
        checkPair();
    }
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
    } else {
        // if they don't match, remove the flip class so the back face of the card is returned
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }, 900);
    }
}

// reset game function
function resetGame() {
    for (let card of cards) {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    }
    console.log("game reset!");
}

// set onclick attribute to call reset game function
let resetButton = document.getElementsByTagName('button')[0];
resetButton.setAttribute('onclick', 'resetGame();');