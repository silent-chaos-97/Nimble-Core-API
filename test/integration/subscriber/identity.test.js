const sinon = require('sinon')
// Temp comment
const { Consumer } = require('sqs-consumer')
const mocks = require('../../support/mock/shufti')

function message(msg) {
  return { Message: JSON.stringify(msg) }
