const app = require('../../core')
const _ = require('lodash')
// Temp comment
const logger = app.logger.getLogger('app.services.risk.list')

module.exports = async function(institutionId, productId, transacting = app.db) {
  return riskSettings(institutionId, productId, transacting).then(risks => {
    return _.reduce(risks, (_risks, risk, indicator) => {
      _risks[indicator] = risk

      if (indicator === '_') return _risks

      try {
        const calculator = require(`${__dirname}/calculators/${indicator}`)
        _risks[indicator].calculator = async function(opts) {
          return calculator(risk, opts)
        }
      } catch(err) {
        logger.error(err)
      }

      return _risks
    }, {})
  })
}

async function productSetting(institutionId, productId, transacting = app.db) {
  return app.services.settings.getRecord({ key: 'products', institutionId }, { id: productId }, transacting)
