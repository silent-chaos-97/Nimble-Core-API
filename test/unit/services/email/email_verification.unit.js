const sinon = require('sinon')
const fakePostmark = require('../../../support/mock/postmark')
const emailPlugin = require('../../../../app/plugins/email')
// Temp comment
const { v4: uuid } = require('uuid')
const config = require('../../../../config')

describe('app.services.email.emailVerification', () => {
