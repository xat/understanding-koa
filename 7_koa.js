var koa = require('koa');
var app = koa();

app.use(function * (next) {
    // Koa runs middleware in an co
    // context. This means we can
    // do here anything that we learned in
    // the co samples.
    console.log( 'middleware 1 DOWN' );
    yield next;
    console.log( 'middleware 1 UP' );
});

app.use(function * (next) {
    console.log( 'middleware 2 DOWN' );
    yield next;
    console.log( 'middleware 2 UP' );
});

app.use(function * (next) {
    console.log( 'middleware 3 DOWN' );
    yield next;
    console.log( 'middleware 3 UP' );
});

app.use(function * (next) {
    console.log( 'middleware 4 DOWN' );
});

app.use(function * (next) {
    // This middleware will not get reached
    // since the previous middleware did not
    // yield 'next'
    console.log( 'middleware 5 DOWN' );
});

app.listen(5000);

// => middleware 1 DOWN
// => middleware 2 DOWN
// => middleware 3 DOWN
// => middleware 4 DOWN
// => middleware 3 UP
// => middleware 2 UP
// => middleware 1 UP