import tape from 'tape';
import {infixToPostix, evaluatePostfix} from '../src/evaluator.js';

tape('infixToPostix', (t) => {
    const cases = [
      { input: [2, '*', '(', 23, '/', '(', 3, '*', 3, ')', ')', '-', 23, '*', '(', 2, '*', 3, ')'],
        output: [1, 2, '+', 3, 4, '-', '*']},
      {input: [1, '+', 2], output: [1, 2, '+']},
      {input: [3, '-', 4], output: [3, 4, '-']},
      {input: [1, '+', 2, '*', 3, '-', 4], output: [1, 2, 3, '*', '+', 4, '-']},
      {input: [1, '*', 2, '/', 3, '-', 4], output: [1, 2, '*', 3, '/', 4, '-']},
      { input: ['(', 1, '+', 2, ')', '*', '(', 3, '-', 4, ')'],
        output: [1, 2, '+', 3, 4, '-', '*']}
    ];

    cases.forEach(({input, output}) => {
      t.deepEqual(infixToPostix(input), output);
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
        input: [1, 2, '+', 3, 4, '-', '*'],
        output: 2 * (23 / (3 * 3)) - 23 * (2 * 3)
      }
    ];

    cases.forEach(({input, output}) => {
      t.deepEqual(evaluatePostfix(input), output);
    });

    t.end();
});
