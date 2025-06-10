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
        expect(result.results.envelopeId).to.equal(mocks.mockCreateEnvelope.envelopeId)
        expect(result.results.status).to.equal(mocks.mockCreateEnvelope.status)
        scope0.done()
        scope1.done()
        scope2.done()
      })

      it('should throw when error occurs', async () => {
        const scope = nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(200, mocks.mockToken)

        const scope1 = nock(config.get('docusign').basePath)
          .get(`/v2.1/accounts/${config.get('docusign').accountID}/templates/${docusign.docusignTemplates.AccountApplication}/documents/1/tabs`)
          .reply(500, mocks.mockDocumentTabs)

        const args ={
          accountRequestId: 'string',
          signers: [mocks.validUser],
          accountOptions: mocks.accountOptions,
          ccRecipient: {
            fullName: 'Some dude Specimen',
            email: 'psousa+1@wearesingular.com',
          }
        }

        try {
          await docusign.sendEnvelopeWithMultipleDocuments(args)
        } catch (error) {
          expect(error).to.be.an.instanceof(Error)
        }

        scope.done()
        scope1.done()
      })


      it('should return error with empty signers', async () => {
        const args = {
          accountRequestId: 'string',
          signers: [],
          accountOptions: mocks.accountOptions,
          ccRecipient: {
            fullName: 'Some dude Specimen',
            email: 'psousa+1@wearesingular.com',
          }
        }

        try {
          await docusign.sendEnvelopeWithMultipleDocuments(args)
        } catch (error) {
          expect(error.message).to.equal("Cannot send envelope without signers.")
          expect(error).to.be.an.instanceof(Error)
        }
      })

      it('should return error with empty options', async () => {
        const args ={
          accountRequestId: 'string',
          signers: [mocks.validUser],
          accountOptions: null,
          ccRecipient: {
            fullName: 'Some dude Specimen',
            email: 'psousa+1@wearesingular.com',
          }
        }

        try {
          await docusign.sendEnvelopeWithMultipleDocuments(args)
        } catch (error) {
          expect(error.message).to.equal("Cannot send envelope without options.")
          expect(error).to.be.an.instanceof(Error)
        }
      })

      it('should return error with more than 4 signers', async () => {
        const args ={
          accountRequestId: 'string',
          signers: [mocks.validUser, mocks.validUser, mocks.validUser, mocks.validUser, mocks.validUser],
          accountOptions: mocks.accountOptions,
          ccRecipient: {
            fullName: 'Some dude Specimen',
            email: 'psousa+1@wearesingular.com',
          }
        }

        try {
          await docusign.sendEnvelopeWithMultipleDocuments(args)
        } catch (error) {
          expect(error.message).to.equal("A document only accepts 4 signers max.")
          expect(error).to.be.an.instanceof(Error)
        }
      })

      it('should return error with no opening amount', async () => {
        const args ={
          accountRequestId: 'string',
          signers: [mocks.validUser],
          accountOptions: {...mocks.accountOptions, openingAmount: ''},
          ccRecipient: {
            fullName: 'Some dude Specimen',
            email: 'psousa+1@wearesingular.com',
          }
        }

        try {
          await docusign.sendEnvelopeWithMultipleDocuments(args)
        } catch (error) {
          expect(error.message).to.equal("Expecting a number for initial Deposit.")
          expect(error).to.be.an.instanceof(Error)
        }
      })

      it('should return error with no products', async () => {
        const args ={
          accountRequestId: 'string',
          signers: [mocks.validUser],
          accountOptions: {...mocks.accountOptions, productConfigurations: []},
          ccRecipient: {
            fullName: 'Some dude Specimen',
            email: 'psousa+1@wearesingular.com',
          }
        }

        try {
          await docusign.sendEnvelopeWithMultipleDocuments(args)
        } catch (error) {
          expect(error.message).to.equal("Cannot send envelope without products.")
          expect(error).to.be.an.instanceof(Error)
        }
      })

      it('should return error with no account request id', async () => {
        const args ={
          signers: [mocks.validUser],
          accountOptions: mocks.accountOptions,
          ccRecipient: {
            fullName: 'Some dude Specimen',
            email: 'psousa+1@wearesingular.com',
          }
        }

        try {
          await docusign.sendEnvelopeWithMultipleDocuments(args)
        } catch (error) {
          expect(error.message).to.equal("Cannot send envelope without accountRequestId.")
          expect(error).to.be.an.instanceof(Error)
        }
      })

      it('should return error if no template are set', async () => {
        docusign.setDocusignTemplates({})

        const args ={
          accountRequestId: 'string',
          signers: [mocks.validUser],
          accountOptions: mocks.accountOptions,
          ccRecipient: {
            fullName: 'Some dude Specimen',
            email: 'psousa+1@wearesingular.com',
          }
        }

        try {
          await docusign.sendEnvelopeWithMultipleDocuments(args)
        } catch (error) {
          expect(error.message).to.equal("Missing templates")
          expect(error).to.be.an.instanceof(Error)
        }
      })
    })

    describe('buildSavingsTemplate', () => {
      beforeEach(() => {
        nock.disableNetConnect()
        nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
      })

      afterEach(() => { nock.cleanAll() })

      it('should return a valid template', async () => {
        let scope = nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(200, mocks.mockToken)
        await docusign._setDocusignAuthorizationAndSetHeader()
        scope.done()

        scope = nock(config.get('docusign').basePath)
          .get(`/v2.1/accounts/${config.get('docusign').accountID}/templates/${docusign.docusignTemplates.AccountApplication}/documents/1/tabs`)
          .reply(200, mocks.mockDocumentTabs)

        const ccRecipient = {
          fullName: 'Some dude Specimen',
          email: 'psousa+1@wearesingular.com',
        }

        const result = await docusign.buildSavingsTemplate([mocks.validUser], mocks.accountOptions, ccRecipient, docusign.docusignTemplates.AccountApplication)

        expect(result).not.to.be.undefined
        expect(result.compositeTemplateId).to.equal(mocks.mockCompositeTemplate.compositeTemplateId)

        scope.done()
      })

      it('should return a template with a list of signers', async () => {
        let scope = nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(200, mocks.mockToken)
        await docusign._setDocusignAuthorizationAndSetHeader()
        scope.done()

        scope = nock(config.get('docusign').basePath)
          .get(`/v2.1/accounts/${config.get('docusign').accountID}/templates/${docusign.docusignTemplates.AccountApplication}/documents/1/tabs`)
          .reply(200, mocks.mockDocumentTabs)

        const ccRecipient = {
          fullName: 'Some dude Specimen',
          email: 'psousa+1@wearesingular.com',
        }

        const result = await docusign.buildSavingsTemplate([mocks.validUser, mocks.validUser], mocks.accountOptions, ccRecipient, docusign.docusignTemplates.AccountApplication)

        expect(result).not.to.be.undefined
        expect(result.inlineTemplates[0].recipients.signers.length).to.equal(2)

        scope.done()
      })
    })

    describe('getEnvelopeById', () => {
      beforeEach(() => {
        nock.disableNetConnect()
        nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
      })

      afterEach(() => { nock.cleanAll() })

      it('should return a envelope', async () => {
        const scope1 = nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(200, mocks.mockToken)
        const scope2 = nock(app.config.get('docusign').basePath)
          .get(`/v2.1/accounts/8872016/envelopes/5d715751-e027-45e4-884b-99bb85c357dc?include=recipients`)
          .reply(200, mocks.webhookRequest)

        const result = await docusign.getEnvelopeById('5d715751-e027-45e4-884b-99bb85c357dc')

        expect(result).not.to.be.undefined
        expect(result.envelopeId).to.equal('5d715751-e027-45e4-884b-99bb85c357dc')

        scope1.done()
        scope2.done()
      })

      it('should throw when error occurs', async () => {
        let scope = nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(200, mocks.mockToken)

        scope = nock(app.config.get('docusign').basePath)
          .get(`/v2.1/accounts/8872016/envelopes/5d715751-e027-45e4-884b-99bb85c357dc?include=recipients`)
          .reply(500, mocks.webhookRequest)

        try {
          await docusign.getEnvelopeById('5d715751-e027-45e4-884b-99bb85c357dc')
        } catch (error) {
          expect(error).to.be.an.instanceof(Error)
        }
        scope.done()
      })

      it('should throw when authentication fails', async () => {
        const scope = nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(500, mocks.mockToken)

        try {
          await docusign.getEnvelopeById('5d715751-e027-45e4-884b-99bb85c357dc')
        } catch (error) {
          expect(error).to.be.an.instanceof(Error)
        }
        scope.done()
      })
    })

    describe('getCombinedPDFById', () => {
      beforeEach(() => {
        nock.disableNetConnect()
      })

      afterEach(() => { nock.cleanAll() })

      it('should return a pdf', async () => {
        const scope1 = nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(200, mocks.mockToken)

        const scope2 = nock(config.get('docusign').basePath)
          .get('/v2.1/accounts/8872016/envelopes/xxx/documents/combined')
          .reply(200, 'ok')

        const result = await docusign.getCombinedPDFById('xxx')

        expect(result).not.to.be.undefined

        scope1.done()
        scope2.done()
      })

      it('should throw when error occurs', async () => {
        let scope = nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(200, mocks.mockToken)

        scope = nock(config.get('docusign').basePath)
          .get('/v2.1/accounts/8872016/envelopes/5d715751-e027-45e4-884b-99bb85c357dc/documents/combined')
          .reply(500, 'ok')

        try {
          await docusign.getCombinedPDFById('5d715751-e027-45e4-884b-99bb85c357dc')
        } catch (error) {
          expect(error).to.be.an.instanceof(Error)
        }
        scope.done()
      })

      it('should throw when authentication fails', async () => {
        const scope = nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(500, mocks.mockToken)

        try {
          await docusign.getCombinedPDFById('5d715751-e027-45e4-884b-99bb85c357dc')
        } catch (error) {
          expect(error).to.be.an.instanceof(Error)
        }
        scope.done()
      })
    })

    describe('createRecipientView', () => {
      beforeEach(() => {
        nock.disableNetConnect()
        nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
      })

      afterEach(() => { nock.cleanAll() })

      describe('with success', () => {
        beforeEach(() => {
          nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(200, mocks.mockToken)

          nock(app.config.get('docusign').basePath)
            .post(`/v2.1/accounts/8872016/envelopes/5d715751-e027-45e4-884b-99bb85c357dc/views/recipient`)
            .reply(200, mocks.mockCreateRecipientViewSuccess)
        })

        it('should return a url for embedding', async () => {
          const result = await docusign.createRecipientView('5d715751-e027-45e4-884b-99bb85c357dc', mocks.validUser, mocks.accountOptions.institutionDomain)

          expect(result).not.to.be.undefined
          expect(result).to.equal(mocks.mockCreateRecipientViewSuccess.url)
        })
      })

      describe('with error', () => {
        it('should throw when error occurs', async () => {
          nock("https://" + config.get('docusign').oauthPath).post('/oauth/token').reply(200, mocks.mockToken)

          nock(app.config.get('docusign').basePath)
            .post(`/v2.1/accounts/8872016/envelopes/5d715751-e027-45e4-884b-99bb85c357dc/views/recipient`)
            .reply(404, mocks.mockCreateRecipientViewError)

          try {
            await docusign.createRecipientView('5d715751-e027-45e4-884b-99bb85c357dc', mocks.validUser, mocks.accountOptions.institutionDomain)
          } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("Not Found")
            expect(error.response.body.message).to.equal(mocks.mockCreateRecipientViewError.message)
          }
        })

        it('should throw envelopeId is missing', async () => {
