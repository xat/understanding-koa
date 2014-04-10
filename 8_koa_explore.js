var koa = require('koa');
var app = koa();

app.use(function * (next) {
    console.log( 'middleware 1 DOWN' );
    yield next;
    console.log( 'middleware 1 UP' );

    return 'foo';
});

app.use(function * (next) {
    console.log( 'middleware 2 DOWN' );
    yield next;
    console.log( 'middleware 2 UP' );

    try {
        // this will produce an error
        // since we already invoked 'next'
        // within this middleware
        yield next;
    } catch (e) {
        console.log(e);
    }
});

app.use(function * (next) {
    try {
        // invoking next the express-way won't work
        // we must yield it.
        next();
    } catch (e) {
        console.log( e );
    }
});


app.listen(5000);