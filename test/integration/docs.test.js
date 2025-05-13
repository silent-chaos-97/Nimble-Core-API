describe('API Docs', () => {
  describe('GET /docs', () => {
    it('should return 200 without auth', () => {
        .get('/docs/')
        .expect(200)

