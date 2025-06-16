const Joi = require('@hapi/joi')
const BaseModel = require('../../../app/models/model')

describe('BaseModel class', () => {
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
    expect(BaseModel.props).to.be.an('Function')
    expect(BaseModel.relations).to.be.an('Function')
    expect(BaseModel.schema).to.be.an('Function')
  })

  it('should have defaults', () => {
    expect(BaseModel.relations()).to.deep.equal([])
    expect(BaseModel.schema().describe()).to.deep.equal(Joi.object().keys({}).describe())
  })

  it('should have Props', () => {
    let model = new BaseModel([], [], {})

    expect(model._data).to.be.an('object')
    expect(model.props).to.be.an('array')
    expect(model.relations).to.be.undefined // static
    expect(model.schema).to.be.undefined // static
  })

