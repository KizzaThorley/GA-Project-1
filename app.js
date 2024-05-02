import wordList from './data.js'


/*-------------------------------- Constants --------------------------------*/
// wordList.randomWord 

const letter = 'abcdefghijklmnopqrstuvwxyz'
// could make this an array with idividuals


/*---------------------------- Variables (state) ----------------------------*/
let currentWordle = ''
let currentWordleArray = ['', '', '', '', '']

let playersGuess = ''
let playersGuessArray = []
let playersGuessCharacters1 = []
let playersGuessCharacters2 = []
let playersGuessCharacters3 = []
let playersGuessCharacters4 = []
let playersGuessCharacters5 = []
let playersGuessCharacters6 = []

let pastPlayerGuesses = ['', '', '', '', '', '']

let winner = false
let lost = false
/*------------------------ Cached Element References ------------------------*/
const guessInput = document.querySelector('#players-guess')

const guessCharactureDivs = document.querySelectorAll('.guess-sqr')

const checkGuessBtn = document.querySelector('#guess')

const restartBtn = document.querySelector('#restart')

const onScreenKeyboard = document.querySelectorAll('.key-sqr')

const resultsDisplay = document.querySelector('#results')
/*-------------------------------- Functions --------------------------------*/
function randomNum() {
    const randomIdx = Math.floor(Math.random() * wordList.randomWord.length)
    return randomIdx
}

function randomWord() {
    currentWordle = wordList.randomWord[randomNum()]
}

function checkWinner(event) {
if (currentWordle === guessInput.value) {
    winner = true
} else if (playersGuessArray.includes('')) {
    winner = false
} else {
    lost = true
}
}

const storeGuess = (event) => {
    playersGuess = guessInput.value
    if (playersGuessArray.length < 6 && playersGuess.length === 5) {
    playersGuessArray.push(`${playersGuess}`) 
} else {
    return
}
    // console.log(playersGuessArray);
    // console.log(playersGuess.length);
}

function playersGuessIntoChar() { 
    if (playersGuessArray.length === 1)  {
        playersGuessCharacters1 = playersGuessArray[playersGuessArray.length - 1].split('') 
        
        } else if (playersGuessArray.length === 2) {
            playersGuessCharacters2 = playersGuessArray[playersGuessArray.length - 1].split('') 
       
        } else if (playersGuessArray.length === 3) {
            playersGuessCharacters3 = playersGuessArray[playersGuessArray.length - 1].split('') 
       
        } else if (playersGuessArray.length === 4) {
            playersGuessCharacters4 = playersGuessArray[playersGuessArray.length - 1].split('') 
       
        } else if (playersGuessArray.length === 5) {
            playersGuessCharacters5 = playersGuessArray[playersGuessArray.length - 1].split('') 
       
        } else if (playersGuessArray.length === 6) {
            playersGuessCharacters6 = playersGuessArray[playersGuessArray.length - 1].split('') 
            console.log(playersGuessCharacters1);
        }
    }



function playGame() {
storeGuess()
playersGuessIntoChar()
}
function sayhello() {
    console.log(playersGuess);
}
/*----------------------------- Event Listeners -----------------------------*/


restartBtn.addEventListener('click', sayhello)


checkGuessBtn.addEventListener('click', playGame)
// console.log(playersGuess);