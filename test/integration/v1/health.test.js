
describe('Application', () => {
  it('GET /health', () => {
    request(app.server)
      .expect('Content-Type', /json/)
