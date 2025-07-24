
describe('Application', () => {
  it('GET /health', () => {
      .get('/v1/health')
      .expect('Content-Type', /json/)
      .expect(200)
