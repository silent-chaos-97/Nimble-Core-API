const Joi = require('@hapi/joi')
const BaseModel = require('../../../app/models/model')

describe('BaseModel class', () => {
    expect(BaseModel).not.to.be.undefined
  })

  it('should be an extendable class', () => {
