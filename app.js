const buttons = document.querySelectorAll('.grid > .button');
const input = document.getElementById('input');
const history = document.getElementById('history');

let newInput = '';
let firstNumber = '';
let secondNumber = '';
let action = '';

function roundLongDecimals(answer) {
  if (answer.toString().indexOf('.') !== -1) {
    if (answer.toString().split('.')[1].length > 5) {
      return answer.toFixed(5);
    }
  }
  return answer;
}

function add(a, b) {
  const answer = a + b;
  return roundLongDecimals(answer);
}
function subtract(a, b) {
  const answer = a - b;
  return roundLongDecimals(answer);
}
function multiply(a, b) {
  const answer = a * b;
  return roundLongDecimals(answer);
}
function divide(a, b) {
  if (a === 0) {
    return 'Oops';
  }
  const answer = a / b;
  return roundLongDecimals(answer);
}
function power(a, b) {
  let answer = a;
  for (let i = 1; i < b; i++) {
    answer *= a;
  }
  return roundLongDecimals(answer);
}

function displayInput(task, newNumber) {
  if (task === 'add') {
    newInput += newNumber;
    input.textContent = newInput;
  } else if (task === 'backspace') {
    newInput = newInput.slice(0, -1);
    if (newInput.indexOf('.') === -1) {
      buttons[10].removeAttribute('disabled');
    }
    input.textContent = newInput;
  } else if (task === 'clear') {
    newInput = '';
    buttons[10].removeAttribute('disabled');
    input.textContent = newInput;
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
    item.addEventListener('click', () => {
      if (item.classList.contains('number')) {
        displayInput('add', item.textContent);
      } else if (item.classList.contains('decimal')) {
        if (newInput.indexOf('.') !== -1) {
          item.setAttribute('disabled', '');
        } else {
          item.removeAttribute('disabled');
          displayInput('add', item.textContent);
        }
      } else if (item.classList.contains('operator')) {
        if (newInput !== '' && secondNumber === '' && firstNumber === '') {
          firstNumber = newInput;
          action = item.id;
          displayInput('clear', 0);
        } else if (newInput !== '' && firstNumber !== '') {
          secondNumber = newInput;
          operate(action, firstNumber, secondNumber);
          firstNumber = newInput;
          action = item.id;
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
    });
  });
}

startCalculator();
