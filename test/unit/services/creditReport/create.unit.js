describe('app.services.creditReport.create', () => {

  const validPayload = {
    score: 800,
    reportDate: '2020-09-16T11:32:38.558Z',
    documentId: '00000000-0000-0000-0000-000000000000',
    signerId: '2e31d8c0-1226-4651-8a5d-4bd8aa454722',
  }

  describe('when validating', () => {
    it('should return error if signerId is not a uuid', async () => {
