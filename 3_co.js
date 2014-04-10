// SAMPLE 3: Co
//
// Same as sample 2. But this time
// we use the real 'co';

var co = require('co');

var returnAfterOneSec = function(msg) {
    return function(done) {
        setTimeout(function() {
            done(null, msg);
        }, 1000);
    };
};

console.log( 'before co' );

co(function * (foo) {
    console.log( foo );
    console.log( yield returnAfterOneSec('I return after 1 second') );
    console.log( yield returnAfterOneSec('I return after 2 seconds') );
})('bar');

console.log( 'after co' );

// => before co
// => 'bar'
// => after co
// => I get called after 1 second
// => I get called after 2 seconds