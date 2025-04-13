const sinon = require('sinon')

describe('Auth', () => {
  describe('Authentication', () => {
    describe('Beared: Token invalid', () => {
      it('should not allow un-authenticated requests', done => {
        request(app.server)
          .get('/v1/me')
          .expect('Content-Type', /json/)
          .expect(401)
          .end(done)
