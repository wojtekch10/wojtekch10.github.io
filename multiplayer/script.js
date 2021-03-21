const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const winningMessageElement =  document.getElementById("winning-message");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn = false;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame();

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(CIRCLE_CLASS);
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, { once: true });
    });
    winningMessageTextElement.innerText = '';
    winningMessageElement.classList.remove('show');
    setBoardHoverClass();
}

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)){
       console.log('winer');
        endgame(false);
    }else if (checkDraw()){
         endgame(true);
    }else {
         swapTurns();
         setBoardHoverClass();
     }
}

function endgame(draw){
    if (draw){
        winningMessageTextElement.innerText = "Remis!";
    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O":"X"} wygrywa!`;
    }
    winningMessageElement.classList.add('show');
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function checkDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}