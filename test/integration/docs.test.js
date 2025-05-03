describe('API Docs', () => {
    it('should return 200 without auth', () => {
      return request(app.server)
