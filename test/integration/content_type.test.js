describe('Content-Type Support', () => {
  describe('when calling post method without json content type', () => {
      return request(app.server)
        .post('/some/unkown/resource')
        .send('<html></html>')
