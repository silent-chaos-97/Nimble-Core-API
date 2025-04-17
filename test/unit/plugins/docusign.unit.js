const axios = require('axios')
const nock = require('nock')
const config = require('../../../config')
axios.defaults.adapter = require('axios/lib/adapters/http')
const jwt = require('../../../app/plugins/jwt')

const docusign = require('../../../app/plugins/docusign')
const mocks = require('../../support/mock/docusign')

describe('Docusign', () => {
  describe('Class', () => {
    it('should exist', () => {
      expect(docusign).not.to.be.undefined
    })

    it('should be mockable', () => {
      expect(docusign.constructor).not.to.be.undefined
      expect(docusign).not.to.be.undefined
    })
  })

  describe('Instance', () => {

    beforeEach(async () => {
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
      await seed.docusignTemplate.create()

      const docusignTemplateIds = await app.services.docusignTemplate.fetch({ institutionId: "2552ab85-08da-4bb5-be00-9e94d282d311", version: 1 })
      docusign.setDocusignTemplates(docusignTemplateIds)
    })

    describe('sendEnvelopeWithMultipleDocuments', () => {
      beforeEach(() => {
        nock.disableNetConnect()
        nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
      })

      afterEach(() => { nock.cleanAll() })

      it('should return a template', async () => {
        // get sign in
        const scope0 = nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(200, mocks.mockToken)

        // mock template
        const scope1 = nock(config.get('docusign').basePath)
          .get(`/v2.1/accounts/${config.get('docusign').accountID}/templates/${docusign.docusignTemplates.AccountApplication}/documents/1/tabs`)
          .reply(200, mocks.mockDocumentTabs)

        const scope2 = nock(config.get('docusign').basePath)
          .post(`/v2.1/accounts/${config.get('docusign').accountID}/envelopes`)
          .reply(200, mocks.mockCreateEnvelope)


        const args ={
          accountRequestId: 'string',
          signers: [mocks.validUser],
          accountOptions: mocks.accountOptions,
          ccRecipient: {
            fullName: 'Some dude Specimen',
            email: 'psousa+1@wearesingular.com',
          }
        }
        const result = await docusign.sendEnvelopeWithMultipleDocuments(args)

        expect(result).not.to.be.undefined
