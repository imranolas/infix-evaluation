import tape from 'tape';
import {createInputStream} from '../src/input';
import {identifiers, createTokenStream} from '../src/tokenizer';

tape('isOp', (t) => {
    const [,, opIdent] = identifiers;
    t.equal(opIdent.take(createInputStream('/')), '/');
    t.equal(opIdent.take(createInputStream('*')), '*');
    t.equal(opIdent.take(createInputStream('-')), '-u');
    t.equal(opIdent.take(createInputStream('+')), '+u');

    const cases = [
      {input: ['-', 1], output: '-'},
      {input: ['+', 1], output: '+'},
      {input: ['+', '('], output: '+u'}
    ];

    cases.forEach(({input, output}) => {
      const inputStream = createInputStream(input[0]);
      t.equal(opIdent.take(inputStream, input[1]), output);
    });

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
    { input: '1 + -2',
      output: [1, '+', '-u', 2] },
    { input: '-1 + 2',
      output: ['-u', 1, '+', 2] },
    { input: '( -1 + 2)',
      output: ['(', '-u', 1, '+', 2, ')'] },
    { input: '2 * (23/(3*3))- 23 * (2*3)',
      output: [2, '*', '(', 23, '/', '(', 3, '*', 3, ')', ')', '-', 23, '*', '(', 2, '*', 3, ')'] }
  ];

  cases.forEach(({input, output}) => {
    t.deepEqual(createTokenStream(createInputStream(input)), output);
  });

  t.end();
});

tape('tokenStream exceptions', (t) => {
  t.doesNotThrow(() => createTokenStream(createInputStream('1 - - + 3')));
  t.throws(() => createTokenStream(createInputStream('1 * / 3')), /Too many consecutive operators/);
  t.end();
});
