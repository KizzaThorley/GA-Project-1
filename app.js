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

let pastPlayerGuessesCharArray = []

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


// let playersGuessCharactersFirst = []
// let playersGuessCharactersSecond = []
// let playersGuessCharactersThird = []
// let playersGuessCharactersFourth = []
// let playersGuessCharactersFifth = []
// let playersGuessCharactersSixth = []
// function playersGuessIntoChar() {
//     if (playersGuessArray.length === 1) {
//         playersGuessCharactersFirst = playersGuessArray[playersGuessArray.length - 1].split('')
//         guessCharactureDivs[0].innerText = playersGuessCharactersFirst[0].toUpperCase()
//         guessCharactureDivs[1].innerText = playersGuessCharactersFirst[1].toUpperCase()
//         guessCharactureDivs[2].innerText = playersGuessCharactersFirst[2].toUpperCase()
//         guessCharactureDivs[3].innerText = playersGuessCharactersFirst[3].toUpperCase()
//         guessCharactureDivs[4].innerText = playersGuessCharactersFirst[4].toUpperCase()
//     } else if (playersGuessArray.length === 2) {
//         playersGuessCharactersSecond = playersGuessArray[playersGuessArray.length - 1].split('')
//         guessCharactureDivs[5].innerText = playersGuessCharactersSecond[0].toUpperCase()
//         guessCharactureDivs[6].innerText = playersGuessCharactersSecond[1].toUpperCase()
//         guessCharactureDivs[7].innerText = playersGuessCharactersSecond[2].toUpperCase()
//         guessCharactureDivs[8].innerText = playersGuessCharactersSecond[3].toUpperCase()
//         guessCharactureDivs[9].innerText = playersGuessCharactersSecond[4].toUpperCase()

//     } else if (playersGuessArray.length === 3) {
//         playersGuessCharactersThird = playersGuessArray[playersGuessArray.length - 1].split('')
//         guessCharactureDivs[10].innerText = playersGuessCharactersThird[0].toUpperCase()
//         guessCharactureDivs[11].innerText = playersGuessCharactersThird[1].toUpperCase()
//         guessCharactureDivs[12].innerText = playersGuessCharactersThird[2].toUpperCase()
//         guessCharactureDivs[13].innerText = playersGuessCharactersThird[3].toUpperCase()
//         guessCharactureDivs[14].innerText = playersGuessCharactersThird[4].toUpperCase()

//     } else if (playersGuessArray.length === 4) {
//         playersGuessCharactersFourth = playersGuessArray[playersGuessArray.length - 1].split('')
//         guessCharactureDivs[15].innerText = playersGuessCharactersFourth[0].toUpperCase()
//         guessCharactureDivs[16].innerText = playersGuessCharactersFourth[1].toUpperCase()
//         guessCharactureDivs[17].innerText = playersGuessCharactersFourth[2].toUpperCase()
//         guessCharactureDivs[18].innerText = playersGuessCharactersFourth[3].toUpperCase()
//         guessCharactureDivs[19].innerText = playersGuessCharactersFourth[4].toUpperCase()

//     } else if (playersGuessArray.length === 5) {
//         playersGuessCharactersFifth = playersGuessArray[playersGuessArray.length - 1].split('')
//         guessCharactureDivs[20].innerText = playersGuessCharactersFifth[0].toUpperCase()
//         guessCharactureDivs[21].innerText = playersGuessCharactersFifth[1].toUpperCase()
//         guessCharactureDivs[22].innerText = playersGuessCharactersFifth[2].toUpperCase()
//         guessCharactureDivs[23].innerText = playersGuessCharactersFifth[3].toUpperCase()
//         guessCharactureDivs[24].innerText = playersGuessCharactersFifth[4].toUpperCase()

//     } else if (playersGuessArray.length === 6) {
//         playersGuessCharactersSixth = playersGuessArray[playersGuessArray.length - 1].split('')
//         guessCharactureDivs[25].innerText = playersGuessCharactersSixth[0].toUpperCase()
//         guessCharactureDivs[26].innerText = playersGuessCharactersSixth[1].toUpperCase()
//         guessCharactureDivs[27].innerText = playersGuessCharactersSixth[2].toUpperCase()
//         guessCharactureDivs[28].innerText = playersGuessCharactersSixth[3].toUpperCase()
//         guessCharactureDivs[29].innerText = playersGuessCharactersSixth[4].toUpperCase()

//     }
// }
    

function displayPlayersGuessInChars() {
    currentWordleGuessIdx = playersGuessArray.length - 1
    currentGuessSqrIdx = (playersGuessArray.length -1) * 5
    playersGuessObjectArray.splice(currentWordleGuessIdx, 1, playersGuessArray[currentWordleGuessIdx].toUpperCase().split(''))
    guessCharactureDivs[currentGuessSqrIdx].innerText = 
    playersGuessObjectArray[currentWordleGuessIdx][0]
    guessCharactureDivs[currentGuessSqrIdx + 1].innerText =
    playersGuessObjectArray[currentWordleGuessIdx][1]
    guessCharactureDivs[currentGuessSqrIdx+ 2].innerText = 
    playersGuessObjectArray[currentWordleGuessIdx][2]
    guessCharactureDivs[currentGuessSqrIdx + 3].innerText = 
    playersGuessObjectArray[currentWordleGuessIdx][3]
    guessCharactureDivs[currentGuessSqrIdx + 4].innerText = 
    playersGuessObjectArray[currentWordleGuessIdx][4]

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
            // playersGuessIntoChar()
            currentWordleArray = currentWordle.split("")
            checkChars(currentWordleArray)
            checkWinner()
            displayWinOrLose()
            guessInput.value = ''
        }
}
function restartGame() {
    winner = false
    lost = false
    resultsDisplay.innerText = `Keep Guessing`
    guessCharactureDivs.forEach((box) => {
        box.innerText = ''
    })
    playersGuessArray = []
    randomWord()
    // console.log(currentWordle);
}

let testLetters = []

// function checkChars() {
//     currentWordleArray = currentWordle.split("")
//     currentWordle.forEach((wordleLetters) => {

//         playersGuessCharactersFirst.forEach((letters) => {
//             if (letters === wordleLetters) {
//   testLetters = letters
//   console.log(testLetters);
//             }
//          })

//     })
// function checkChars([char1, char2, char3, char4, char5]) {
//     if (playersGuessArray.length === 1) {
//     playersGuessCharactersFirst.forEach((letter) => {
// if (char1 === letter || char2 === letter || char3=== letter || char4 === letter || char5 === letter)
//    return testLetters.push(letter)
//     })
//     console.log(testLetters);
// }  
// }




function checkChars([char1, char2, char3, char4, char5]) {
    if (playersGuessArray.length === 1) {
        playersGuessCharactersFirst.forEach((letter) => {
            if (char1 === letter || char2 === letter || char3=== letter
                 || char4 === letter || char5 === letter)
               testLetters.push(letter)
        
                } ) 
    } else if (playersGuessArray.length === 2) {
        playersGuessCharactersSecond.forEach((letter) => {
            if (char1 === letter || char2 === letter || char3=== letter
                || char4 === letter || char5 === letter)
               return testLetters.push(letter)
               console.log(testLetters);
                })
    } else if (playersGuessArray.length === 3) {
        playersGuessCharactersThird.forEach((letter) => {
            if (char1 === letter || char2 === letter || char3=== letter 
                || char4 === letter || char5 === letter)
               return testLetters.push(letter)
               console.log(testLetters);
                })
    } else if (playersGuessArray.length === 4) {
        playersGuessCharactersFourth.forEach((letter) => {
            if (char1 === letter || char2 === letter || char3=== letter 
                || char4 === letter || char5 === letter)
               return testLetters.push(letter)
               console.log(testLetters);
                })
    } else if (playersGuessArray.length === 5) {
        playersGuessCharactersFifth.forEach((letter) => {
            if (char1 === letter || char2 === letter || char3=== letter
                 || char4 === letter || char5 === letter)
               return testLetters.push(letter)
               console.log(testLetters);
                })
    } else if (playersGuessArray.length === 6) {
        playersGuessCharactersSixth.forEach((letter) => {
            if (char1 === letter || char2 === letter || char3=== letter 
                || char4 === letter || char5 === letter)
               return testLetters.push(letter)
               console.log(testLetters);
                })
}
}


    // join()
// }


function keyboard() {

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


function hello() {
    console.log(hello);
}

guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        playGame()

    }
})


