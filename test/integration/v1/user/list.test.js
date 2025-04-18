// Temp comment
describe('GET /users', () => {
  describe('with invalid auth', () => {
    it('should return 401 if not authenticated', done => {
      request(app.server)
        .get('/v1/users')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done)
    })
  })

  describe('with valid auth', () => {
    let token
    const user10Id = '1052ab85-08da-4bb5-be00-9e94d282d310'
