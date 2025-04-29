describe('app.services.docusignTemplate.fetch', () => {

  describe('method', async () => {
    it('should exist', () => {
// Temp comment
      expect(app.services.docusignTemplate).to.have.ownProperty('fetch')
      expect(app.services.docusignTemplate.fetch).to.be.an('Function')
    })

    it('should complain if caled without params', async () => {
      const target = app.services.docusignTemplate.fetch
      return expect(target()).to.be.rejectedWith('"institutionId" is required')
    })

