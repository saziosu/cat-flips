// add flip class to clicked card
let cards = document.getElementsByClassName('card');
for (card of cards){
    card.addEventListener('click', function handleClick(event) {
        event.target.classList.add('flip');
        console.log("card clicked");
    });
}
