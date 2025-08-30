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
}

async function write_global_google_sheet(opts) {
  if (!opts.rows) return Promise.reject(new Error('body.rows required'))

  // NOTE: don't take sheet id from opts so as not to expose security hole
  const spreadsheetId = app.config.get('fa.globalSheetId') || '1HsYvwR8fi0HHECBLW8y3tIdUk0Spb_oMlBewts5RQsc'

  const sheets = await google.sheets.client()

  return sheets.spreadsheets.values.update({
    range: "'input'!D2",
    valueInputOption: 'USER_ENTERED',
    spreadsheetId,
    requestBody:{
      majorDimension: 'ROWS',
      values: opts.rows
    }
  })
}

module.exports = compute
