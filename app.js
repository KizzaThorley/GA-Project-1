import wordList from './data.js'


/*-------------------------------- Constants --------------------------------*/
// wordList.randomWord 

const letter = 'abcdefghijklmnopqrstuvwxyz'
// could make this an array with idividuals


/*---------------------------- Variables (state) ----------------------------*/
let currentWordle = ''
let currentWordleArray = []

let playersGuess = ''
let playersGuessArray = []
let playersGuessCharactersFirst = []
let playersGuessCharactersSecond = []
let playersGuessCharactersThird = []
let playersGuessCharactersFourth = []
let playersGuessCharactersFifth = []
let playersGuessCharactersSixth = []

let pastPlayerGuessesCharArray = []

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
    currentWordle = wordList.randomWord[randomNum()];
    currentWordleArray = currentWordle.split('') 
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
    if (playersGuessArray.length === 1) 
    {
        playersGuessCharactersFirst = playersGuessArray[playersGuessArray.length - 1].split('') 
        guessCharactureDivs[0].innerText = playersGuessCharactersFirst[0]
        guessCharactureDivs[1].innerText = playersGuessCharactersFirst[1]
        guessCharactureDivs[2].innerText = playersGuessCharactersFirst[2]
        guessCharactureDivs[3].innerText = playersGuessCharactersFirst[3]
        guessCharactureDivs[4].innerText = playersGuessCharactersFirst[4]
        } else if (playersGuessArray.length === 2) 
        {
            playersGuessCharactersSecond = playersGuessArray[playersGuessArray.length - 1].split('') 
            guessCharactureDivs[5].innerText = playersGuessCharactersSecond[0]
            guessCharactureDivs[6].innerText = playersGuessCharactersSecond[1]
            guessCharactureDivs[7].innerText = playersGuessCharactersSecond[2]
            guessCharactureDivs[8].innerText = playersGuessCharactersSecond[3]
            guessCharactureDivs[9].innerText = playersGuessCharactersSecond[4]
          
        } else if (playersGuessArray.length === 3) 
        {
            playersGuessCharactersThird = playersGuessArray[playersGuessArray.length - 1].split('') 
            guessCharactureDivs[10].innerText = playersGuessCharactersThird[0]
            guessCharactureDivs[11].innerText = playersGuessCharactersThird[1]
            guessCharactureDivs[12].innerText = playersGuessCharactersThird[2]
            guessCharactureDivs[13].innerText = playersGuessCharactersThird[3]
            guessCharactureDivs[14].innerText = playersGuessCharactersThird[4]
          
        } else if (playersGuessArray.length === 4) 
        {
            playersGuessCharactersFourth = playersGuessArray[playersGuessArray.length - 1].split('')
            guessCharactureDivs[15].innerText = playersGuessCharactersFourth[0]
            guessCharactureDivs[16].innerText = playersGuessCharactersFourth[1]
            guessCharactureDivs[17].innerText = playersGuessCharactersFourth[2]
            guessCharactureDivs[18].innerText = playersGuessCharactersFourth[3]
            guessCharactureDivs[19].innerText = playersGuessCharactersFourth[4] 
           
        } else if (playersGuessArray.length === 5) 
        {
            playersGuessCharactersFifth = playersGuessArray[playersGuessArray.length - 1].split('') 
            guessCharactureDivs[20].innerText = playersGuessCharactersFifth[0]
            guessCharactureDivs[21].innerText = playersGuessCharactersFifth[1]
            guessCharactureDivs[22].innerText = playersGuessCharactersFifth[2]
            guessCharactureDivs[23].innerText = playersGuessCharactersFifth[3]
            guessCharactureDivs[24].innerText = playersGuessCharactersFifth[4]
           
        } else if (playersGuessArray.length === 6) 
        {
            playersGuessCharactersSixth = playersGuessArray[playersGuessArray.length - 1].split('') 
            guessCharactureDivs[25].innerText = playersGuessCharactersSixth[0]
            guessCharactureDivs[26].innerText = playersGuessCharactersSixth[1]
            guessCharactureDivs[27].innerText = playersGuessCharactersSixth[2]
            guessCharactureDivs[28].innerText = playersGuessCharactersSixth[3]
            guessCharactureDivs[29].innerText = playersGuessCharactersSixth[4]
            
        }
    }

  
    

function playGame() {
storeGuess()
playersGuessIntoChar()
}
function sayhello() {
    randomWord()
    console.log(currentWordleArray);
}
/*----------------------------- Event Listeners -----------------------------*/


restartBtn.addEventListener('click', sayhello)


checkGuessBtn.addEventListener('click', playGame)
// console.log(playersGuess);