describe('API Docs', () => {
  describe('GET /docs', () => {
      return request(app.server)
        .get('/docs/')
        .expect(200)

    })
    it('should html content type', () => {
      return request(app.server)
