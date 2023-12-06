const buttons = document.querySelectorAll('.buttons-grid > .button');
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
  if (b === 0) {
    return roundLongDecimals(1);
  }
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
    history.textContent += '× ';
  } else if (toHistory === 'divide') {
    history.textContent += '÷ ';
  } else if (toHistory === 'power') {
    history.textContent += '^ ';
  } else {
    history.textContent += `${toHistory} `;
  }
}

function displayInput(task, value) {
  if (task === 'add') {
    if (newInput === 'Infinity') {
      newInput = '';
    }
    if (value !== '0' || newInput !== '0') {
      newInput += value;
      input.textContent = newInput;
    }
  } else if (task === 'backspace') {
    if (newInput === 'Infinity') {
      newInput = '';
    } else {
      newInput = newInput.slice(0, -1);
    }
    if (newInput.indexOf('.') === -1) {
      decimalPoint.removeAttribute('disabled');
    }
    input.textContent = newInput;
  } else if (task === 'clear') {
    newInput = '';
    decimalPoint.removeAttribute('disabled');
    if (value === 'full') {
      firstNumber = '';
      secondNumber = '';
      action = '';
      history.textContent = '';
      input.textContent = newInput;
    }
  }
}

function operate(operator, num1, num2) {
  displayInput('clear', 0);
  if (operator === 'plus') {
    displayInput('add', add(+num1, +num2));
  } else if (operator === 'minus') {
    displayInput('add', subtract(+num1, +num2));
  } else if (operator === 'multiply') {
    displayInput('add', multiply(+num1, +num2));
  } else if (operator === 'divide') {
    displayInput('add', divide(+num1, +num2));
  } else if (operator === 'power') {
    displayInput('add', power(+num1, +num2));
  }
  firstNumber = '';
  secondNumber = '';
  action = '';
}

function buttonsHandler(button) {
  if (button.classList.contains('number')) {
    displayInput('add', button.textContent);
  } else if (button.classList.contains('decimal')) {
    if (newInput.indexOf('.') !== -1) {
      button.setAttribute('disabled', '');
    } else {
      button.removeAttribute('disabled');
      displayInput('add', button.textContent);
    }
  } else if (button.classList.contains('operator')) {
    if (firstNumber === '' && secondNumber === '' && action === '' && newInput !== '' && newInput !== '.') {
      firstNumber = newInput;
      action = button.id;
      displayHistory(firstNumber);
      displayHistory(action, 'operator');
      displayInput('clear', 0);
    } else if (newInput !== '' && firstNumber !== '' && action !== '' && newInput !== '.') {
      secondNumber = newInput;
      displayHistory(secondNumber);
      operate(action, firstNumber, secondNumber);
      action = button.id;
      displayHistory(action, 'operator');
      firstNumber = newInput;
      displayInput('clear', 0);
    } else if (newInput === '' && firstNumber !== '' && action === '' && newInput !== '.') {
      displayHistory(firstNumber);
      action = button.id;
      displayHistory(action, 'operator');
      secondNumber = newInput;
      displayInput('clear', 0);
    } else if (newInput !== '' && firstNumber !== '' && action === '' && newInput !== '.') {
      firstNumber = newInput;
      action = button.id;
      displayHistory(firstNumber);
      displayHistory(action, 'operator');
      displayInput('clear', 0);
    }
  } else if (button.classList.contains('equal')) {
    if (newInput !== '' && firstNumber !== '' && newInput !== '.') {
      secondNumber = newInput;
      displayHistory(secondNumber);
      displayHistory('=');
      operate(action, firstNumber, secondNumber);
    }
  } else if (button.classList.contains('backspace')) {
    displayInput('backspace', 0);
  } else if (button.classList.contains('clear')) {
    displayInput('clear', 'full');
  }
}

function startCalculator() {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttonsHandler(button);
      buttons.forEach((but) => { but.blur(); });
    });
  });
  // Keyboard support
  document.addEventListener('keyup', (event) => {
    const operators = {
      '+': 'plus',
      '-': 'minus',
      '*': 'multiply',
      '/': 'divide',
      '^': 'power',
    };
    buttons.forEach((button) => { button.blur(); });
    if (!Number.isNaN(+event.key) && event.key !== ' ') {
      document.getElementById(`number-${event.key}`).click();
    } else if (event.key === 'Backspace') {
      document.getElementById('backspace').click();
    } else if (event.key === 'Delete' || event.key === 'c' || event.key === 'C') {
      document.getElementById('clear').click();
    } else if (event.key === '.') {
      document.getElementById('decimal').click();
    } else if (event.key === '=' || event.key === 'Enter') {
      document.getElementById('equal').click();
    } else if (['+', '-', '*', '/', '^'].includes(event.key)) {
      document.getElementById(operators[event.key]).click();
    } else {
      console.log('Wrong key:', event.key);
    }
  });
}

startCalculator();
