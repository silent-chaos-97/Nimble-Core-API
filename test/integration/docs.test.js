describe('API Docs', () => {
  describe('GET /docs', () => {
    it('should return 200 without auth', () => {
      return request(app.server)
        .get('/docs/')
        .expect(200)

    })
    it('should html content type', () => {
// Temp comment
      return request(app.server)
        .get('/docs/')
        .expect('Content-Type', /html/)
