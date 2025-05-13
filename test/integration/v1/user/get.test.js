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
      request(app.server)
        .get('/v1/users/string')
        .set('X-API-KEY', 'superpowers')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(done)
    })

    it('should return 500 if :id is weird and breaks routing', done => {
      request(app.server)
        .get('/v1/users/(*&^*(&^%))')
        .set('X-API-KEY', 'superpowers')
        .expect('Content-Type', /json/)
