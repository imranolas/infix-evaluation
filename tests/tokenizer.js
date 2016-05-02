import tape from 'tape';
import {createInputStream} from '../src/input';
import {identifiers, tokenStream} from '../src/tokenizer';

tape('isOp', (t) => {
    const [,, opIdent] = identifiers;
    t.equal(opIdent.take(createInputStream('/')), '/');
    t.equal(opIdent.take(createInputStream('*')), '*');
    t.equal(opIdent.take(createInputStream('-')), '-');
    t.equal(opIdent.take(createInputStream('+')), '+');

    t.equal(opIdent.take(createInputStream('2 + 3')), '');
    t.equal(opIdent.take(createInputStream('+/')), '+/');
    t.end();
});

tape('isWhitespace', (t) => {
    const [whitespaceIdent] = identifiers;
    t.equal(whitespaceIdent.take(createInputStream(' ')), ' ');
    t.equal(whitespaceIdent.take(createInputStream('\n')), '\n');
    t.end();
});

tape('isDigit', (t) => {
    const [, numberIdent] = identifiers;
    t.equal(numberIdent.take(createInputStream('1')), 1);
    t.equal(numberIdent.take(createInputStream('2123')), 2123);
    t.equal(numberIdent.take(createInputStream('1.50')), 1.5);
    t.equal(numberIdent.take(createInputStream('1.99 +')), 1.99);
    t.end();
});

tape('tokenStream', (t) => {
  const cases = [
    { input: '1 + 2 * (3 - 5)',
      output: [1, '+', 2, '*', '(', 3, '-', 5, ')'] },
    { input: '2 * (23/(3*3))- 23 * (2*3)',
      output: [2, '*', '(', 23, '/', '(', 3, '*', 3, ')', ')', '-', 23, '*', '(', 2, '*', 3, ')'] }
  ];

  cases.forEach(({input, output}) => {
    const streamGen = tokenStream(createInputStream(input));

    output.reduce((tokenStream, token) => {
      t.deepEqual(streamGen.next(), {done: false, value: token});
      return streamGen;
    }, streamGen);

    t.deepEqual(streamGen.next(), {done: true, value: undefined});
  });

  t.end();
});
