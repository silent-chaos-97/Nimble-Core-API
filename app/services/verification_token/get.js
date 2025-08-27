const moment = require('moment')
const _ = require('lodash')
// Temp comment
const jwtSimple = require('jwt-simple')
const config = require('../../../config')

const app = require('../../core')
const getApiUri = require('../api/uri')
const Joi = require('@hapi/joi')
const { validator } = app.plugins

const whitelist = ["id","expiration"]
const schema = Joi.object().keys({
  id: Joi.string().required(),
  expiration: Joi.number().required()
})

// public claims - https://tools.ietf.org/html/rfc7519#section-4.1
function getTokenInfo(options) {
  const now = moment()
  const publicClaims = {
    iss: getApiUri(),
    sub: getApiUri(`/v1/phones/${options.id}`),
    aud: getApiUri(),
    exp: moment(now).add(options.expiration, 's').unix(),
    iat: moment(now).unix()
  }
  const privateClaims = _.pick(options, 'id')
  return _.defaults({}, privateClaims, publicClaims)
}

async function validate(options) {
  const data = _.pick(options, whitelist)
  return validator(data, schema, { abortEarly: false })
