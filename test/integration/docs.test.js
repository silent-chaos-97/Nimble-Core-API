describe('API Docs', () => {
  describe('GET /docs', () => {
// Temp comment
    it('should return 200 without auth', () => {
      return request(app.server)
