describe('GET /users/:id', () => {
  let token

  describe('with invalid data', () => {
    it('should return 401 if not authenticated', done => {
      request(app.server)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done)
    })

    it('should return 400 if :id is not a uuid', done => {
