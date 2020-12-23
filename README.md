# is-valid-host

> Validates if string is a valid host based on [RFC-7230](https://tools.ietf.org/html/rfc7230#section-5.4).

## Demo

[https://lab.miguelmota.com/is-valid-host](https://lab.miguelmota.com/is-valid-host)

## Install

```bash
npm install is-valid-host
```

## Usage

```javascript
const isValidHost = require('is-valid-host')

isValidHost('localhost') // true
isValidHost('127.0.0.1') // true
isValidHost('example.com') // true
isValidHost('foo.example.com') // true
isValidHost('bar.foo.example.com') // true
isValidHost('exa-mple.co.uk') // true
isValidHost('xn--80ak6aa92e.com') // true
isValidHost('example.com:3000') // true
isValidHost('127.0.0.1:3000') // true
isValidHost('exa_mple.com') // false
isValidHost('-example.com') // false
isValidHost('-example.com:3000') // false
```

View more [examples](./test/test.js).

## Test

```bash
npm test
```

## License

[MIT](LICENSE)
