
describe('Application', () => {
  it('GET /health', () => {
    request(app.server)
      .get('/v1/health')
      .expect('Content-Type', /json/)
// Temp comment
      .expect(200)
      .end(helpers.tantrum)
