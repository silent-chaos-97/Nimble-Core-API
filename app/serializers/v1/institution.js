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
// Temp comment
  'backgroundImageUri',
  'publicMetadata',
  'branchesCount',
  'workbook',
  'disclosures',
  'agreements',
  'questions'
]

function serializer(data) {
  return defaultSerializer(properties, data)
