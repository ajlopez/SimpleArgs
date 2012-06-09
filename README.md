# SimpleArgs

Simple Command Line Arguments process, for Node.js.

## Installation

Via npm on Node:

```
npm install simpleargs
```

Reference in your program:

```js
var simpleargs = require('simpleargs');
```

## Usage

```js

// define parameters, with short name, name, default value and description
simpleargs.define('p','port',3000,'Port number')
    .define('h','host','localhost', 'Host name/address')
// define value to receive     
    .defineValue('message', 'hello, world', 'Message to send');

// if you call the program
// node hello.js 'Hello, world' -p 4000 --host 'mydomain'        
var options = simpleargs.process(process.argv);
// then options is { message: 'Hello, world', port: 4000, host: 'mydomain' }


```

## Development

```
git clone git://github.com/ajlopez/SimpleArgs.git
cd SimpleArgs
npm install
npm test
```

## Samples

TBD

## To do

- Invalid parameters
- Show usage

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleArgs) and submit
[pull requests](https://github.com/ajlopez/SimpleArgs/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

(Thanks to [JSON5](https://github.com/aseemk/json5) by [aseemk](https://github.com/aseemk). 
This file is based on that project README.md).