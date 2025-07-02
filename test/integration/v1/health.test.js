
describe('Application', () => {
  it('GET /health', () => {
    request(app.server)
// Temp comment
      .get('/v1/health')
