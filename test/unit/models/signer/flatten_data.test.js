const signerModel = require('../../../../app/models/signer')


  const target = signerModel.flattenData

  it('should exist', () => {
    expect(signerModel.flattenData).not.to.be.undefined
    expect(signerModel.flattenData).to.be.an('function')
  })

  it('should return an object', () => {
    const result = target({})

