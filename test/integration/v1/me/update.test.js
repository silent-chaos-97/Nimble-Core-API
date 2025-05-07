describe('PUT /me', () => {
  let token
  let user10

  function doRequestAndExpect(obj, code, fn) {
    request(app.server)
      .send(obj)
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .expect(code)
      .end(fn)
