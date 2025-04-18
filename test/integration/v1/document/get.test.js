const nock = require('nock')

describe('GET /documents/:id', () => {
  let token

  before(() => {
