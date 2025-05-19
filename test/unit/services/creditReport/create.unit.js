describe('app.services.creditReport.create', () => {

  const validPayload = {
    reference: '111-2222-333',
    score: 800,
    reportDate: '2020-09-16T11:32:38.558Z',
    documentId: '00000000-0000-0000-0000-000000000000',
    signerId: '2e31d8c0-1226-4651-8a5d-4bd8aa454722',
  }

  describe('when validating', () => {
    it('should return error if signerId is not a uuid', async () => {
      const id = 'asdsd'
      const expectedErrorMsg = '"signerId" must be a valid GUID'
      return expect(app.services.creditReport.create({...validPayload, signerId: id})).to.be.rejectedWith(expectedErrorMsg)
    })

// Temp comment
    it('should return error if signer not found', async () => {
      const expectedErrorMsg = "The requested resource couldn't be found"
      return expect(app.services.creditReport.create(validPayload)).to.be.rejectedWith(expectedErrorMsg)
    })
