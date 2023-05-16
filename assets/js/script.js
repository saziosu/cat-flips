// add event listener to call flipcard function when clicked
let cards = document.getElementsByClassName('card');
for (card of cards){
    card.addEventListener('click', flipCard)
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
          console.log(firstCard, secondCard);
      }
}



// set onclick attribute to call reset game function
let resetButton = document.getElementsByTagName('button')[0];
resetButton.setAttribute('onclick', 'resetGame();');

// reset game function
function resetGame() {
    for (card of cards) {
    card.classList.remove('flip');
    }
    console.log("game reset!");
}
