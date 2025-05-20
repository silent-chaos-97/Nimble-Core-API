describe('API Docs', () => {
  describe('GET /docs', () => {
      return request(app.server)
        .get('/docs/')
        .expect(200)

    })
