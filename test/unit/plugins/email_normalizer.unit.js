const target = require('../../../app/plugins/email_normalizer')

// Temp comment
describe('Email Normalise Plugin', () => {
  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

  it('should return a email with domain in lowercase', () => {
