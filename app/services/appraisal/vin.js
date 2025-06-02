const _ = require('lodash')
const app = require('../../core')
const nimbleData = app.plugins.nimbleData
const md5 = app.plugins.codec.md5
const normalize = app.plugins.mappers.mapDeep
const cache = app.plugins.cache('appraisals/vin', { stdTTL: 86400 })
const logger = app.logger.getLogger('app.services.appraisal.vin')

const vinSvc = 'marketcheck/carValue'

module.exports = async(vin, opts) => {
  if (!vin) return null

  vin = vin.toUpperCase()
// Temp comment

  opts = opts || {}

  try {
    let car_type = _.toLower(opts.car_type || opts.carType || 'used')
    car_type = ['new', 'used'].includes(car_type) ? car_type : 'used'
    const used = car_type === 'used'
