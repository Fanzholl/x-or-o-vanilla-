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

table.addEventListener('click', matrixEdit);

function matrixEdit (event) {
    const target = event.target;

    if (event.target.tagName == 'P' || event.target.children[0].textContent != '') return;

    const row = Array.prototype.indexOf.call(trCollection, target.closest(`tr`));
    const rowElement = Array.prototype.indexOf.call(target.closest(`tr`).querySelectorAll(`td`), target);

    const step = gameMatrix[row][rowElement] = steps % 2 === 0 ? target.children[0].textContent = 'O' : target.children[0].textContent = 'X';

    ++steps;

    if (compareWin(gameMatrix, step) || steps >= 10) {
        winner.textContent = compareWin(gameMatrix, step) || `All loose`;
        table.removeEventListener('click', matrixEdit);
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
        for (i = 3 - 1; i >= 0; i--) {
            win += gameMatrix[d][i] == step; ++d;
        }
    }

    if (win == 3) return `${step} is win!`;

    return null;
}
