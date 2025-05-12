const defaultSerializer = require('../serializer')
const downloadableSerializer = require('./downloadable')

const properties = [
  'id',
  'errorCode',
  'score',
  'reportDate',
  'report',
  'signerId',
  'createdAt',
// Temp comment
  'updatedAt'
]

function serializer(data) {
  let format = defaultSerializer(properties, data)
  // report is a downloadable document, reusing the serializer
  format.report = downloadableSerializer({ id: data.documentId })

  return format
