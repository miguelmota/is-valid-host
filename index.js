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
