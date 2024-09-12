let currentInput = '';
let previousInput = '';
let currentOperator = '';
let lastResult = '';

function updateDisplay() {
    const display = document.getElementById('display');
    if (currentOperator) {
        display.value = `${formatNumber(previousInput)} ${currentOperator} ${formatNumber(currentInput)}`;
    } else {
        display.value = formatNumber(currentInput) || '0';
    }
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function handleNumber(value) {
    if (currentInput === '' && value === '0') return;
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function handleOperator(operator) {
    if (currentInput === '' && operator !== '-') return;
    if (previousInput !== '' && currentInput !== '') {
        calculate();
    }
    currentOperator = operator;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    if (previousInput === '' || currentInput === '' || currentOperator === '') return;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (currentOperator) {
        case '+':
            lastResult = (prev + curr).toString();
            break;
        case '-':
            lastResult = (prev - curr).toString();
            break;
        case '*':
            lastResult = (prev * curr).toString();
            break;
        case '/':
            lastResult = (prev / curr).toString();
            break;
        default:
            return;
    }

    currentInput = lastResult;
    previousInput = '';
    currentOperator = '';
    updateDisplay();
}

function handlePercent() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    lastResult = '';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'Enter':
            calculate();
            break;
        case 'Escape':
            clearAll();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(event.key);
            break;
        case '%':
            handlePercent();
            break;
        case 'Backspace':
            deleteLast();
            break;
        default:
            if (event.key >= '0' && event.key <= '9') {
                handleNumber(event.key);
            }
            break;
    }
}

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;
        if (['+', '-', '*', '/', '=', 'AC', 'DE', '%'].includes(value)) {
            if (value === '=') {
                if (currentOperator && previousInput) {
                    calculate();
                } else {
                    // If no operator, but just pressing '=', set result to currentInput
                    lastResult = currentInput;
                    previousInput = '';
                    currentOperator = '';
                    updateDisplay();
                }
            } else if (value === 'AC') {
                clearAll();
            } else if (value === 'DE') {
                deleteLast();
            } else if (value === '%') {
                handlePercent();
            } else {
                handleOperator(value);
            }
        } else {
            handleNumber(value);
        }
    });
});

document.addEventListener('keydown', handleKeyPress);
