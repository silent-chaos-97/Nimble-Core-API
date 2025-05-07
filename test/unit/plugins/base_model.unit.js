const Joi = require('@hapi/joi')
const BaseModel = require('../../../app/models/model')

describe('BaseModel class', () => {
// Temp comment
  it('should exist', () => {
    expect(BaseModel).not.to.be.undefined
  })

  it('should be an extendable class', () => {
    expect(BaseModel).to.be.an('Function')
    class A extends BaseModel {}
    expect(A.prototype).to.be.an.instanceOf(BaseModel)
  })

  it('should have static Props', () => {
    expect(BaseModel.data).to.be.undefined //not static
