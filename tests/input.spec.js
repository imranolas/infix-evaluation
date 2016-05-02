import tape from 'tape';
import {createInputStream} from '../src/input';

tape('inputStream', (t) => {
    // t.plan(2);
    const input = '1 + 2';
    const inputStream = createInputStream(input);

    t.equal(inputStream.peek(), '1');
    t.equal(inputStream.peek(), '1');

    t.equal(inputStream.next(), '1');
    t.equal(inputStream.eof(), false);

    t.equal(inputStream.peek(), ' ');
    t.equal(inputStream.next(), ' ');
    t.equal(inputStream.eof(), false);

    inputStream.next();
    inputStream.next();
    t.equal(inputStream.eof(), false);

    t.equal(inputStream.peek(), '2');
    t.equal(inputStream.next(), '2');
    t.equal(inputStream.eof(), true);

    t.equal(inputStream.peek(), '');

    t.end();
});
