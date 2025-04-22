// Sélectionner les éléments de l'interface utilisateur
const screen = document.getElementById('calculator-screen');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let firstOperand = null;
let secondOperand = null;
let operator = null;
let resultDisplayed = false;

// Fonction pour mettre à jour l'écran
function updateScreen(value) {
    screen.textContent = value;
}

// Fonction pour effectuer les calculs
function calculate() {
    let result = 0;
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                alert("Cannot divide by zero");
                return "Error";
            }
            result = num1 / num2;
            break;
        default:
            return;
    }
    return result.toString();
}

// Fonction pour gérer les clics sur les boutons
function handleButtonClick(event) {
    const buttonValue = event.target.textContent;

    if ((buttonValue >= '0' && buttonValue <= '9') || buttonValue === '.') {
        if (resultDisplayed) {
            currentInput = '';
            resultDisplayed = false;
        }
        currentInput += buttonValue;
        updateScreen(currentInput);
    } else if (buttonValue === 'C') {
        currentInput = '';
        firstOperand = null;
        secondOperand = null;
        operator = null;
        updateScreen('0');
    } else if (buttonValue === '=') {
        if (firstOperand !== null && operator !== null) {
            secondOperand = currentInput;
            const result = calculate();
            updateScreen(result);
            firstOperand = result;
            secondOperand = null;
            operator = null;
            currentInput = result;
            resultDisplayed = true;
        }
    } else {
        if (firstOperand === null) {
            firstOperand = currentInput;
        } else if (operator !== null && !resultDisplayed) {
            secondOperand = currentInput;
            const result = calculate();
            updateScreen(result);
            firstOperand = result;
        }
        operator = buttonValue;
        currentInput = '';
    }
}

// Ajouter des écouteurs d'événements à tous les boutons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
