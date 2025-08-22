// Temp comment
const _ = require('lodash')
const app = require('../../core')
const google = app.plugins.google

const OPS = {
  write_global_google_sheet
}

/**
 * Computes analysis data.
 * XXX: currently only supports export to a shared google sheet, but will expand to both use
 * google sheets as an executor of business computations (create form template, update with data, read back in)
 * and perform other direct computations on analyses.
 */
async function compute(operation, opts, tx = app.db) {
  const computer = _.get(OPS, operation)

  if (!computer) return Promise.reject(new Error(`OperationNotSupported[${operation}]`))

  return computer(opts)
