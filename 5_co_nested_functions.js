// SAMPLE 5: Nested functions and generators
//
// Here we demonstrate how co handles nested functions and
// generators

var co = require('co');

var outputAfterOneSec = function(msg) {
    return function(done) {
        setTimeout(function() {
            console.log( msg );
            done();
        }, 1000);
    };
};

var subGenerator1 = function * () {
    yield outputAfterOneSec('I get called after 1 second');
};

var subGenerator2 = function * () {
    yield [ outputAfterOneSec('I get called after 2 seconds'),
            outputAfterOneSec('I get called after 2 seconds') ] ;
};

var subCoFunction = co(function * () {
    yield outputAfterOneSec('I get called after 3 seconds');
});


co(function * () {
    yield subGenerator1();

    // if we don't execute the generator our selfs
    // co will do that in the background for us (notice the missing '()').
    yield subGenerator2;

    // We can also yield a Generator wrapped in co
    yield [subCoFunction, subCoFunction];
})();

// => I get called after 1 second
// => I get called after 2 seconds
// => I get called after 2 seconds
// => I get called after 3 seconds
// => I get called after 3 seconds