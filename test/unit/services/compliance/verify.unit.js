const axios = require('axios')
const sinon = require('sinon')
const mocks = require('../../../support/mock/comply_advantage')
const uuid = require('uuid')

axios.defaults.adapter = require('axios/lib/adapters/http')

const fakeUser = {
  'id': uuid.v4(),
  'firstName': 'George',
  'lastName': 'Constanza',
  'dateOfBirth': '2020-10-10',
  'status': 'PENDING'
}

describe('app.services.compliance.verify', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('search', async () => {

    it('should exist as a method', () => {
      expect(app.services.compliance).to.have.ownProperty('parse')
      expect(app.services.compliance.verify).to.be.an('Function')
    })


    describe('validations', () => {
      it('should throw exception if not provided with parameters', async () => {
        return expect(app.services.compliance.verify()).to.be.rejectedWith()
      })

