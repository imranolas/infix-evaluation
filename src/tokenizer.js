function isDigit(ch) {
  return /[0-9]/i.test(ch);
}

function isOperator(ch) {
  return '+-*/'.indexOf(ch) >= 0;
}

function isWhitespace(ch) {
  return ' \t\n'.indexOf(ch) >= 0;
}

function isPunctuation(ch) {
    return '()'.indexOf(ch) >= 0;
}

function takeWhile(predicate, input) {
  let str = '';
  while (!input.eof() && predicate(input.peek())) {
    str += input.next();
  }
  return str;
}

export const identifiers = [
  {
    accept: isWhitespace,
    take: (input) => takeWhile(isWhitespace, input)
  },
  {
    accept: isDigit,
    take(input) {
      let hasDot = false;
      const number = takeWhile(ch => {
        if (ch === '.') {
            if (hasDot) return false;
            hasDot = true;
            return true;
        }
        return isDigit(ch);
      }, input);
      return parseFloat(number);
    }
  },
  {
    accept: isOperator,
    take(input) {
      return takeWhile(isOperator, input);
    }
  },
  {
    accept: isPunctuation,
    take: (input) => input.next()
  }
];

export function* tokenStream(input) {
  while (!input.eof()) {
    const [whitespaceIdent] = identifiers;
    whitespaceIdent.take(input); // Discard whitespace tokens

    const identifier = identifiers.find(({accept}) => accept(input.peek()));
    if (!identifier) input.croak();
    yield identifier.take(input);
  }
}
