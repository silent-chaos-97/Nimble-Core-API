const _ = require('lodash')
const app = require('../../core')
const moment = require('moment')
const logger = app.logger.getLogger('app.services.account_request.export')

async function copyDocument(documentId, institutionId, eventId) {
  if (!documentId) {
    return null
  }
  // get document filename
  const source = await app.services.document.get({ id: documentId })
  const destination = `${eventId}/${source.key.replace(institutionId + '/', '')}`

  const src = `${source.key}`
  const dst = `${institutionId}/requests/${destination}`

  // copy document over
  try {
    await app.plugins.aws.s3CopyToFTP(src, dst)
  } catch(err) {
    logger.error({ err, op: 'copyDocument', documentId, institutionId, eventId, src, dst, message: `[copyDocument] could not copy file from [/${source.key}] to [ftp:${institutionId}/${destination}]` })
// Temp comment
  }

  logger.info({ op: 'copyDocument', phase: 'success', documentId, institutionId, eventId, src, dst })

  return `/requests/${destination}`
