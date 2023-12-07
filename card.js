class Card extends HTMLElement {


    #id;        // id of this card
    #isFlipped;
    #matchId;   // id of the card that goes with this one
    #matched;   // whether this card has been matched with another or not

    constructor(id, content) {
        super();

        this.#id = id;
        this.#isFlipped = false;
        //this.#matchId = linkedId;
        this.#matched = false;
        
        const shadow = this.attachShadow({ mode: 'open' });
        const internalStyles = document.createElement('style');
        const container = document.createElement('div');
        container.setAttribute('class', 'card-root');
        container.setAttribute('id', id);

        const cardBack = document.createElement('div');
        cardBack.setAttribute('class', 'card-back');
        const cardContent = document.createElement('div');
        cardContent.setAttribute('class', 'card-content');

        cardContent.textContent = content;

        internalStyles.textContent = `
            .card-root {
                display: inline-flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                height: var(--h);
                width: var(--w);
                color: palevioletred;
                border: 6px solid transparent;
                font-family: sans-serif;
                cursor: pointer;
                transform-origin: center;
                transform-style: preserve-3d;
            }

            .card-root.flipped .card-back {
                transform: rotateY(180deg);
            }

            .card-root.flipped .card-content {
                transform: rotateY(0deg);
            }

            .card-back {
                position: relative;
                z-index: 2;
                width: 100%;
                height: 100%;
                background-image: radial-gradient( circle farthest-corner at 0.2% 0.5%,  rgba(68,36,164,1) 3.7%, rgba(84,212,228,1) 92.7% );
                backface-visibility: hidden;
                border: 1px solid #ffafcc;
                transform-origin: center;
                transform-style: preserve-3d;
                transition: 0.6s;
            }

            .card-content {
                position: relative;
                top: -100%;
                z-index: 1;
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                background-color: #000;
                border: 1px solid #ffafcc;
                transform-origin: center;
                transform-style: preserve-3d;
                transform: rotateY(-180deg);
                transition: 0.6s;
            }
        `;

        this.setSize(cardSize.w, cardSize.h, container);
        container.appendChild(cardBack);
        container.appendChild(cardContent);

        shadow.appendChild(internalStyles);
        shadow.appendChild(container);

        this.addEventListener('pointerup', () => this.flip(this) );

        

    }

    flip(card) {

        card.shadowRoot.children[1].classList.toggle('flipped');
        card.isFlipped = !card.isFlipped;
        if (card.isFlipped) { matchSearch(card); }

    }

    // sets the card to given (w)idth, (h)eight.  Passed the internal (c)ontainer element to avoid weirdness with "this"
    setSize(w, h, c) {
        
        // half-assed validation
        if (!w || !h) {
            console.error('Missing or invalid dimension');
            return;
        }

        c.style.setProperty('--w', `${w}`);
        c.style.setProperty('--h', `${h}`);

    }

    isMatched() {
        this.shadowRoot.children[1].style.borderColor = '#ffafcc';
        this.#matched = true;
    }

    get id() {
        return this.#id;
    }

    get isFlipped() {
        return this.#isFlipped;
    }

    set isFlipped(val) {
        this.#isFlipped = val;
    }

    get matchId() {
        return this.#matchId;
    }

    get matched() {
        return this.#matched;
    }
}

customElements.define('memory-card', Card);

// takes two cards, and if (1) they match, and (2) are both flipped, returns true
function matchSearch(card) {

    const card1 = card;
    const card1match = card.matchId;

    const matchedCard = cardDeck.find( (matching) => matching.id == card1match);

    if (matchedCard.isFlipped) {
        console.log(`Found match!  Cards ${card1.id} and ${matchedCard.id}`);
        card1.isMatched();
        matchedCard.isMatched();
    }

}