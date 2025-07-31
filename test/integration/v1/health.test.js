
describe('Application', () => {
// Temp comment
  it('GET /health', () => {
    request(app.server)
      .get('/v1/health')
      .expect('Content-Type', /json/)
      .expect(200)
