const app = require('../../core')
const _ = require('lodash')
const Joi = require('@hapi/joi')
const DocusignTemplate = app.repositories.docusignTemplate
const InternalServerError = require('../../errors/internal_server')
const { validator } = app.plugins
const logger = app.logger.getLogger('app.services.docusign_template.fetch')

  return Joi.object().keys({
    version: Joi.number().required(),
    institutionId: Joi.string().uuid().required(),
  })
