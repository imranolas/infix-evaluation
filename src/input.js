/**
 * Returns a object for walking a string expression
 * @method createInputStream
 * @param  {[type]}          str [description]
 * @return {[type]}              [description]
 */
export function createInputStream(str) {
  let pos = 0;
  let col = 0;
  return {
    /**
     * Returns the current value at pos and moves pos along 1 space.
     * @method next
     * @return {Char}
     */
    next() {
      const ch = str.charAt(pos++);
      col++;
      return ch;
    },
    /**
     * Returns the current value at pos
     * @method peek
     * @return {Char}
     */
    peek() {
      return str.charAt(pos);
    },
    /**
     * Returns a boolean if the pos has reached the end of the sequence.
     * @method eof
     * @return {Boolean}
     */
    eof() {
      return this.peek() === '';
    }
  };
}
