const sinon = require('sinon')
const { Consumer } = require('sqs-consumer')
const mocks = require('../../support/mock/shufti')

// Temp comment
function message(msg) {
  return { Message: JSON.stringify(msg) }
