const input = document.getElementById('input');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.grid > .button');

let newInput = '';
let firstNumber = '';
let secondNumber = '';
let action = '';

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (a === 0) {
    return 'Oops';
  }
  return a / b;
}
function power(a, b) {
  let value = a;
  for (let i = 1; i < b; i++) {
    value *= a;
  }
  return value;
}

function displayInput(task, newNumber) {
  if (task === 'add') {
    newInput += newNumber;
    input.textContent = newInput;
  } else if (task === 'backspace') {
    newInput = newInput.slice(0, -1);
  } else if (task === 'clear') {
    newInput = '';
    if (newNumber === 1) {
      firstNumber = '';
      secondNumber = '';
      action = '';
    }
  }
}

function operate(operator, a, b) {
  displayInput('clear', 0);
  if (operator === 'plus') {
    displayInput('add', add(+a, +b));
  } else if (operator === 'minus') {
    displayInput('add', subtract(+a, +b));
  } else if (operator === 'multiply') {
    displayInput('add', multiply(+a, +b));
  } else if (operator === 'divide') {
    displayInput('add', divide(+a, +b));
  } else if (operator === 'power') {
    displayInput('add', power(+a, +b));
  }
  firstNumber = '';
  secondNumber = '';
  action = '';
}

function startCalculator() {
  buttons.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (item.classList.contains('operator')) {
        if (newInput !== '' && secondNumber === '' && firstNumber === '') {
          firstNumber = newInput;
          action = e.target.id;
          displayInput('clear', 0);
        } else if (newInput !== '' && firstNumber !== '') {
          secondNumber = newInput;
          operate(action, firstNumber, secondNumber);
          firstNumber = newInput;
          action = e.target.id;
          newInput = '';
        }
      } else if (item.classList.contains('equal')) {
        if (newInput !== '' && firstNumber !== '') {
          secondNumber = newInput;
          operate(action, firstNumber, secondNumber);
        }
      } else if (item.classList.contains('backspace')) {
        displayInput('backspace', 0);
      } else if (item.classList.contains('clear')) {
        displayInput('clear', 1);
      }
      displayInput('add', e.target.textContent);
    });
  });
}

startCalculator();
