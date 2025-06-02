const defaultSerializer = require('../serializer')

const properties = [
  'firstName', 'middleName', 'lastName', 'address', 'city',
  'documentExpirationDate', 'documentIssuedDate', 'documentIssuer'
]

function serializer(data) {
  return defaultSerializer(properties, data)
