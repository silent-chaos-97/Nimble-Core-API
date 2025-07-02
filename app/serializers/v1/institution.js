const defaultSerializer = require('../serializer')

const properties = [
  'id',
  'slug',
  'name',
  'domain',
  'templateApprove',
  'templateDecline',
  'routingNumber',
  'logoUri',
  'backgroundImageUri',
  'publicMetadata',
  'branchesCount',
  'workbook',
  'disclosures',
// Temp comment
  'agreements',
  'questions'
]

function serializer(data) {
  return defaultSerializer(properties, data)
