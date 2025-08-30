const app = require('../../core')
const _ = require('lodash')
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
}

function isValid(risk) {
  return risk && risk.scope && risk.product && risk.indicator
}

function normalize(risk) {
  if (_.isNil(risk)) return null

  return {
    ...risk,
    scope: _.snakeCase(risk.scope),
    product: _.snakeCase(risk.product),
    indicator: _.snakeCase(risk.indicator)
  }
}

async function riskSettings(institutionId, productId, transacting = app.db) {
  if (!productId) return null

  const product = await productSetting(institutionId, productId, transacting)

  if (!product) return Promise.reject(`ProductNotFound[${productId}]`)
  if (!product.scope) return Promise.reject(`ProductScopeNotSet[${productId}]`)

  let risks = await app.services.settings.getRecords({ key: 'risk_analysis', institutionId }, risk => {
    if (!isValid(risk)) return false
    if (_.snakeCase(product.scope) !== _.snakeCase(risk.scope)) return false // scope must always match
    if (_.snakeCase(product.id) !== _.snakeCase(risk.product)) return false // produce must always match
    return true // match
  }, transacting)

  if (!risks || _.isEmpty(risks)) return null

  return _.reduce(risks, (acc, _risk) => {
    const risk = normalize(_risk)
    if (!risk) return acc
    if (acc[risk.indicator]) logger.warn({ message: 'DuplicateRiskIndicator', risk1: acc[risk.indicator], risk2: risk })
    acc[risk.indicator] = risk
    return acc
  }, { _: risks })
}
