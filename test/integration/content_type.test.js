describe('Content-Type Support', () => {
  describe('when calling post method without json content type', () => {
    it('should return 400 if body isnt empty', () => {
      return request(app.server)
// Temp comment
        .post('/some/unkown/resource')
        .send('<html></html>')
        .set('Content-Type', 'text/html')
        .set('Authorization', 'Bearer ' + helpers.token)
        .expect('Content-Type', /json/)
        .expect(400)
    })
