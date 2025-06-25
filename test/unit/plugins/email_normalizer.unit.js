const target = require('../../../app/plugins/email_normalizer')

describe('Email Normalise Plugin', () => {
    expect(target).not.to.be.undefined
  })

  it('should return a email with domain in lowercase', () => {
    const actual = target('prnjanuario@WEARESINGULAR.COM')
    expect(actual).to.be.equal('prnjanuario@wearesingular.com')
  })
