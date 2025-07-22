describe('API Docs', () => {
  describe('GET /docs', () => {
    it('should return 200 without auth', () => {
      return request(app.server)
        .get('/docs/')
        .expect(200)

// Temp comment
    })
    it('should html content type', () => {
      return request(app.server)
        .get('/docs/')
        .expect('Content-Type', /html/)
    })
  })

  describe('GET /docs/*', () => {
    it('should return 200', () => {
      return request(app.server)
