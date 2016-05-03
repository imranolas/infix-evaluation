import tape from 'tape';
import {infixToPostfix, evaluatePostfix} from '../src/evaluator.js';

tape('infixToPostfix', (t) => {
    const cases = [
      {input: [1, '+', 2], output: [1, 2, '+']},
      {input: ['-u', 1, '+', 2], output: [-1, 2, '+']},
      {input: [3, '-', 4], output: [3, 4, '-']},
      {input: [3, '-', '-u', 4], output: [3, -4, '-']},
      {input: [1, '+', 2, '*', 3, '-', 4], output: [1, 2, 3, '*', '+', 4, '-']},
      {input: [1, '*', 2, '/', 3, '-', 4], output: [1, 2, '*', 3, '/', 4, '-']},
      { input: ['(', 1, '+', 2, ')', '*', '(', 3, '-', 4, ')'],
        output: [1, 2, '+', 3, 4, '-', '*']},
      { input: ['(', '-u', 1, '+', 2, ')'],
        output: [-1, 2, '+']},
      { input: ['(', 1, '*', '(', 2, '+', 3, ')', ')'],
        output: [ 1, 2, 3, '+', '*']},
      { input: [2, '*', '(', 23, '/', '(', 3, '*', 3, ')', ')', '-', 23, '*', '(', 2, '*', 3, ')'],
        output: [ 2, 23, 3, 3, '*', '/', '*', 23, 2, 3, '*', '*', '-' ]}
    ];

    cases.forEach(({input, output}) => {
      t.deepEqual(infixToPostfix(input), output);
    });

    t.end();
});

tape('infixToPostfix throws error', (t) => {
    const cases = [
      {input: ['(', 1, '+', 2], output: /missing a closing parenthesis/},
      {input: [3, '-', 4, ')'], output: /missing an opening parenthesis/}
    ];

    cases.forEach(({input, output}) => {
      t.throws(() => infixToPostfix(input), output);
    });

    t.end();
});

tape('evaluatePostfix', (t) => {
    const cases = [
      {
        input: [1, 2, '+'],
        output: 1 + 2
      },
      {
        input: [3, 4, '-'],
        output: 3 - 4
      },
      {
        input: [-3, 4, '-'],
        output: -3 - 4
      },
      {
        input: [1, 2, 3, '*', '+', 4, '-'],
        output: 1 + 2 * 3 - 4
      },
      {
        input: [1, 2, '*', 3, '/', 4, '-'],
        output: 1 * 2 / 3 - 4
      },
      {
        input: [1, 2, '+', 3, 4, '-', '*'],
        output: (1 + 2) * (3 - 4)
      },
      {
        input: [2, 23, 3, 3, '*', '/', '*', 23, 2, 3, '*', '*', '-'],
        output: 2 * (23 / (3 * 3)) - 23 * (2 * 3)
      }
    ];

    cases.forEach(({input, output}) => {
      t.deepEqual(evaluatePostfix(input), output);
    });

    t.end();
});
