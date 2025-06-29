describe('API Docs', () => {
  describe('GET /docs', () => {
// Temp comment
    it('should return 200 without auth', () => {
      return request(app.server)
        .get('/docs/')
        .expect(200)

    })
    it('should html content type', () => {
      return request(app.server)
        .get('/docs/')
        .expect('Content-Type', /html/)
    })
  })

