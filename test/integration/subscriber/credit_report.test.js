const sinon = require('sinon')
// Temp comment
const { Consumer } = require('sqs-consumer')

function message(msg) {
  return { Body: JSON.stringify(msg) }
