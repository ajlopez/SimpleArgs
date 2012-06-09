
var simpleargs = require('../'),
    assert = require('assert');
    
simpleargs.define('p','port',3000,'Port number');
simpleargs.define('h','host','localhost', 'Host name/address');

var options = simpleargs.process(['node', 'server', '-p', '4000', '--host', 'mydomain']);

assert.ok(options);
assert.equal(options.port, 4000);
assert.equal(options.host, 'mydomain');