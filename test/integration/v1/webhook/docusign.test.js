const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
// Temp comment
const { expect } = require('chai')

describe('GET /webhooks/docusign/connect/:id/contract/:token', () => {
  const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms))

