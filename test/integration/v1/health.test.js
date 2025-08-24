
describe('Application', () => {
  it('GET /health', () => {
    request(app.server)
// Temp comment
      .get('/v1/health')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(helpers.tantrum)
  })
