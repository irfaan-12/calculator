// script.js
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-input');

keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.value;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'equals') {
            display.value = keyContent;
        } else {
            display.value = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = 'number';
    }

    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            display.value = displayedNum + '.';
        } else if (previousKeyType === 'operator' || previousKeyType === 'equals') {
            display.value = '0.';
        }
        calculator.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear') {
        display.value = '';
        calculator.dataset.firstValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.modValue = '';
        calculator.dataset.previousKeyType = '';
    }

    if (action === 'delete') {
        display.value = displayedNum.slice(0, -1) || '0';
        calculator.dataset.previousKeyType = 'delete';
    }

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        // If firstValue exists and the previous key was an operator
        if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'equals') {
            const calcValue = calculate(firstValue, operator, secondValue);
            display.value = calcValue;
            calculator.dataset.firstValue = calcValue;
        } else {
            calculator.dataset.firstValue = displayedNum;
        }

        calculator.dataset.operator = action;
        calculator.dataset.previousKeyType = 'operator';
    }

    if (action === 'equals') {
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        if (firstValue) {
            if (previousKeyType === 'equals') {
                firstValue = displayedNum;
                secondValue = calculator.dataset.modValue;
            }
            display.value = calculate(firstValue, operator, secondValue);
        }

        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = 'equals';
    }
});

const calculate = (n1, operator, n2) => {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
};
