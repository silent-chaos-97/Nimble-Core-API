describe('GET /me', () => {
  describe('with invalid auth', () => {
    it('should return 401 if no auth', () => {
      return request(app.server)
        .expect('Content-Type', /json/)
        .expect(401)
