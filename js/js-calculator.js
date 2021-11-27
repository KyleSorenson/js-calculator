let displayString = '';
let calcDisplay = document.getElementById('display');

function handleClick(str) {
  if( displayString === '' && str === '0' ) {
    return;
  }

  let terms = displayString.split(/\+|-|x|÷/);
  let currentTerm = terms[terms.length-1];
  console.log(`currentTerm: ${currentTerm}`);
  console.log(`term has decimal?: ${/\./.test(currentTerm)}`);
  if ( /\./.test(currentTerm) && str === '.' ) {
    return;
  }

  displayString += str;
  calcDisplay.innerHTML = displayString;

}

function allClear() {
  displayString = '';
  calcDisplay.innerHTML = '0';
}

function expressionEval() {
  if ( displayString === '' || !/[0-9]/.test(displayString ) ) {
    displayString = '';
    calcDisplay.innerHTML = '0';
    return;
  }

  let operations;
  console.log(`display: ${displayString}`);
  console.log(`has consecutive operators: ${/(\+|-|x|÷)(\+|-|x|÷)/.test(displayString)}`)
  
  if ( /(\+|-|x|÷)(\+|-|x|÷)+/.test(displayString) ) {
    operations = displayString.match(/(\+|-|x|÷)+/g);
    console.log(`operations before: ${operations}`);
    operations = operations.map( e => {
      if (e.slice(-1) === '-') {
        return e.slice(-2);
      } else {
        return e.slice(-1);
      }
    }) 
    console.log(`operations after: ${operations}`); 
  } else {
    operations = displayString.match(/\+|-|x|÷/g);
  }

  let numbers = displayString.match(/[0-9.]+/g);

  if ( numbers.length === 1 ) {
    displayString = String(numbers[0]);
    calcDisplay.innerHTML = displayString;
    return numbers[0];
  }

  numbers = numbers.map( e => Number(e) );
  
  for (let o = 0; o < operations.length; o++) {
    if (numbers.length >= 2) {
      console.log(`~~~~~ expression ${o+1} ~~~~~`)
      let operation = operations[o];
      console.log(`operation: ${operation}`);
      let term1 = numbers.shift();
      console.log(`term1: ${term1}`);
      let term2 = numbers.shift();
      console.log(`term2: ${term2}`)
      let solution;
      switch (operation) {
        case '+':
          solution = term1 + term2;
          break;
        case '-':
          solution = term1 - term2;
          break;
        case 'x':
          solution = term1 * term2;
          break;
        case '÷':
          solution = term1 / term2;
          break;
        case '+-':
          solution = term1 + (term2 * -1);
          break;
        case '--':
          solution = term1 - (term2 * -1);
          break;
        case 'x-':
          solution = term1 * (term2 * -1);
          break;
        case '÷-':
          solution = term1 / (term2 * -1);
          break;
        default:
          break;
      }
      console.log(`solution: ${solution}`);
      numbers.unshift(solution);
    }
  }

  [finalSolution] = numbers;
  console.log(`--------> final solution: ${finalSolution} <---------`);
  displayString = String(finalSolution).slice(0,10);
  calcDisplay.innerHTML = displayString;

}