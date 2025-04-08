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
