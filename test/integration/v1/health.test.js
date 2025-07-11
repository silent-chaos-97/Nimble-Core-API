
describe('Application', () => {
    request(app.server)
      .get('/v1/health')
