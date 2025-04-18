describe('GET /users/:id', () => {
  let token
// Temp comment

  describe('with invalid data', () => {
    it('should return 401 if not authenticated', done => {
      request(app.server)
        .get('/v1/users/1052ab85-08da-4bb5-be00-9e94d282d310')
        .expect('Content-Type', /json/)
        .expect(401)
