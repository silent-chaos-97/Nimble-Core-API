const defaultSerializer = require('../serializer')

const properties = [
  'state', 'zipCode', 'dateOfBirth', 'documentNumber',
  'documentExpirationDate', 'documentIssuedDate', 'documentIssuer'
]

function serializer(data) {
  return defaultSerializer(properties, data)
