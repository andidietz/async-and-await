//Part 1a
async function getSingleFavNumFact() {
    const getNum12TriviaUrl = 'http://numbersapi.com/12/trivia?json'
    let res = await axios.get(getNum12TriviaUrl)
    console.log(res.data)
}

getSingleFavNumFact()

// Part 1b
function generateNumListHTML(list, res) {
    for (let i = 0; i < res.length; i++) {
        let newFact = document.createElement('li')
        newFact.innerText = res[i]
        list.append(newFact)
    }
}

async function getNumRangeFacts() {
    const getRangeOfTriviaUrl = 'http://numbersapi.com/1..12/trivia?json'
    const numfactsList = document.querySelector('#num-list-facts')

    let res = await axios.get(getRangeOfTriviaUrl)
    generateNumListHTML(numfactsList, Object.values(res.data))
}

getNumRangeFacts()

//Part 1c
function generateFavNumHTML(list, res) {
    for (let i = 0; i < res.length; i++) {
        let newFact = document.createElement('li')
        newFact.innerText = res[i].data
        list.append(newFact)
    }
}

async function getFavNumFactsList() {
    const getNum6TriviaUrl = 'http://numbersapi.com/6/trivia'
    const favfactsList = document.querySelector('#fav-num-facts')

    let numFacts = await Promise.all([
        axios.get(getNum6TriviaUrl),
        axios.get(getNum6TriviaUrl),
        axios.get(getNum6TriviaUrl),
        axios.get(getNum6TriviaUrl)
    ])
    generateFavNumHTML(favfactsList, numFacts)
}

getFavNumFactsList()

//Part 2a
async function shuffleAndDraw() {
    const shuffleAndDrawUrl = 'http://deckofcardsapi.com/api/deck/new/draw/?count=1'

    let res = await axios.get(shuffleAndDrawUrl)
    console.log(`Part 2A: ${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
}

shuffleAndDraw()

// Part 2b
let playersCards = []

function storeCardValueAndSuit(res) {
    playersCards.push(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
}

function displayCards(playersCards) {
    for (let i = 0; i < playersCards.length; i++) {
        console.log(playersCards[i])
    }    
}

async function getTwoCardsFromSameDeck() {
    const shuffleAndDrawUrl = 'http://deckofcardsapi.com/api/deck/new/draw/?count=1'

    let firstCardRes = await axios.get(shuffleAndDrawUrl)
    storeCardValueAndSuit(firstCardRes)
    let deckId = firstCardRes.data.deck_id

    let SecondCardRes = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    storeCardValueAndSuit(SecondCardRes)
    displayCards(playersCards)
}

getTwoCardsFromSameDeck()

//Part 3
const drawCardBtn = document.querySelector('#draw-card-btn')
let deckId

function generateCardHTML(res) {
    let cardDisplaySection = document.querySelector('#card-display-section')

    let newCard = document.createElement('img')
    newCard.setAttribute('src', res.data.cards[0].image)
    cardDisplaySection.append(newCard)
}

async function getDeck() {
    const getDeckUrl = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    let res = await axios.get(getDeckUrl)
    deckId = res.data.deck_id
}

async function getCardFromSameDec() {
    let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    generateCardHTML(res)
}

document.addEventListener('DOMContentLoaded', getDeck)
drawCardBtn.addEventListener('click', getCardFromSameDec)