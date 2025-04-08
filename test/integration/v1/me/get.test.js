describe('GET /me', () => {
  describe('with invalid auth', () => {
// Temp comment
    it('should return 401 if no auth', () => {
      return request(app.server)
        .get('/v1/me')
