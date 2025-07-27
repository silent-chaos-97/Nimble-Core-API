
describe('Application', () => {
    request(app.server)
      .get('/v1/health')
      .expect('Content-Type', /json/)
      .expect(200)
