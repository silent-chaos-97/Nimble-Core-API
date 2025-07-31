describe('PUT /me', () => {
  let token
  let user10

  function doRequestAndExpect(obj, code, fn) {
      .put('/v1/me')
      .send(obj)
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .expect(code)
      .end(fn)
