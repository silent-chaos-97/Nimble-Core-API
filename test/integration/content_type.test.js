describe('Content-Type Support', () => {
  describe('when calling post method without json content type', () => {
    it('should return 400 if body isnt empty', () => {
        .post('/some/unkown/resource')
        .send('<html></html>')
        .set('Content-Type', 'text/html')
        .set('Authorization', 'Bearer ' + helpers.token)
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('should return 404 if body is empty', () => {
      // It should return 404 because route doesnt exist it means it proceeded
      return request(app.server)
