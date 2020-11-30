const input = document.getElementById('input');
const buttons = document.querySelectorAll('.grid > .button');

let newInput = '';

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
    return 'oops';
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

function operate(operator, a, b) {
  return operator(a, b);
}

function displayInput(action, newNumber) {
  if (action === 'add') {
    newInput += newNumber;
    input.textContent = newInput;
  } else if (action === 'backspace') {
    newInput = newInput.slice(0, -1);
  }
}

function startCalculator() {
  buttons.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (item.classList.contains('operator')) {
        console.log(e.target.id);
      } else if (item.classList.contains('backspace')) {
        displayInput('backspace', 0);
      } else if (item.classList.contains('clear')) {
        console.log('clear');
      }
      displayInput('add', e.target.textContent);
    });
  });
}

startCalculator();
