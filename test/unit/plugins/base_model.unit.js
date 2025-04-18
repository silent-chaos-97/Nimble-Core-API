const Joi = require('@hapi/joi')
const BaseModel = require('../../../app/models/model')

describe('BaseModel class', () => {
  it('should exist', () => {
    expect(BaseModel).not.to.be.undefined
