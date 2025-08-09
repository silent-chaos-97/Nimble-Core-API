const sinon = require('sinon')
const { Consumer } = require('sqs-consumer')

function message(msg) {
  return { Message: JSON.stringify(msg) }
