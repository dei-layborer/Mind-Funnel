window.addEventListener('load', buildDeck);

function buildDeck() {

    const c = document.getElementById('container');
    loadDefaultSize();

    const n = 15 // number of cards in the deck
    const shuffledCards = shuffleCards(n);

    // each item in shuffled cards is a two-element array consisting of the content of the card and its match

    for (let i = 0; i < n; i++) {

        const newCard = new Card(i, shuffledCards[i]);
        cardDeck.push(newCard);
        c.appendChild(newCard);

    }


}

function shuffleCards(n) {

    const cards = [];
    
    const dataEntries = Object.entries(frList);

    do {

        let c = getRandom(n);
        let itemAt = dataEntries[c];

        if (!cards.includes(itemAt)) {
            cards.push(itemAt);
        }

    } while (cards.length < n) 

    return cards;

    function getRandom(maxVal) {
        return Math.floor(Math.random() * maxVal);
    }

}