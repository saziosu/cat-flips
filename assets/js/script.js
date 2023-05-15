// add flip class to clicked card
let cards = document.getElementsByClassName('card');
for (card of cards){
    card.addEventListener('click', function handleClick(event) {
        event.target.classList.add('flip');
        console.log("card clicked");
    });
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