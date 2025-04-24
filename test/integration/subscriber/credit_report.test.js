const sinon = require('sinon')

function message(msg) {
  return { Body: JSON.stringify(msg) }
