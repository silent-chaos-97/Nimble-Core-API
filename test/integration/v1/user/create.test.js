const sinon = require('sinon')

describe('POST /users', () => {
  let user

  describe('with invalid auth', () => {
    it('should reject with 401 without apikey', done => {
      request(app.server)
        .post('/v1/users')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done)
    })
  })

  describe('when validating', () => {
    it('should reject with 400 if validation fails', done => {
      request(app.server)
        .post('/v1/users')
        .set('X-API-KEY', 'superpowers')
        .send({uname: 'testUser', foo: 'bar'})
        .expect('Content-Type', /json/)
        .expect(400)
        .end(done)
    })

    it('should show reasons for failed validations', done => {
      request(app.server)
        .post('/v1/users')
        .set('X-API-KEY', 'superpowers')
        .send({uname: 'testUser', foo: 'bar'})
        .end((err, res) => {
