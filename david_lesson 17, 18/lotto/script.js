let usedNumbers = document.querySelector(".usedNumbers");
let ticket = document.getElementById("tableLotto");
let currentNumber = document.getElementById("current-number");
let fieldElements = document.getElementsByClassName("field-with-number");
let interval;
let isPaused = false;
let gameStarted = false;


function fillTable() {
    usedNumbers.innerHTML = '';
    currentNumber.innerHTML = '';
    ticket.innerHTML = '';

    let matrix = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
        [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
        [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
        [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
        [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]
    ];

    let columnCount = 9;
    let rowCount = 3;
    let rowNumbersCount = 5;

    for (let i = 0; i < rowCount; i++) {
        let row = document.createElement('tr');

        let emptyFields = Array(columnCount - rowNumbersCount).fill(null);
        let numberFields = Array(rowNumbersCount).fill(0);

        let fields = emptyFields.concat(numberFields).sort(() => Math.random() - 0.5);

        for (let j = 0; j < columnCount; j++) {
            let field = document.createElement('td');
            if (fields[j] === null) {
                field.textContent = '';
                field.classList.add('field', 'empty-field');
            } else {
                let columnIndex = j % matrix.length;
                let availableNumbers = matrix[columnIndex];
                let randomIndex = Math.floor(Math.random() * availableNumbers.length);
                let randomNumber = availableNumbers.splice(randomIndex, 1)[0];
                field.textContent = randomNumber;
                field.classList.add('field', 'field-with-number');
            }
            row.appendChild(field);
        }
        ticket.appendChild(row);
    }

    gameStarted = false;
}

function startGame() {
    if (!gameStarted) {
        let numbers = [];
        let allNumbers = [];

        for (let i = 0; i < fieldElements.length; i++) {
            numbers.push(fieldElements[i].innerText);
        }

        for (let i = 1; i <= 90; i++) {
            allNumbers.push(i);
        }

        interval = setInterval(() => {
            if (!isPaused) {
                if (allNumbers.length === 0) {
                    ticket.innerText = 'You Win';

                    Array.from(fieldElements).forEach(element => {
                        element.style.opacity = '0';
                    });

                    clearInterval(interval);
                    return;
                }

                let randomNumberIndex = Math.floor(Math.random() * allNumbers.length);
                let randomNumber = allNumbers[randomNumberIndex];

                allNumbers.splice(randomNumberIndex, 1);

                currentNumber.innerText = randomNumber;

                Array.from(fieldElements).forEach(element => {
                    if (element.innerText === randomNumber + '') {
                        element.style.opacity = '0.5';
                    }
                });

                let transparentCount = Array.from(fieldElements).reduce((count, element) => {
                    if (element.style.opacity === '0.5') {
                        return count + 1;
                    }
                    return count;
                }, 0);

                if (transparentCount === fieldElements.length) {
                    ticket.innerText = 'You Win';

                    Array.from(fieldElements).forEach(element => {
                        element.style.opacity = '0';
                    });

                    clearInterval(interval);
                }

                usedNumbers.innerHTML += `<div class="used-numbers">${randomNumber}</div>`;
            }
        }, 500);

        gameStarted = true;
    }
}


function pauseGame() {
    isPaused = !isPaused;
  
    if (isPaused) {
        clearInterval(interval);
    } else {
        if (gameStarted) {
            startGame();
        }  
    }
}

function refreshGame() {
    fillTable();
    clearInterval(interval);
    isPaused = false;
} 

