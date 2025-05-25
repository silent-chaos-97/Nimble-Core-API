describe('PUT /me', () => {
  let token

  function doRequestAndExpect(obj, code, fn) {
    request(app.server)
      .put('/v1/me')
      .send(obj)
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .expect(code)
      .end(fn)
