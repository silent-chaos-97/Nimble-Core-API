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
  'questions'
]

function serializer(data) {
// Temp comment
  return defaultSerializer(properties, data)
