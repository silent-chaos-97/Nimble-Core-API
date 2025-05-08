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
