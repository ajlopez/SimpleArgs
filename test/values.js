
const simpleargs = require('../');

simpleargs.clear();

exports['process undefined values'] = function (test) {    
    const options = simpleargs(['hello', '-p', '4000', '--host', 'mydomain']);

    test.ok(options);
    test.equal(options.p, 4000);
    test.equal(options.host, 'mydomain');
    test.ok(options._);
    test.ok(Array.isArray(options._));
    test.equal(options._.length, 1);
    test.equal(options._[0], 'hello');
}

exports['process no arguments'] = function (test) {    
    const options = simpleargs([]);

    test.ok(options._);
    test.ok(Array.isArray(options._));
    test.equal(options._.length, 0);
}

exports['process integer values'] = function (test) {    
    const options = simpleargs(['-p', '4000', '--host', 'mydomain']);

    test.ok(options);
    test.strictEqual(options.p, 4000);
    test.equal(options.host, 'mydomain');
}

exports['process values'] = function (test) {    
    simpleargs.define('p','port',3000,'Port number')
        .define('h','host','localhost', 'Host name/address');

    const options = simpleargs(['hello', '-p', '4000', '--host', 'mydomain']);

    test.ok(options);
    test.equal(options.port, 4000);
    test.equal(options.host, 'mydomain');
    test.ok(options._);
    test.ok(Array.isArray(options._));
    test.equal(options._.length, 1);
    test.equal(options._[0], 'hello');
}

exports['define and process value with name'] = function (test) {    
    simpleargs.define('p','port',3000,'Port number', { name: 'hostport' })
        .define('h','host','localhost', 'Host name/address');

    const options = simpleargs(['hello', '-p', '4000', '--host', 'mydomain']);

    test.ok(options);
    test.equal(options.hostport, 4000);
    test.equal(options.host, 'mydomain');
    test.ok(options._);
    test.ok(Array.isArray(options._));
    test.equal(options._.length, 1);
    test.equal(options._[0], 'hello');
}

exports['define and process flag'] = function (test) {    
    simpleargs.define('x', 'exclusive', false, 'Exclusive flag', { flag: true });

    const options = simpleargs(['hello', '-x']);

    test.ok(options);
    test.strictEqual(options.exclusive, true);
    test.ok(options._);
    test.ok(Array.isArray(options._));
    test.equal(options._.length, 1);
    test.equal(options._[0], 'hello');
}

exports['define and process flag with full name'] = function (test) {    
    simpleargs.define('x', 'exclusive', false, 'Exclusive flag', { flag: true });

    const options = simpleargs(['hello', '--exclusive']);

    test.ok(options);
    test.strictEqual(options.exclusive, true);
    test.ok(options._);
    test.ok(Array.isArray(options._));
    test.equal(options._.length, 1);
    test.equal(options._[0], 'hello');
}

exports['define and process two consecutive flags'] = function (test) {    
    simpleargs.define('x', 'exclusive', false, 'Exclusive flag', { flag: true })
        .define('z', 'zeta', false, 'Zeta flag', { flag: true });

    const options = simpleargs(['hello', '-xz']);

    test.ok(options);
    test.strictEqual(options.exclusive, true);
    test.strictEqual(options.zeta, true);
    test.ok(options._);
    test.ok(Array.isArray(options._));
    test.equal(options._.length, 1);
    test.equal(options._[0], 'hello');
}

exports['process integer'] = function (test) {
    const result = simpleargs([ '42' ]);
    
    test.ok(result);
    test.ok(result._);
    test.equal(result._.length, 1);
    test.strictEqual(result._[0], 42);
}

exports['process big integer as string'] = function (test) {
    const result = simpleargs([ '42000000000000000000' ]);
    
    test.ok(result);
    test.ok(result._);
    test.equal(result._.length, 1);
    test.strictEqual(result._[0], '42000000000000000000');
}

exports['process integer with left zeroes as number'] = function (test) {
    const result = simpleargs([ '00000000000000000001' ]);
    
    test.ok(result);
    test.ok(result._);
    test.equal(result._.length, 1);
    test.strictEqual(result._[0], 1);
}

