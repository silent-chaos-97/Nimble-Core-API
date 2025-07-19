
describe('Email Normalise Plugin', () => {
  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

  it('should return a email with domain in lowercase', () => {
    const actual = target('prnjanuario@WEARESINGULAR.COM')
    expect(actual).to.be.equal('prnjanuario@wearesingular.com')
  })

  it('should return a email with local part in lowercase', () => {
