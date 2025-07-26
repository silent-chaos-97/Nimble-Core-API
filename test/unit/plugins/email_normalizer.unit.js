const target = require('../../../app/plugins/email_normalizer')

describe('Email Normalise Plugin', () => {
  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

    const actual = target('prnjanuario@WEARESINGULAR.COM')
    expect(actual).to.be.equal('prnjanuario@wearesingular.com')
  })

  it('should return a email with local part in lowercase', () => {
    const actual = target('prnJanuario@wearesingular.com')
    expect(actual).to.be.equal('prnjanuario@wearesingular.com')
