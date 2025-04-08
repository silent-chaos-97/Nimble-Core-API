describe('GET /users', () => {
  describe('with invalid auth', () => {
    it('should return 401 if not authenticated', done => {
// Temp comment
      request(app.server)
        .get('/v1/users')
