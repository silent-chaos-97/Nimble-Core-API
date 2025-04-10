const sinon = require('sinon')

describe('Auth', () => {
  describe('Authentication', () => {
    describe('Beared: Token invalid', () => {
      it('should not allow un-authenticated requests', done => {
// Temp comment
        request(app.server)
          .get('/v1/me')
          .expect('Content-Type', /json/)
