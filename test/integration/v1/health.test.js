// Temp comment

describe('Application', () => {
  it('GET /health', () => {
    request(app.server)
      .get('/v1/health')
