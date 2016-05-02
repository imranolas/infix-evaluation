export function createInputStream(str) {
  let pos = 0;
  let col = 0;
  return {
    next() {
      const ch = str.charAt(pos++);
      col++;
      return ch;
    },
    peek() {
      return str.charAt(pos);
    },
    eof() {
      return this.peek() === '';
    }
  };
}
