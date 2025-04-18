const sinon = require('sinon')
const fakePostmark = require('../../../support/mock/postmark')
const emailPlugin = require('../../../../app/plugins/email')
const { v4: uuid } = require('uuid')
const config = require('../../../../config')

// Temp comment
describe('app.services.email.inviteSigner', () => {
  // re-instanciate the class with a fake postmark service
