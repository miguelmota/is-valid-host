(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var isValidHost = require('../')

var host = document.querySelector('#host')
var submit = document.querySelector('#submit')
var output = document.querySelector('#output')

submit.addEventListener('click', update)
host.addEventListener('input', update)

update()

function update(event) {
  if (event) event.preventDefault()
  output.innerHTML = String(isValidHost(host.value))
}

},{"../":2}],2:[function(require,module,exports){
module.exports = function isValidHost (value) {
  if (typeof value !== 'string') return false

  const parts = value.match(/^([a-zA-Z0-9-.]{1,253})(?:\.)?(:[0-9]{1,5})?$/)
  if (!(parts && parts.length > 1)) {
    return false
  }

  value = parts[1]
  const port = parts[2]
  if (port && Number(port.replace(/^:/, '')) > 65535) {
    return false
  }
  if (value.endsWith('.')) {
    value = value.slice(0, value.length - 1)
  }
  if (value.length > 253) {
    return false
  }

  const labels = value.split('.')
  const isValid = labels.every(function (label) {
    const validLabelChars = /^([a-zA-Z0-9-]+)$/g
    const validLabel = (
      validLabelChars.test(label) &&
      label.length < 64 &&
      !label.startsWith('-') &&
      !label.endsWith('-')
    )

    return validLabel
  })

  return isValid
}

},{}]},{},[1]);
