async function populateDeck() {
    const response = await fetch('deckOfMany.json')
    const deckData = await response.json();

    const deck = document.getElementById("deck");
    const template = document.getElementById("card-template");


    deckData.forEach(card => {
        const cardElement = template.content.cloneNode(true);
        const frontImg = cardElement.querySelector('.card-image');
        frontImg.src = card.imageSrc;
        frontImg.alt = card.name;

        const container = cardElement.querySelector('.card');

        const typeClass = card.type.toLowerCase(); // e.g., "positive"
        container.classList.add(typeClass); // add type-specific style
        container.classList.add("card");

        cardElement.querySelector('.card-name').textContent = card.name;
        cardElement.querySelector('.card-effect').textContent = card.effect;
        cardElement.querySelector('.card-symbol').textContent = `Symbol: ${card.symbol}`;
        cardElement.querySelector('.card-type').textContent = `Type: ${card.type}`;
        deck.appendChild(cardElement);
    });
}

populateDeck();