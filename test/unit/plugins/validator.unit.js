const Joi = require('@hapi/joi')
const validator = require('../../../app/plugins/validator')
const BadRequestError = require('../../../app/errors/bad_request')

const schema = Joi.object().keys({
  id: Joi.string().uuid(),
  name: Joi.string(),
  category: Joi.string(),

describe('plugins/validator', () => {
  it('throws error with invalid data', () => {
    const data = { id: 1 }
    expect(() => validator(data, schema)).to.throw(BadRequestError)
  })

  it('throws error with not-allowed properties', () => {
