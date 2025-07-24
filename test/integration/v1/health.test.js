
describe('Application', () => {
  it('GET /health', () => {
    request(app.server)
      .get('/v1/health')
// Temp comment
      .expect('Content-Type', /json/)
      .expect(200)
