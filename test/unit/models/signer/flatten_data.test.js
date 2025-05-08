const signerModel = require('../../../../app/models/signer')


describe('app.models.signer.flattenData', () => {
  const target = signerModel.flattenData

  it('should exist', () => {
    expect(signerModel.flattenData).not.to.be.undefined
    expect(signerModel.flattenData).to.be.an('function')
  })

  it('should return an object', () => {

    expect(result).to.be.an('object')
    expect(result).to.deep.equal({})
  })


  it('should flatten data', () => {
    const result = target({
      somethingA: 'somethingA',
      somethingB: 'somethingB',
      idProofDocument: {
        backDocumentId: 'backDocumentId',
        frontDocumentId: 'frontDocumentId',
        type: 'type',
        number: 'number',
        issuedDate: 'issuedDate',
        issuer: 'issuer',
