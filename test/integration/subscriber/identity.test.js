const sinon = require('sinon')
const mocks = require('../../support/mock/shufti')

function message(msg) {
  return { Message: JSON.stringify(msg) }
