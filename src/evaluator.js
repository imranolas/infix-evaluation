const PRECEDENCE = {
  '*': 10,
  '/': 10,
  '+': 5,
  '-': 5
};

function isOperator(ch) {
  return '+-*/'.indexOf(ch) >= 0;
}

function isNumber(ch) {
  return typeof ch === 'number';
}

function peekTop(stack) {
  return stack.slice(-1)[0];
}

export function infixToPostix(arr) {
  let outputStack = [];
  const operatorStack = [];

  while (arr.length !== 0) {
    const token = arr.shift();
    if (token === '(') {
      const newContext = [];
      let nextToken = arr.shift();
      while (nextToken !== ')') {
        newContext.push(nextToken);
        nextToken = arr.shift();
      }
      outputStack = outputStack.concat(infixToPostix(newContext));
    } else if (isOperator(token)) {
      while (operatorStack.length &&
        (PRECEDENCE[token] || 0) <= (PRECEDENCE[peekTop(operatorStack)] || 0)) {
          outputStack.push(operatorStack.pop());
        }
        operatorStack.push(token);
    } else {
      outputStack.push(token);
    }
  }

  return outputStack.concat(operatorStack);
}

export function evaluatePostfix(arr) {
  let stack = [];
  while (arr.length !== 0) {
    console.log(stack);
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
