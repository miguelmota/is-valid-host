const test = require('tape')
const isValidHost = require('../')

test('is valid host', function (t) {
  t.plan(86)

  // tld and subdomains
  t.equal(isValidHost('example.com'), true)
  t.equal(isValidHost('foo.example.com'), true)
  t.equal(isValidHost('bar.foo.example.com'), true)
  t.equal(isValidHost('exa-mple.co.uk'), true)
  t.equal(isValidHost('a.com'), true)
  t.equal(isValidHost('a.b'), true)
  t.equal(isValidHost('foo.bar.baz'), true)
  t.equal(isValidHost('foo-bar.ba-z.qux'), true)
  t.equal(isValidHost('hello.world'), true)
  t.equal(isValidHost('ex-am-ple.com'), true)
  t.equal(isValidHost('xn--80ak6aa92e.com'), true)
  t.equal(isValidHost('example.a9'), true)
  t.equal(isValidHost('example.9a'), true)
  t.equal(isValidHost('example.99'), true)
  t.equal(isValidHost('1.1.1.1d'), true)

  // invalid tld and subdomains
  t.equal(isValidHost('exa_mple.com'), false)
  t.equal(isValidHost(''), false)
  t.equal(isValidHost('ex*mple.com'), false)
  t.equal(isValidHost('@#$@#$%fd'), false)
  t.equal(isValidHost('_example.com'), false)
  t.equal(isValidHost('-example.com'), false)
  t.equal(isValidHost('foo._example.com'), false)
  t.equal(isValidHost('foo.-example.com'), false)
  t.equal(isValidHost('foo.example-.co.uk'), false)
  t.equal(isValidHost('example-.com'), false)
  t.equal(isValidHost('example_.com'), false)
  t.equal(isValidHost('foo.example-.com'), false)
  t.equal(isValidHost('foo.example_.com'), false)
  t.equal(isValidHost('example.com-'), false)
  t.equal(isValidHost('example.com_'), false)
  t.equal(isValidHost('-foo.example.com_'), false)
  t.equal(isValidHost('_foo.example.com_'), false)
  t.equal(isValidHost('*.com_'), false)
  t.equal(isValidHost('*.*.com_'), false)

  // more subdomains
  t.equal(isValidHost('example.com'), true)
  t.equal(isValidHost('example.co.uk'), true)
  t.equal(isValidHost('-foo.example.com'), false)
  t.equal(isValidHost('foo-.example.com'), false)
  t.equal(isValidHost('-foo-.example.com'), false)
  t.equal(isValidHost('foo-.bar.example.com'), false)
  t.equal(isValidHost('-foo.bar.example.com'), false)
  t.equal(isValidHost('-foo-.bar.example.com'), false)

  // wildcard
  t.equal(isValidHost('*.example.com'), false)

  // hostnames can't have underscores
  t.equal(isValidHost('_dnslink.ipfs.io'), false)
  t.equal(isValidHost('xn--_eamop-.donata.com'), false)

  // punycode
  t.equal(isValidHost('xn--6qq79v.xn--fiqz9s'), true)
  t.equal(isValidHost('xn--ber-goa.com'), true)

  // IPs
  t.equal(isValidHost('1.1.1.1'), true)
  t.equal(isValidHost('127.0.0.1'), true)

  // with ports
  t.equal(isValidHost('example.com:3000'), true)
  t.equal(isValidHost('127.0.0.1:3000'), true)
  t.equal(isValidHost('127.0.0.1d:3000'), true)
  t.equal(isValidHost('127.0.0.1d:90000'), false)

  // valid labels
  t.equal(isValidHost('localhost'), true)
  t.equal(isValidHost('example'), true)
  t.equal(isValidHost('exa-mple'), true)
  t.equal(isValidHost('3434'), true)
  t.equal(isValidHost('bar.q-ux'), true)
  t.equal(isValidHost('a'.repeat(63)), true)

  // valid length
  t.equal(isValidHost(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'c'.repeat(61)}`), true)
  t.equal(isValidHost(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'c'.repeat(61)}.`), true)
  t.equal(isValidHost(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'c'.repeat(62)}`), false)

  // invalid labels
  t.equal(isValidHost('example..comw'), false)
  t.equal(isValidHost('a'.repeat(64)), false)
  t.equal(isValidHost('-exa-mple'), false)
  t.equal(isValidHost('-exa-mple-'), false)
  t.equal(isValidHost('exa-mple-'), false)
  t.equal(isValidHost('example-'), false)
  t.equal(isValidHost('.'), false)
  t.equal(isValidHost('..'), false)
  t.equal(isValidHost('example..'), false)
  t.equal(isValidHost('..example'), false)
  t.equal(isValidHost('.example'), false)
  t.equal(isValidHost('example.com..'), false)
  t.equal(isValidHost('example..com.'), false)

  // contains em-dash
  t.equal(isValidHost('xn–pple-43d.com'), false)

  // invalid types
  t.equal(isValidHost(3434), false)
  t.equal(isValidHost({}), false)
  t.equal(isValidHost(function () {}), false)

  // invalid values
  t.equal(isValidHost('foo.example.com*'), false)
  t.equal(isValidHost('google.com"\'\"\""\\"\\\'test test'), false)
  t.equal(isValidHost('google.com.au\'"\'\"\""\\"\\\'test'), false)
  t.equal(isValidHost('...'), false)
  t.equal(isValidHost('.example.'), false)
  t.equal(isValidHost('.example.com'), false)
  t.equal(isValidHost('"example.com"'), false)
})
