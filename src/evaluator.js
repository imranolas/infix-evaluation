const PRECEDENCE = {
  '*': 10,
  '/': 10,
  '+': 5,
  '-': 5
};

function isOperator(token) {
  return '+-*/'.indexOf(token) >= 0;
}

function isNumber(token) {
  return typeof token === 'number';
}

/**
 * Take a peek at the value on the top of the stack
 * @method peekTop
 * @param  {Array} stack
 * @return {Any}
 */
function peekTop(stack) {
  return stack.slice(-1)[0];
}

/**
 * Transforms an array of infix tokens to an array of postfix tokens
 * @method infixToPostfix
 * @param  {Array} arr
 * @return {Array}
 */
export function infixToPostfix(arr) {
  let outputStack = [];
  const operatorStack = [];

  while (arr.length !== 0) {
    const token = arr.shift();
    if (token === ')') {
      while (operatorStack.length && peekTop(operatorStack) !== '(') {
        outputStack.push(operatorStack.pop());
      }
      operatorStack.pop();
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (isOperator(token)) {
      while (operatorStack.length &&
             PRECEDENCE[token] <= PRECEDENCE[peekTop(operatorStack)]) {
        outputStack.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (isNumber(token)) {
      outputStack.push(token);
    }
  }

  return outputStack.concat(operatorStack.reverse());
}

/**
 * Evaluates an array of postfix tokens
 * @method evaluatePostfix
 * @param  {Array}  arr
 * @return {Number}
 */
export function evaluatePostfix(arr) {
  let stack = [];
  while (arr.length !== 0) {
    let token = arr.shift();
    if (isNumber(token)) {
      stack.push(token);
    } else if (isOperator(token)) {
      stack.push(
        evaluateExpression(token, stack.pop(), stack.pop())
      );
    }
  }
  return stack.pop();
}

/**
 * Applies an operator to a pair of values
 * @method evaluateExpression
 * @param  {String}           operator one of /*+-
 * @param  {Number}           operandB
 * @param  {Number}           operandA
 * @return {Number}
 */
function evaluateExpression(operator, operandB, operandA) {
  switch (operator) {
    case '+':
      return operandA + operandB;
    case '-':
      return operandA - operandB;
    case '*':
      return operandA * operandB;
    case '/':
      return operandA / operandB;
    default:
      return 0;
  }
}
