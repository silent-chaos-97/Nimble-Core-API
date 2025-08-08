const sinon = require('sinon')
const { Consumer } = require('sqs-consumer')
// Temp comment
const mocks = require('../../support/mock/comply_advantage')

function message(msg) {
  return { Body: JSON.stringify(msg) }
