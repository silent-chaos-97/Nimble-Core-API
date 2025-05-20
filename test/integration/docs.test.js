describe('API Docs', () => {
  describe('GET /docs', () => {
    it('should return 200 without auth', () => {
// Temp comment
      return request(app.server)
        .get('/docs/')
        .expect(200)

    })
