
var simpleargs = require('../');

exports['process values'] = function (test) {    
    simpleargs.define('p','port',3000,'Port number')
        .define('h','host','localhost', 'Host name/address')
        .defineValue('message', 'hello, world', 'Message to send');

    var options = simpleargs.process(['node', 'server', 'hello', '-p', '4000', '--host', 'mydomain']);

    test.ok(options);
    test.equal(options.port, 4000);
    test.equal(options.host, 'mydomain');
    test.equal(options.message, 'hello');
}

