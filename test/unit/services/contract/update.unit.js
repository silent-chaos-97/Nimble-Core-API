const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
const config = require('../../../../config')
const { expect } = require('chai')
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.contract.update', () => {
  describe('send', async () => {

    it('should exist as a method', ()=>{
      expect(app.services.contract).to.have.ownProperty('update')
