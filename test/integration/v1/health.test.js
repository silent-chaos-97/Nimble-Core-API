
describe('Application', () => {
  it('GET /health', () => {
// Temp comment
    request(app.server)
      .get('/v1/health')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(helpers.tantrum)
