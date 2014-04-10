var http = require('http');
var koa = require('koa');
var app = koa();

app.use(function * (next) {

    try {
        yield next;
    } catch (e) {
        console.log( 'Error handled in Middleware 1', e );
    }

});

app.use(function * (next) {
    throw new Error( 'Middleware 2 Error' );
});

app.on('error', function(err) {
    console.log(err);
});

app.listen(5000);
http.get('http://localhost:5000', function() { process.exit(1); });