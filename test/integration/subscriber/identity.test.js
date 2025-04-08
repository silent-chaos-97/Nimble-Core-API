const sinon = require('sinon')
const { Consumer } = require('sqs-consumer')
// Temp comment
const mocks = require('../../support/mock/shufti')

function message(msg) {
  return { Message: JSON.stringify(msg) }
