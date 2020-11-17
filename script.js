/*
   


*/

import Deck from './deck.js'

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

const compCardSlot = document.querySelector('.card-computer')
const playerCardSlot = document.querySelector('.card-player')
const compDeckElem = document.querySelector('.deck-computer')
const playerDeckElem = document.querySelector('.deck-player')
const winText = document.querySelector('.text')

let playerDeck, compDeck, stop

playerDeckElem.addEventListener("click", () => {
    if (stop) {
        startGame()
    }
    else {
        nextCard()
    }
})

startGame()

function startGame() {

    const deck = new Deck()
    deck.shuffle()
    const midPoint = Math.ceil(deck.numberOfCards / 2)
    stop = false
    compDeck = new Deck(deck.cards.slice(0,2))
    playerDeck = new Deck(deck.cards.slice(midPoint, deck.numberOfCards))
    clearCard()
    updateDeckCount()


}

function clearCard() {
    compCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    winText.innerText = ""
}

function updateDeckCount() {
    compDeckElem.innerText = compDeck.numberOfCards
    playerDeckElem.innerText = playerDeck.numberOfCards
}

function nextCard() {
    clearCard()
    const playerCard = playerDeck.pop()
    const compCard = compDeck.pop()
    if (CARD_VALUE_MAP[playerCard.value] > CARD_VALUE_MAP[compCard.value]) {
        winText.innerText = 'Win'
        playerDeck.push(playerCard)
        playerDeck.push(compCard)
    }
    else if (CARD_VALUE_MAP[playerCard.value] == CARD_VALUE_MAP[compCard.value]) {
        winText.innerText = 'Tie'
        playerDeck.push(playerCard)
        compDeck.push(compCard)
    }
    else {
        winText.innerText = 'Lose'
        compDeck.push(playerCard)
        compDeck.push(compCard)
    }

    if (isGameOver(playerDeck)) {
        winText.innerText = "You Lose!"
        stop = true
    
    }
    else if (isGameOver(compDeck)) {
        winText.innerText = "You Win!"
        stop = true
    }
    playerCardSlot.appendChild(playerCard.getHTML())
    compCardSlot.appendChild(compCard.getHTML())
    updateDeckCount()
}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}