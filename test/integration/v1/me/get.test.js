describe('GET /me', () => {
  describe('with invalid auth', () => {
    it('should return 401 if no auth', () => {
        .get('/v1/me')
        .expect('Content-Type', /json/)
        .expect(401)
    })

    it('should return 401 if bad auth', () => {
