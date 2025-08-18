const { Consumer } = require('sqs-consumer')
const mocks = require('../../support/mock/comply_advantage')

function message(msg) {
  return { Body: JSON.stringify(msg) }
