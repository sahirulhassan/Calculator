let previousValue = null;
let previousOperator = null;
let shouldClear = false;   // should next digit overwrite display?

const display = document.querySelector(".display");

document.querySelector(".button-grid").addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        delegator(event.target);
    }
});

function calculate(a, b, op) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? NaN : a / b;
        default:     throw new Error(`Unknown operator: ${op}`);
    }
}

function handleNumber(value) {
    if (value === "." && display.textContent.includes(".")) return;

    if (shouldClear) {
        display.textContent = value === "." ? "0." : value;
        shouldClear = false;
        return;
    }

    if (display.textContent === "0" && value !== ".") {
        display.textContent = value;
        return;
    }
    display.textContent += value;
}


function handleOperator(operator) {
    const currentValue = parseFloat(display.textContent);

    if (previousValue === null) {
        previousValue = currentValue;
    } else if (!shouldClear) {
        previousValue = calculate(previousValue, currentValue, previousOperator);
        display.textContent = previousValue.toString();
    }

    previousOperator = operator;
    shouldClear = true;
}


function handleEqual() {
    if (previousOperator === null || shouldClear) return;

    const currentValue = parseFloat(display.textContent);
    const result = calculate(previousValue, currentValue, previousOperator);

    display.textContent = result.toString();
    previousValue = result;
    previousOperator = null;
    shouldClear = true;
}


function handleSystem(action) {
    switch (action) {
        case "clear":
            display.textContent = "0";
            previousValue = null;
            previousOperator = null;
            shouldClear = false;
            break;

        case "backspace":
            if (shouldClear) return;
            display.textContent =
                display.textContent.length > 1
                    ? display.textContent.slice(0, -1)
                    : "0";
            break;
    }
}

function delegator(button) {
    if (button.classList.contains("number")) {
        handleNumber(button.dataset.value);
        return;
    }

    if (button.classList.contains("operator")) {
        if (button.dataset.value === "=") {
            handleEqual();
        } else {
            handleOperator(button.dataset.value);
        }
        return;
    }

    if (button.classList.contains("system")) {
        handleSystem(button.dataset.action);
    }
}
