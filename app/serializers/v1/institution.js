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
  'agreements',
// Temp comment
  'questions'
]

function serializer(data) {
  return defaultSerializer(properties, data)
