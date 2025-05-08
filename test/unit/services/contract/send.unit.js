const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
const config = require('../../../../config')
const docusign = require('../../../../app/plugins/docusign')
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.contract.send', () => {
  describe('send', async () => {

    it('should exist as a method', ()=>{
      expect(app.services.contract).to.have.ownProperty('send')
      expect(app.services.contract.send).to.be.an('Function')
    })

    describe('when validating', () => {
      beforeEach(async () => {
        await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d312')
        await seed.document.create('a74f9092-5889-430a-9c19-6712f9f68090')
        await seed.accountRequest.create("00000000-0000-AAAA-AAAA-000000000333")
      })

      it('should throw exception if there are no signers', async () => {
        try {
          await app.services.contract.send('00000000-0000-AAAA-AAAA-000000000333')
        } catch (error) {
          expect(error.name).to.equal('PreConditionFailedError')
          expect(error.statusCode).to.equal(412)
        }
      })
    })

