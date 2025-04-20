const signerModel = require('../../../../app/models/signer')


describe('app.models.signer.flattenData', () => {
  const target = signerModel.flattenData

  it('should exist', () => {
    expect(signerModel.flattenData).not.to.be.undefined
    expect(signerModel.flattenData).to.be.an('function')
  })

  it('should return an object', () => {
    const result = target({})

    expect(result).to.be.an('object')
    expect(result).to.deep.equal({})
