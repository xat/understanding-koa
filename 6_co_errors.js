// SAMPLE 6: Co Error handling

var co = require('co');

var subGenerator = function * () {
    throw new Error('Subgenerator error');
};

var errorThrower = function(msg) {
    return function(done) {
        setImmediate(function() {
            done(msg);
        });
    };
};

co(function *() {
    try {
        throw new Error('something odd happend');
    } catch (e) {
        console.log( e );
    }

    try {
        yield subGenerator;
    } catch (e) {
        console.log( e );
    }

    try {
        yield errorThrower('yet another strange thing happend');
    } catch (e) {
        console.log( e );
    }


    throw new Error('another odd thing happend');

})(function( err ) {
    // uncought exceptions will end up here.
    console.log( err );
});

// => [Error: something odd happend]
// => [Error: Subgenerator error]
// => yet another strange thing happend
// => [Error: another odd thing happend]