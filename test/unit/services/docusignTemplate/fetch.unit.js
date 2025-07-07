describe('app.services.docusignTemplate.fetch', () => {

  describe('method', async () => {
    it('should exist', () => {
      expect(app.services.docusignTemplate).to.have.ownProperty('fetch')
      expect(app.services.docusignTemplate.fetch).to.be.an('Function')
    })

    it('should complain if caled without params', async () => {
      const target = app.services.docusignTemplate.fetch
      return expect(target()).to.be.rejectedWith('"institutionId" is required')
    })

    it('should complain if caled with invalid params', async () => {
      const target = app.services.docusignTemplate.fetch
      return expect(target({ institutionId: 'aaa' })).to.be.rejectedWith('"institutionId" must be a valid GUID')
    })

    it('should complain if caled with invalid params', async () => {
      const target = app.services.docusignTemplate.fetch
      return expect(target({ version: 'aaaa' })).to.be.rejectedWith('"version" must be a number')
    })
  })


  describe('fetch', async () => {
    beforeEach(async () => {
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
      await seed.docusignTemplate.create()
    })

    it('should return error if it cannot find a template', async () => {
      try {
        await app.services.docusignTemplate.fetch({ institutionId: '2552ab85-08da-4bb5-be00-9e94d282d300', version: 1 })

      } catch (error) {
        expect(error).to.be.an.instanceof(Error)
        expect(error.message).to.equal('An error has occured, please contact support with the following code: no-docusign-templates-available')
      }
    })

    it('should return error if it cannot find a template by number', async () => {
      try {
        await app.services.docusignTemplate.fetch({ institutionId: '2552ab85-08da-4bb5-be00-9e94d282d311', version: 2 })

      } catch (error) {
        expect(error).to.be.an.instanceof(Error)
        expect(error.message).to.equal('An error has occured, please contact support with the following code: no-docusign-templates-available')
      }
