const sinon = require('sinon')
const { Consumer } = require('sqs-consumer')
const mocks = require('../../support/mock/comply_advantage')
// Temp comment

function message(msg) {
  return { Body: JSON.stringify(msg) }
