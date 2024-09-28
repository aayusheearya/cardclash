const cards = [
    '🍎', '🍎', '🍌', '🍌', '🍒', '🍒',
    '🍇', '🍇', '🍉', '🍉', '🍍', '🍍',
    '🍓', '🍓', '🍊', '🍊'
];

let shuffledCards = [];
let selectedCards = [];
let matchedCards = [];
let moveCount = 0;

const gameBoard = document.getElementById('game-board');
const moveCountDisplay = document.getElementById('move-count');
const restartButton = document.getElementById('restart-button');

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create card elements
function createCards() {
    shuffledCards = shuffle(cards);
    gameBoard.innerHTML = '';
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', () => handleCardClick(cardElement, card));
        gameBoard.appendChild(cardElement);
    });
}

// Handle card click
function handleCardClick(cardElement, card) {
    if (selectedCards.length < 2 && !cardElement.classList.contains('matched')) {
        cardElement.innerText = card;
        selectedCards.push(cardElement);
        if (selectedCards.length === 2) {
            moveCount++;
            moveCountDisplay.innerText = moveCount;
            setTimeout(checkForMatch, 1000);
        }
    }
}

// Check for match
function checkForMatch() {
    const [firstCard, secondCard] = selectedCards;
    if (firstCard.innerText === secondCard.innerText) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard.innerText);
    } else {
        firstCard.innerText = '';
        secondCard.innerText = '';
    }
    selectedCards = [];
}

// Restart the game
restartButton.addEventListener('click', () => {
    matchedCards = [];
    moveCount = 0;
    moveCountDisplay.innerText = moveCount;
    createCards();
});

// Initialize the game
createCards();
