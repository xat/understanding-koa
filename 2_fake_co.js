// SAMPLE 2: Fake Co
//
// To understand how co works we will
// setup our own FakeCo which is simplified
// version of co.

// returns a function that we can yield
// from within the Generator.
// The returned function is called a 'thunk'
// in the co-world.
var outputAfterOneSec = function(msg) {
    return function(done) {
        setTimeout(function() {
            console.log( msg );
            done();
        }, 1000);
    };
};

var MyGenerator = function * () {
    yield outputAfterOneSec('I get called after 1 second');
    yield outputAfterOneSec('I get called after 2 seconds');
};

// Simplified version of 'co'
var FakeCo = function(gen) {
    var walk = function() {
        var obj = gen.next();
        if (typeof obj.value == 'function') {
            obj.value(function() {
                if (!obj.done) walk();
            });
        } else {
            if (!obj.done) walk();
        }
    };

    walk();
};

FakeCo( MyGenerator() );

// => I get called after 1 second
// => I get called after 2 seconds