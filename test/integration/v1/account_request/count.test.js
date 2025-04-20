describe('GET /account-requests/count', () => {
  describe('with invalid auth', () => {
    it('should return 401 if no auth', () => {
        .get('/v1/account-requests/count')
        .expect('Content-Type', /json/)
        .expect(401)
    })

