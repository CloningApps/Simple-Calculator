document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                updateDisplay();
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        calculate();
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                    currentOperator = value;
                }
            } else if (value === '=') {
                if (currentInput !== '' && previousInput !== '') {
                    calculate();
                }
            } else if (value === 'C') {
                clear();
            }
        });
    });

    function updateDisplay() {
        result.value = currentInput;
    }

    function calculate() {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let calculationResult;

        switch (currentOperator) {
            case '+':
                calculationResult = prev + current;
                break;
            case '-':
                calculationResult = prev - current;
                break;
            case '*':
                calculationResult = prev * current;
                break;
            case '/':
                calculationResult = prev / current;
                break;
        }

        currentInput = calculationResult.toString();
        previousInput = '';
        currentOperator = '';
        updateDisplay();
    }

    function clear() {
        currentInput = '';
        currentOperator = '';
        previousInput = '';
        updateDisplay();
    }
});
