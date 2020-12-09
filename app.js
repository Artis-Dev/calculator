const buttons = document.querySelectorAll('.grid > .button');
const input = document.getElementById('input');
const history = document.getElementById('history');
const decimalPoint = buttons[10];

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
  if (b === 0) {
    return 'Oops';
  }
  const answer = a / b;
  return roundLongDecimals(answer);
}
function power(a, b) {
  let answer = a;
  for (let i = 1; i < b; i += 1) {
    answer *= a;
  }
  return roundLongDecimals(answer);
}

function displayHistory(toHistory) {
  if (toHistory === 'plus') {
    history.textContent += '+ ';
  } else if (toHistory === 'minus') {
    history.textContent += '- ';
  } else if (toHistory === 'multiply') {
    history.textContent += '* ';
  } else if (toHistory === 'divide') {
    history.textContent += '/ ';
  } else if (toHistory === 'power') {
    history.textContent += '^ ';
  } else {
    history.textContent += `${toHistory} `;
  }
}

function displayInput(task, newNumber) {
  if (task === 'add') {
    newInput += newNumber;
    input.textContent = newInput;
  } else if (task === 'backspace') {
    newInput = newInput.slice(0, -1);
    if (newInput.indexOf('.') === -1) {
      decimalPoint.removeAttribute('disabled');
    }
    input.textContent = newInput;
  } else if (task === 'clear') {
    newInput = '';
    decimalPoint.removeAttribute('disabled');
    input.textContent = newInput;
    if (newNumber === 1) {
      firstNumber = '';
      secondNumber = '';
      action = '';
      history.textContent = '';
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

function buttonsHandler(item) {
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
    if (secondNumber === '' && firstNumber === '') {
      firstNumber = newInput;
      action = item.id;
      displayHistory(firstNumber);
      displayHistory(action, 'operator');
      displayInput('clear', 0);
    } else if (newInput !== '' && firstNumber !== '') {
      secondNumber = newInput;
      displayHistory(secondNumber);
      operate(action, firstNumber, secondNumber);
      action = item.id;
      displayHistory(action, 'operator');
      firstNumber = newInput;
      displayInput('clear', 0);
    } else if (newInput === '' && firstNumber !== '' && action === '') {
      displayHistory(firstNumber);
      action = item.id;
      displayHistory(action, 'operator');
      displayInput('clear', 0);
    }
  } else if (item.classList.contains('equal')) {
    if (newInput !== '' && firstNumber !== '') {
      secondNumber = newInput;
      displayHistory(secondNumber);
      displayHistory('=');
      operate(action, firstNumber, secondNumber);
      firstNumber = newInput;
      newInput = '';
    }
  } else if (item.classList.contains('backspace')) {
    displayInput('backspace', 0);
  } else if (item.classList.contains('clear')) {
    displayInput('clear', 1);
  }
}

function startCalculator() {
  buttons.forEach((item) => {
    item.addEventListener('click', () => { buttonsHandler(item); });
    // item.addEventListener('keyup', (key) => { buttonsHandler(key); });
  });
}

startCalculator();
