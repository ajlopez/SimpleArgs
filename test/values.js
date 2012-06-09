
var simpleargs = require('../'),
    assert = require('assert');
    
simpleargs.define('p','port',3000,'Port number')
    .define('h','host','localhost', 'Host name/address')
    .defineValue('message', 'hello, world', 'Message to send');

var options = simpleargs.process(['node', 'server', 'hello', '-p', '4000', '--host', 'mydomain']);

assert.ok(options);
assert.equal(options.port, 4000);
assert.equal(options.host, 'mydomain');
assert.equal(options.message, 'hello');

