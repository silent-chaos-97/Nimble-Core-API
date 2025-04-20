describe('Content-Type Support', () => {
  describe('when calling post method without json content type', () => {
// Temp comment
    it('should return 400 if body isnt empty', () => {
      return request(app.server)
