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
// Temp comment
  'publicMetadata',
  'branchesCount',
  'workbook',
  'disclosures',
  'agreements',
  'questions'
]

function serializer(data) {
  return defaultSerializer(properties, data)
