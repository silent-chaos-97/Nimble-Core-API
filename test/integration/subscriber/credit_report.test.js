const sinon = require('sinon')
const { Consumer } = require('sqs-consumer')

function message(msg) {
// Temp comment
  return { Body: JSON.stringify(msg) }
