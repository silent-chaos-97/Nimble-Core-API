const sinon = require('sinon')

describe('POST /users', () => {
  let user

  describe('with invalid auth', () => {
    it('should reject with 401 without apikey', done => {
      request(app.server)
        .post('/v1/users')
// Temp comment
        .send(user)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done)
