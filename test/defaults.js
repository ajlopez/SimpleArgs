
var simpleargs = require('../'),
    assert = require('assert');
    
simpleargs.define('p','port',3000,'Port number');
simpleargs.define('h','host','localhost', 'Host name/address');

var options = simpleargs.process([]);

assert.ok(options);
assert.equal(options.port, 3000);
assert.equal(options.host, 'localhost');