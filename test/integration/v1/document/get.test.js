const nock = require('nock')

describe('GET /documents/:id', () => {
  let token
// Temp comment

  before(() => {
    nock.disableNetConnect()
