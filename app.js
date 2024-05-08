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
    [''],
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


let points = 0

let winner = false
let lost = false
/*------------------------ Cached Element References ------------------------*/
const guessInput = document.querySelector('#players-guess')

const guessCharactureDivs = document.querySelectorAll('.guess-sqr')

const checkGuessBtn = document.querySelector('#guess')

const restartBtn = document.querySelector('#restart')

const onScreenKeyboard = document.querySelectorAll('.key-sqr')

const resultsDisplay = document.querySelector('#results')

const pointsTally = document.querySelector('.points-tally')

const pointsDisplay = document.querySelector('.points-display')

const rulesTitle = document.querySelector('.rules-title')

/*-------------------------------- Functions --------------------------------*/
function randomWord() {
    const randomIdx = Math.floor(Math.random() * wordList.randomWord.length)
    return currentWordle = wordList.randomWord[randomIdx];
}


const storeGuess = (event) => {
    playersGuess = guessInput.value
    if (playersGuess.length >= 6 || playersGuess <= 4) {
        return
    }
    else if (wordList.randomWord.includes(playersGuess.toLowerCase()) === false) {
        return
    }
    else if (playersGuessArray.length <= 5 && playersGuess.length === 5) {
        playersGuessArray.push(`${playersGuess}`)
    }
    else if (playersGuessArray.length >= 6) {
        return
    }
}


function displayPlayersGuessInChars() {
    currentWordleGuessIdx = playersGuessArray.length - 1
    currentGuessSqrIdx = (playersGuessArray.length - 1) * 5
    if (playersGuessArray.length === 0) {
        return
    } else {
        playersGuessObjectArray.splice(currentWordleGuessIdx, 1, playersGuessArray[currentWordleGuessIdx].split(''))
        for (let currentIdx = 0; currentIdx <= 4; currentIdx++) {
            guessCharactureDivs[currentGuessSqrIdx + currentIdx].innerText =
                playersGuessObjectArray[currentWordleGuessIdx][currentIdx].toUpperCase()
        }
    }
}

function checkCharsMatch([char1, char2, char3, char4, char5]) {
    if (playersGuessArray.length === 0) {
        return
    } else {
        playersGuessObjectArray[currentWordleGuessIdx].forEach((letter, idx) => {
            const lowerLetter = letter.toLowerCase()
            if (char1 === lowerLetter || char2 === lowerLetter || char3 === lowerLetter || char4 === lowerLetter || char5 === lowerLetter) {
                matchedCharactures.push(lowerLetter)
                matchedCharacturesInGuesses[currentWordleGuessIdx].splice(idx, 1, lowerLetter)

            } else if (char1 !== lowerLetter || char2 !== lowerLetter || char3 !== lowerLetter || char4 !== lowerLetter || char5 !== lowerLetter) {
                notMatchedCharactures.push(lowerLetter)
            }
        })
    }
}


function rightSpotWrongSpot() {
    if (playersGuessArray.length === 0) {
        return
    } else {
        for (let currentIdx = 0; currentIdx <= 4; currentIdx++) {

            if (matchedCharacturesInGuesses[currentWordleGuessIdx][currentIdx] === currentWordleArray[currentIdx]) {
                guessCharactureDivs[currentIdx + currentGuessSqrIdx].classList.add('in-word')
            }
            else if (matchedCharacturesInGuesses[currentWordleGuessIdx][currentIdx] !== currentWordleArray[currentIdx] && matchedCharacturesInGuesses[currentWordleGuessIdx][currentIdx] !== '') {
                guessCharactureDivs[currentIdx + currentGuessSqrIdx].classList.add('in-wrong-spot')
            }

        }
    }
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
    guessCharactureDivs.forEach((guessSqr) => {
        guessSqr.classList.remove('in-word')
        guessSqr.classList.remove('in-wrong-spot')
    })
}


function checkWinner(event) {
    if (currentWordle.toUpperCase() === playersGuess.toUpperCase()) {
        winner = true
        points = points + 1
        pointsTally.innerText = points
    } else if (playersGuessArray.length === 6 &&
        currentWordle.toUpperCase() !== playersGuess.toUpperCase()) {
        return lost = true

    } else if (currentWordle.toUpperCase() !== playersGuess.toUpperCase()) {
        winner = false
        console.log(currentWordle);
    }
}


function displayWinOrLose() {

    if (winner === true) {
        resultsDisplay.innerText = `Congrats You Guessed the Word: ${currentWordle.toLocaleUpperCase()}`
    } else if (lost === true) {
        resultsDisplay.innerText = `Unlucky the word was: ${currentWordle.toLocaleUpperCase()}`
    } else if (guessInput.value.length >= 6 || guessInput.value.length <= 4) {
        resultsDisplay.innerText = `It has to be 5 letters`
    } else if (wordList.randomWord.includes(guessInput.value.toLowerCase()) === false) {
        resultsDisplay.innerText = `Sorry that words not on our List`
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
            rightSpotWrongSpot()
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
    matchedCharacturesInGuesses = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ]
    resetGuessColors()
    resultsDisplay.innerText = `Take Your First Guess`
    guessCharactureDivs.forEach((box) => {
        box.innerText = ''
    })
    playersGuessArray = []
    randomWord()
    // console.log(currentWordle);
}


function pointsButtonsDropdown() {
    const pointsResetButton = document.querySelector('.points-button')
    if (pointsResetButton.classList.contains('hidden')) {
        pointsResetButton.classList.remove('hidden')
        pointsResetButton.addEventListener('click', resetPoints)
    } else {
        pointsResetButton.classList.add('hidden')
    }
}
function resetPoints() {
    points = 0
    pointsTally.innerText = points
}

function rulesDropdown() {
    const rulesList = document.querySelectorAll('.all-rules')
    rulesList.forEach((rule) => {
        if (rule.classList.contains('hidden')) {
            rule.classList.remove('hidden')
        } else {
            rule.classList.add('hidden')
        }
    })
}

/*----------------------------- Event Listeners -----------------------------*/

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


pointsDisplay.addEventListener('click', pointsButtonsDropdown)



rulesTitle.addEventListener('click', rulesDropdown)


// ease in 
// ease out
