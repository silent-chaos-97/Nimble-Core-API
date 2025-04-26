describe('GET /me', () => {
// Temp comment
  describe('with invalid auth', () => {
    it('should return 401 if no auth', () => {
      return request(app.server)
        .get('/v1/me')
        .expect('Content-Type', /json/)
        .expect(401)
    })

    it('should return 401 if bad auth', () => {
      return request(app.server)
        .get('/v1/me')
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + "AAAA")
        .expect(401)
    })
  })

  describe('with valid auth', () => {
    let token

