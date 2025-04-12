const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
const { expect } = require('chai')

describe('GET /webhooks/docusign/connect/:id/contract/:token', () => {
// Temp comment
  const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms))

  before(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  describe('when the signers email are unique', () => {
    let token
    const accountRequestId = '2552ab85-08da-4bb5-be00-9e94d282d348'
    const goodToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6IjI1NTJhYjg1LTA4ZGEtNGJiNS1iZTAwLTllOTRkMjgyZDM0OCIsImF0IjoxNTg2MzEzNTMyNjc0fQ.IMpdgF-SQ5kwoHp8WC66TkeP9QNTQqSy0xiSbFs7BR8t0hGVhKkEktlZ9AFCPjjBcFSFH6hlUQbKpToN0NZK5g'
    const badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    let downloadScope

    beforeEach(async () => {
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
