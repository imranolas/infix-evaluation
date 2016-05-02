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

/**
 * Takes chars from the input stream given a predicate.
 * @method takeWhile
 * @param  {Function}     predicate
 * @param  {InputStream}  input
 * @return {String}
 */
function takeWhile(predicate, input) {
  let str = '';
  while (!input.eof() && predicate(input.peek())) {
    str += input.next();
  }
  return str;
}

/**
 * An array of identifiers where each identifier responds to accept and take.
 *
 * #accept returns a boolean if a given token matches that identifier.
 *
 * #take performs returns the matching token and progresses the input stream to
 * the next token.
 *
 * @type {Array}
 */
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

/**
 * Returns an array of valid tokens.
 * @method createTokenStream
 * @param  {inputStream} input
 * @return {Array}
 */
export function createTokenStream(input) {
  const outputStream = [];
  while (!input.eof()) {
    const [whitespaceIdent] = identifiers;
    whitespaceIdent.take(input); // Discard whitespace tokens

    const identifier = identifiers.find(({accept}) => accept(input.peek()));
    if (!identifier) throw new SyntaxError(unidentifedMessage(input.peek()));
    outputStream.push(identifier.take(input));
  }

  return outputStream;
}

const unidentifedMessage = (val) => `Unidentified token ${val}. Only numeric characters and +-*/() are permitted. Did you make a typo or perhaps you forgot to base64 encode your input.`;
