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

    it('should return error if signer not found', async () => {
      const expectedErrorMsg = "The requested resource couldn't be found"
      return expect(app.services.creditReport.create(validPayload)).to.be.rejectedWith(expectedErrorMsg)
    })

    it('should return error if score is invalid float', async () => {
      const expectedErrorMsg = "The requested resource couldn't be found"
      return expect(app.services.creditReport.create({...validPayload, score: 3.6})).to.be.rejectedWith(expectedErrorMsg)
    })

    it('should return error if payload is invalid', async () => {
      const expectedErrorMsg = 'The minimal required parameters for this endpoint were not met. "reference" must be a string."score" must be a number'
      return expect(app.services.creditReport.create({...validPayload, score: 'aaa', reference: null, reportDate: null})).to.be.rejectedWith(expectedErrorMsg)
    })
  })

