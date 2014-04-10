// SAMPLE 4: Co Parallel
//
// Show how functions can be executed
// in parallel if they are stored in
// arrays or objects and demonstrate the done callback.

var co = require('co');

var outputAfterOneSec = function(msg) {
    return function(done) {
        setTimeout(function() {
            console.log( msg );
            done();
        }, 1000);
    };
};

co(function * () {

    // if stuffed in an array, thunks will get executed
    // in parallel
    yield [ outputAfterOneSec('I get called after 1 second'),
            outputAfterOneSec('I get called after 1 second') ];

    // ...same happens if they properties (also nested) of an object.
    yield {
        prop1: outputAfterOneSec('I get called after 2 seconds'),
        prop2: outputAfterOneSec('I get called after 2 seconds')
    };

    // this also works with nested objects.
    yield {
        prop1: {
            prop2: [ outputAfterOneSec('I get called after 3 seconds') ]
        },
        prop3: {
            prop4: outputAfterOneSec('I get called after 3 seconds')
        }
    };

    // and with nested objects inside arrays
    yield [{ prop: outputAfterOneSec('I get called after 4 seconds') }];

    return 'some return value';
})(function(err, ret) {
    // Notice that this function gets called after everything
    // is done. If we would have added an argument within the
    // Generator function above, this function would have been
    // passed as argument instead.

    console.log( ret ); // this holds the return value of the Generator
    console.log( 'everything done!' );
});

// => I get called after 1 second
// => I get called after 1 second
// => I get called after 2 seconds
// => I get called after 2 seconds
// => I get called after 3 seconds
// => I get called after 3 seconds
// => I get called after 4 seconds
// => some return value
// => everything done!