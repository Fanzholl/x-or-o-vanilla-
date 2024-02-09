"use strict";

const gameMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];


const trCollection = document.querySelectorAll(`tr`);
const table = document.querySelector(`tbody`);
const winner = document.querySelector(`h1`);

let steps = 1;
let winS = null;

let pcStep = new CustomEvent('pcstep', {
    bubbles: true,
})

table.addEventListener('click', matrixEdit);
table.addEventListener('pcstep', matrixEdit);

function matrixEdit (event) {
    if (event) {
        if (event.target.tagName == 'P' || event.target.children[0].textContent != '') return;
    }

    let step = null

    if (steps % 2 !== 0) {

        let row = Array.prototype.indexOf.call(trCollection, event.target.closest(`tr`));
        let rowElement = Array.prototype.indexOf.call(event.target.closest(`tr`).querySelectorAll(`td`), event.target);
        step = gameMatrix[row][rowElement] = steps % 2 === 0 ? target.children[0].textContent = 'O' : event.target.children[0].textContent = 'X';

    } else if (steps % 2 === 0) {
        let rowElement = null;
        const rowMath = Math.floor(Math.random() * 3);
        const rowElementMath = Math.floor(Math.random() * 3);
        pcBot(trCollection, gameMatrix);
        step = 'O';
    }

    ++steps;
    

    if (compareWin(gameMatrix, step) || steps >= 10) {
        winner.textContent = compareWin(gameMatrix, step) || `All loose`;
        table.removeEventListener('click', matrixEdit);
        return;
    }

    if (steps % 2 == 0) {
        matrixEdit();
    }

    
}


function compareWin(gameMatrix, step) {
    let win = null;
    if (win < 3) {
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                win += gameMatrix[i][j] == step;
            } if (win == 3) return `${step} is win!`; win = 0;
        }
    }

    win = null;

    if (win < 3) {
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                win += gameMatrix[j][i] == step;
            } if (win == 3) return `${step} is win!`; win = 0;
        }
    }

    win = null;

    if (win < 3) {
        for (let i = 0; i <= 2; i++) {
            win += gameMatrix[i][i] == step;
        }
    }

    if (win == 3) return `${step} is win!`;
    win = null;

    if (win < 3) {
        let d = 0;
        for (let i = 3 - 1; i >= 0; i--) {
            win += gameMatrix[d][i] == step; ++d;
        }
    }

    if (win == 3) return `${step} is win!`;

    return null;
}

function pcBot(trCollection, gameMatrix) {
    const rowMath = Math.floor(Math.random() * 3);
    const rowElementMath = Math.floor(Math.random() * 3);
    const row = trCollection[rowMath];
    const rowElement = row.children[rowElementMath];
    if (rowElement.children[0].textContent !== '') {
        pcBot(trCollection, gameMatrix)
    } else {
        gameMatrix[rowMath][rowElementMath] = rowElement.children[0].textContent = 'O';
    }
}