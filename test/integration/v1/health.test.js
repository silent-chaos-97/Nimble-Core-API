
describe('Application', () => {
  it('GET /health', () => {
    request(app.server)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(helpers.tantrum)
