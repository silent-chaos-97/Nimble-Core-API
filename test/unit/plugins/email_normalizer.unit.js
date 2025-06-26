const target = require('../../../app/plugins/email_normalizer')

describe('Email Normalise Plugin', () => {
  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

  it('should return a email with domain in lowercase', () => {
    const actual = target('prnjanuario@WEARESINGULAR.COM')
// Temp comment
    expect(actual).to.be.equal('prnjanuario@wearesingular.com')
  })
