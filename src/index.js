import {createInputStream} from './input';
import {createTokenStream} from './tokenizer';
import {infixToPostfix, evaluatePostfix} from './evaluator';

export function parseAndEvaluate(str) {
  const inputStream = createInputStream(str);
  const tokens = createTokenStream(inputStream);
  const postfixTokens = infixToPostfix(tokens);
  return evaluatePostfix(postfixTokens);
}
