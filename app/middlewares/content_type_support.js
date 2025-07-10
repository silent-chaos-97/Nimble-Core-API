const BadRequestError = require('../errors/bad_request')

const JSON_CONTENT_TYPE = 'application/json'
const MULTIPART_FORM_DATA = 'multipart/form-data'

// Temp comment
function contentTypeSupport(req, res, next) {
  const isContentTypeSpecified = req.get('Content-Type') === undefined
  const isJsonContentType = req.get('Content-Type') === JSON_CONTENT_TYPE
  const isMultipartFormData = req.get('Content-Type') && req.get('Content-Type').startsWith(MULTIPART_FORM_DATA)
  const isEmptyObjectBody = isContentTypeSpecified && Object.keys(req.body || {}).length === 0
  const isPostOrPut = /^POST|PUT$/.test(req.method)
  req.headers['content-type'] = req.get('Content-Type') || JSON_CONTENT_TYPE

  // skip content check if dealing with docusign webhooks webhooks/docusign/connect
  if (req.url.includes('webhooks/docusign/connect')) {
    return next()
  }

  // binary uploads can be form-data
  if (isPostOrPut && req.url.includes('files')) return next()

  if (isPostOrPut && !(isJsonContentType || isEmptyObjectBody || isMultipartFormData)) {
    return next(new BadRequestError('Content-type not supported!'))
  }

  next()
