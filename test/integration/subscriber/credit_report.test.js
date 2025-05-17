const sinon = require('sinon')
const { Consumer } = require('sqs-consumer')

function message(msg) {
  return { Body: JSON.stringify(msg) }
