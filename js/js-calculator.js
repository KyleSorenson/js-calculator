let displayString = '';
let calcDisplay = document.getElementById('display');

// Handles all button press events except for "equals" and "A/C".
// Each press returns a string of a number, decimal, or
// math operator.
function handleClick(str) {
  
  // Prevents multiple zeros from being added to the
  // start of the string
  if( displayString === '' && str === '0' ) {
    return;
  }

  // Splits the string into "terms" (integer and float
  // strings that exclude math operators). Checks if the
  // term currently being typed already contains a decimal
  // point and prevents a second decimal from being added.
  let terms = displayString.split(/\+|-|x|÷/);
  let currentTerm = terms[terms.length-1];
  console.log(`currentTerm: ${currentTerm}`);
  console.log(`term has decimal?: ${/\./.test(currentTerm)}`);
  if ( /\./.test(currentTerm) && str === '.' ) {
    return;
  }

  // Appends button click string to the overall display
  // string and updates the display panel of the calculator.
  displayString += str;
  calcDisplay.innerHTML = displayString;

}

// Handles the "A/C" button press event.
function allClear() {
  displayString = '';
  calcDisplay.innerHTML = '0';
}

// Handles the "equals" button press event.
function expressionEval() {
  
  // If the display is empty, or contains no numbers,
  // clears the display string and the display panel.
  if ( displayString === '' || !/[0-9]/.test(displayString ) ) {
    displayString = '';
    calcDisplay.innerHTML = '0';
    return;
  }

  // Returns an array of all math operator strings. If more
  // than one operator is typed consecutively, that string
  // is shortened to the final operator typed. If the final
  // operator typed is a minus sign, then a string of the final
  // two operators is returned so that negative terms can
  // be evaluated later.
  let operators;
  console.log(`display: ${displayString}`);
  console.log(`has consecutive operators: ${/(\+|-|x|÷)(\+|-|x|÷)/.test(displayString)}`)
  
  if ( /(\+|-|x|÷)(\+|-|x|÷)+/.test(displayString) ) {
    operators = displayString.match(/(\+|-|x|÷)+/g);
    console.log(`operators before: ${operators}`);
    operators = operators.map( e => {
      if (e.slice(-1) === '-') {
        return e.slice(-2);
      } else {
        return e.slice(-1);
      }
    }) 
    console.log(`operators after: ${operators}`); 
  } else {
    operators = displayString.match(/\+|-|x|÷/g);
  }

  // Returns an array of all the inter and float
  // strings (excluding operators) and converts
  // them to javascript numbers.
  let numbers = displayString.match(/[0-9.]+/g);

  if ( numbers.length === 1 ) {
    displayString = String(numbers[0]);
    calcDisplay.innerHTML = displayString;
    return numbers[0];
  }

  numbers = numbers.map( e => Number(e) );
  
  // For each operator in the operators array,
  // the first two terms of the numbers array
  // are "shifted" off the top and evaluated
  // according to that operator. The solution
  // is then "unshifted" back onto the numbers
  // array so that it can be used as the first
  // term of the next operation. The string is
  // thus evaluated from left to right (does not
  // respect order of operations) until there is
  // only one number remaining in the array: the
  // final solution.
  for (let o = 0; o < operators.length; o++) {
    if (numbers.length >= 2) {
      console.log(`~~~~~ expression ${o+1} ~~~~~`)
      let operator = operators[o];
      console.log(`operator: ${operator}`);
      let term1 = numbers.shift();
      console.log(`term1: ${term1}`);
      let term2 = numbers.shift();
      console.log(`term2: ${term2}`)
      let solution;
      switch (operator) {
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