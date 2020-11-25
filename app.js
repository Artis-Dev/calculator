console.log('Hello World!');

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b
}

function multiply(arr) {
  let value = 1;
  for(let i = 0; i < arr.length; i++) {
    value *= arr[i];
  }
  return value;
}

function sum(arr) {
  let value = 0;
  for(let i = 0; i < arr.length; i++) {
    value += arr[i];
  }
  return value;
}

function power(a, b) {
  let value = a;
  for(let i = 1; i < b; i++) {
    value *= a;
  }
  return value;
}

function factorial(a) {
  let value = 1;
  for(let i =  1; i <= a; i++) {
    value *= i;
  }
  return value;
}

function operate(operator, a, b) {

}
