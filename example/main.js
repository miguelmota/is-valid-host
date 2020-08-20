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
