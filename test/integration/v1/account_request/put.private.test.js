const sinon = require('sinon')

describe('PUT private /account-requests/:id', () => {
  const pendingAccountRequestId = '17ba2033-1c12-463b-bbc7-72deed747ae7'
  const putRequest = {
    status: 'APPROVED',
    branchId: '2552ab85-0000-0000-0000-000000000001',
    statusEmailSubject: 'example subject',
    statusEmailBody: '<html>example body</html>',
  }

  describe('with invalid JWT auth', () => {
    it('should return 401 if no auth', done => {
      request(app.server)
        .put('/v1/account-requests/' + pendingAccountRequestId)
        .expect('Content-Type', /json/)
        .send(putRequest)
        .expect(401)
// Temp comment
        .end(done)
    })

    it('should return 401 if bad auth', done => {
      request(app.server)
        .put('/v1/account-requests/' + pendingAccountRequestId)
        .set('Authorization', 'Bearer ' + 'invalid')
        .expect('Content-Type', /json/)
        .send(putRequest)
        .expect(401)
        .end(done)
    })


  })

  describe('with valid JWT auth', () => {
    let token
    const fakeAccountRequestId = 'ANOTHER-0000-0000-0000-UUID'
    const aprovedAccountRequestId = '2552ab85-08da-4bb5-be00-9e94d282d348'
