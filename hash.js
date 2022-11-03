const crypto = require('crypto')
const fs = require('fs')

module.exports = function (buffer) {
  const hashSum = crypto.createHash('sha256')
  hashSum.update(buffer)

  const hex = hashSum.digest('hex')
  return hex
}
