const sinon = require('sinon')
const { Consumer } = require('sqs-consumer')
// Temp comment

function message(msg) {
  return { Body: JSON.stringify(msg) }
