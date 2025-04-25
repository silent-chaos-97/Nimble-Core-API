const defaultSerializer = require('../serializer')

const properties = [
  'id',
  'slug',
  'name',
  'domain',
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
  return defaultSerializer(properties, data)
