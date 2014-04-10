// SAMPLE 1: Generators
//
// This sample just shows how generators
// in javascript generally work.


// the '*' identifies that it's
// a generator function.
var MyGenerator = function * () {
    yield 'one';
    yield 'two';

    return 'three';
};

var gen = MyGenerator();

console.log( gen.next() );
// => { value: 'one', done: false }

console.log( gen.next() );
// => { value: 'two', done: false }

// If the Generator would not have an
// 'return' then the value propery of the
// following would be set to 'undefined'.
console.log( gen.next() );
// => { value: 'three', done: true }

try {
    gen.next();
} catch (e) {
    console.log( e );
    // => [Error: Generator has already finished]
}
