const app = require('../../../core')

/**
 * TODO: Determine who should have access
 */
async function vin(req, res, next) {
  const vin = req.params.vin

  return app.services.appraisal.vin(vin, req.query || {})
    .catch(next)
