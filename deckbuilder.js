window.addEventListener('load', buildDeck);

function buildDeck() {

    const c = document.getElementById('container');
    loadDefaultSize();

    const n = 30 // number of cards in the deck
    const shuffledCards = shuffleCards(n);
    const shuffledCardMatches = shuffleCards(n);

    for (let i = 0; i < 30; i++) {

        const newCard = new Card(shuffledCards[i], shuffledCards[i], shuffledCardMatches[i]);
        cardDeck.push(newCard);
        c.appendChild(newCard);

    }


}

function shuffleCards(n) {

    if (n % 2 != 0) {
        console.error('Odd number of cards in deck');
        return;
    }
    const outValues = [];

    do {

        let c = getRandom(n);
        if (!outValues.includes(c)) {
            outValues.push(c);
        }

    } while (outValues.length < n)

    return outValues;

    function getRandom(maxVal) {
        return Math.floor(Math.random() * maxVal);
    }

}