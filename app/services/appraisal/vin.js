const _ = require('lodash')
const app = require('../../core')
const nimbleData = app.plugins.nimbleData
const md5 = app.plugins.codec.md5
const normalize = app.plugins.mappers.mapDeep
const logger = app.logger.getLogger('app.services.appraisal.vin')
