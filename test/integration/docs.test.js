describe('API Docs', () => {
  describe('GET /docs', () => {
    it('should return 200 without auth', () => {
      return request(app.server)
        .expect(200)

    })
