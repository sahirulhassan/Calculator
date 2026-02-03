const numbers = [];
let operator = '';
const display = document.querySelector(".display");
let displayMode = 'input';
let lastOperator = '='

document
.querySelector(".button-grid")
.addEventListener("click", (event) => delegator(event.target));

function handleNumber(number) {
    if (displayMode === 'answer') {
        numbers.push(Number.parseInt(display.textContent));
        display.textContent = '';
        displayMode = 'input';
    }
    if (display.textContent === '0') display.textContent = '';
    display.textContent += number;
}

function handleOperator(operator) {
    lastOperator = operator;
    if (displayMode === 'input') {
        numbers.push(Number.parseInt(display.textContent));
        switch (operator) {
            case "+":
                display.textContent = numbers.reduce((a, b) => a + b);
                break;
            case "-":
                display.textContent = numbers.reduce((a, b) => a - b);
                break;
            case "*":
                display.textContent = numbers.reduce((a, b) => a * b);
                break;
            case "/":
                display.textContent = numbers.reduce((a, b) => a / b);
                break;
            case "=":
                display.textContent = numbers[0];
        }
        displayMode = "answer";
    }
}

function handleSystem(action) {
    switch (action) {
        case "clear":
            numbers.length = 0;
            displayMode = 'input';
            display.textContent = '0';
            break;
        case "backspace":
            display.textContent = display.textContent.slice(0, -1);
            break;
    }
}

function delegator(button) {
    switch(button.className) {
        case "number":
            handleNumber(button.dataset.value);
            break;
        case "operator":
            handleOperator(button.dataset.value);
            break;
        case "system":
            handleSystem(button.dataset.action);
            break;
        default:
            alert("Error");
            throw new Error("Invalid button input");
    }
}

/*
* IF IN ANSWER MODE AND NUMBER IS PRESSED:
*   SCREEN NEEDS TO BE CLEARED AND NEW NUMBER ADDED
* */