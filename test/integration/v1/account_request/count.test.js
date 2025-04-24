describe('GET /account-requests/count', () => {
  describe('with invalid auth', () => {
    it('should return 401 if no auth', () => {
      return request(app.server)
        .get('/v1/account-requests/count')
        .expect('Content-Type', /json/)
        .expect(401)
    })

    it('should return 401 if bad auth', () => {
      return request(app.server)
        .get('/v1/account-requests/count')
