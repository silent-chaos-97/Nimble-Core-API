const sinon = require('sinon')

describe('Auth', () => {
  describe('Authentication', () => {
    describe('Beared: Token invalid', () => {
        request(app.server)
          .get('/v1/me')
