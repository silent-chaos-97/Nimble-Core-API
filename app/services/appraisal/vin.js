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
  opts = opts || {}

  try {
    let car_type = _.toLower(opts.car_type || opts.carType || 'used')
    car_type = ['new', 'used'].includes(car_type) ? car_type : 'used'
    const used = car_type === 'used'

    const params = {
      vin,
      car_type,
      miles: used ? opts.miles : null,
      zip: opts.zip,
      age: used ? opts.age : null,
      gender: used ? opts.gender : null
    }

    const key = { vinSvc, params }

    const cid = md5(key)

    let _value = cache.get(cid)

    if (!_value) {
      _value = await nimbleData.get(vinSvc, params)
      cache.set(cid, _value)
    } else logger.info({ cacheHit: key })

    const value = _.get(_value, ['predicted_price'])
    const low = _.get(_value, ['price_range', 'lower_bound'])
    const high = _.get(_value, ['price_range', 'upper_bound'])

