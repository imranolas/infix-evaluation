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

function isUnaryOperator(token) {
  if (typeof token === 'string') {
    return token.slice(-1) === 'u';
  }
  return false;
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
      while (peekTop(operatorStack) !== '(') {
        if (!operatorStack.length) throw new SyntaxError('missing an opening parenthesis.');
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
    } else if (isUnaryOperator(token)) {
      operatorStack.push(token);
    } else if (isNumber(token)) {
      let count = 0;
      while (isUnaryOperator(peekTop(operatorStack))) {
        const unaryOp = operatorStack.pop();
        if (unaryOp[0] === '-') count--;
        if (unaryOp[0] === '+') count++;
      }
      const nextToken = count < 0 ? -token : token;
      outputStack.push(nextToken);
    }
  }

  while (operatorStack.length) {
    if (!isOperator(peekTop(operatorStack))) throw new SyntaxError('missing a closing parenthesis.');
    outputStack.push(operatorStack.pop());
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
