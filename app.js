import wordList from './data.js'


/*-------------------------------- Constants --------------------------------*/
// wordList.randomWord 

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
// could make this an array with idividuals


/*---------------------------- Variables (state) ----------------------------*/
let currentWordle = ''
let currentWordleArray = []

let playersGuess = ''
let playersGuessArray = []
let currentGuessSqrIdx = 0
let currentWordleGuessIdx = 0
let playersGuessObjectArray = [
    [],
    [],
    [],
    [],
    [],
    [],
]

let matchedCharacturesInGuesses = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]
let matchedCharactures = []
let notMatchedCharactures = []


let numberOfWins = 0

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
function randomWord() {
    const randomIdx = Math.floor(Math.random() * wordList.randomWord.length)
    return currentWordle = wordList.randomWord[randomIdx];
}


const storeGuess = (event) => {
    playersGuess = guessInput.value
    if (wordList.randomWord.includes(playersGuess.toLocaleLowerCase()) === false) {
        return
        //  resultsDisplay.innerText = `Sorry that is not in the word list`
        // line isnt working yet 
    }
    else if (playersGuessArray.length <= 5 && playersGuess.length === 5) {
        playersGuessArray.push(`${playersGuess}`)
    } else if (playersGuessArray.length === 6) {
        return
    }
    // console.log(playersGuessArray);
    // console.log(playersGuess.length);
}



function displayPlayersGuessInChars() {
    currentWordleGuessIdx = playersGuessArray.length - 1
    currentGuessSqrIdx = (playersGuessArray.length - 1) * 5
    playersGuessObjectArray.splice(currentWordleGuessIdx, 1, playersGuessArray[currentWordleGuessIdx].toUpperCase().split(''))
    guessCharactureDivs[currentGuessSqrIdx].innerText =
        playersGuessObjectArray[currentWordleGuessIdx][0]
    guessCharactureDivs[currentGuessSqrIdx + 1].innerText =
        playersGuessObjectArray[currentWordleGuessIdx][1]
    guessCharactureDivs[currentGuessSqrIdx + 2].innerText =
        playersGuessObjectArray[currentWordleGuessIdx][2]
    guessCharactureDivs[currentGuessSqrIdx + 3].innerText =
        playersGuessObjectArray[currentWordleGuessIdx][3]
    guessCharactureDivs[currentGuessSqrIdx + 4].innerText =
        playersGuessObjectArray[currentWordleGuessIdx][4]

}


function checkCharsMatch([char1, char2, char3, char4, char5]) {
    console.log(playersGuessObjectArray[currentWordleGuessIdx]);
    playersGuessObjectArray[currentWordleGuessIdx].forEach((letter, idx) => {
        const lowerLetter = letter.toLowerCase()
        if (char1 === lowerLetter || char2 === lowerLetter || char3 === lowerLetter || char4 === lowerLetter || char5 === lowerLetter) 
        {
            matchedCharactures.push(lowerLetter)
            matchedCharacturesInGuesses[currentWordleGuessIdx].splice(currentWordleGuessIdx, letter.length, lowerLetter)
        } else if (char1 !== lowerLetter || char2 !== lowerLetter || char3 !== lowerLetter || char4 !== lowerLetter || char5 !== lowerLetter) 
        {
            notMatchedCharactures.push(lowerLetter)
        }
    })
    // console.log(`${matchedCharactures} is matched`);
    console.log(matchedCharacturesInGuesses);
    // console.log(`not matched = ${notMatchedCharactures}`);
}


function changeColorOfGuesedCharactures() {
    
matchedCharactures.forEach((letter) => {
 document.getElementById(`${letter}`).classList.add('in-word')
})
notMatchedCharactures.forEach((letter) => {
    document.getElementById(`${letter}`).classList.add('not-in-word')
    
   })
}

function resetGuessColors() {
    onScreenKeyboard.forEach((letterOnKeyboard) => {
letterOnKeyboard.classList.remove('in-word')
letterOnKeyboard.classList.remove('not-in-word')
    }
)
}


function checkWinner(event) {
    if (currentWordle.toUpperCase() === playersGuess.toUpperCase()) {
        winner = true
    } else if (playersGuessArray.length === 6 &&
        currentWordle.toUpperCase() !== playersGuess.toUpperCase()) {
        return lost = true

    } else if (currentWordle.toUpperCase() !== playersGuess.toUpperCase()) {
        winner = false
        console.log(currentWordle);
    }
}
// }

function displayWinOrLose() {
    if (winner === true) {
        resultsDisplay.innerText = `Congrats You Guessed the Word: ${currentWordle.toLocaleUpperCase()}`
    } else if (lost === true) {
        resultsDisplay.innerText = `Unlucky the word was: ${currentWordle.toLocaleUpperCase()}`
    } else if (lost === false && winner === false) {
        resultsDisplay.innerText = `Keep Guessing`
    }
}

function playGame() {
    if (currentWordle === '') {
        randomWord()
    } else if (winner === true) {
        return
    } else if (lost === true) {
        return
    } else
        if (currentWordle !== '') {
            storeGuess()
            displayPlayersGuessInChars()
            currentWordleArray = currentWordle.split("")
            checkCharsMatch(currentWordleArray)
            changeColorOfGuesedCharactures()
            checkWinner()
            displayWinOrLose()
            guessInput.value = ''
        }
}
function restartGame() {
    winner = false
    lost = false
    matchedCharactures = []
    notMatchedCharactures = []
    resetGuessColors()
    resultsDisplay.innerText = `Take Your First Guess`
    guessCharactureDivs.forEach((box) => {
        box.innerText = ''
    })
    playersGuessArray = []
    randomWord()
    // console.log(currentWordle);
}



/*----------------------------- Event Listeners -----------------------------*/

// currentWordleArray = currentWordle.split('') 

restartBtn.addEventListener('click', restartGame)


checkGuessBtn.addEventListener('click', playGame)


onScreenKeyboard.forEach((letterKey) => {
    letterKey.addEventListener('click', (event) => {
        let clickedLetter = event.target.id
        if (event.target.id === 'del') {
            guessInput.value = guessInput.value.replace(/.$/, '')
        } else {
            guessInput.value += clickedLetter
        }
    })
})


guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        playGame()

    }
})


