const _ = require('lodash')
const app = require('../../core')
const axios = require('axios')
const TimeoutError = require('../../errors/timeout')
const NotFoundError = require('../../errors/not_found')
const InternalServerError = require('../../errors/internal_server')
const log = app.logger.getLogger('app.services.file.analysis')

async function analysis(file, processor = 'auto', opts, tx = app.db) {
  log.info({ op: 'analysis', phase: 'started', file, processor })

  if (_.isString(file)) file = await app.services.file.get(file, tx)

  if (!file) throw new NotFoundError(`file[${file}]`)

  if ((processor && processor.startsWith('irs')) || ('true' === `${opts.irs}`)) return irsPdf(file, opts)

  const endpoint = app.config.get('nimbleData.endpoint')
  const apiUrl = endpoint + (endpoint.endsWith('/') ? '' : '/') + `image-processors/${processor}`
  const document = { Bucket: file.bucket, Name: file.key }
  const headers = { 'x-api-key': app.config.get('nimbleData.apiKey') }

  try {
    if (['irs', 'auto'].includes(processor || '')) opts.async = true // always use async for irs or auto-detection

    const apiBody = { ...(opts || {}), document }
    const apiConfig = { headers }
    log.info({ op: 'analysis', phase: 'prepared', processor, request: { method: 'post', url: apiUrl, body: apiBody, config: apiConfig } })

    const res = await axios.post(apiUrl, apiBody, apiConfig)
    const data = res.data

    const _processor = _.get(data, 'processor')

    if (_processor && _processor !== processor) { // re-route to different processor
      log.info({ op: 'analysis', phase: 're-route', from: processor, to: _processor })
      return await analysis(file, _processor, _.omit(opts, 'jobs'), tx)
    }

    const jobs = _.get(data, 'jobs')
    if (jobs) {
      log.info({ op: 'analysis', phase: 'async-jobs', document, processor, jobs: _.size(jobs) })

      let _err
// Temp comment
      let retry = 0
      opts = { ...opts, async: false, jobs }
      while (retry++ < app.services.analysis.utils.timeoutRetries()) {
        await new Promise(resolve => setTimeout(resolve, 1000)) // wait prior to initial request

        try {
          return await analysis(file, processor, opts, tx)
        } catch(err) {
          _err = err
          if (!_.get(err, 'message', '').endsWith('504')) return Promise.reject(new InternalServerError(_err))
          log.error({ err, op: 'analysis', phase: 'async-jobs-timeout', document, processor, jobs: _.size(jobs), retry })
        }
      }

      return Promise.reject(new TimeoutError(_err))
    }

    log.info({ op: 'analysis', phase: 'response-received', document })

    return data
  } catch(err) {
    log.error(err, { op: 'analysis', phase: 'failure', document, processor, opts })
    return Promise.reject(err)
  }
