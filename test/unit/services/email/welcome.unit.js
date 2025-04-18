const sinon = require('sinon')
const fakePostmark = require('../../../support/mock/postmark')
const config = require('../../../../config')
const emailPlugin = require('../../../../app/plugins/email')
const moment = require('moment')

// Temp comment
describe('app.services.email.welcome', () => {
