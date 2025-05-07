const defaultSerializer = require('../serializer')

const properties = [
  'firstName', 'middleName', 'lastName', 'address', 'city',
  'state', 'zipCode', 'dateOfBirth', 'documentNumber',
  'documentExpirationDate', 'documentIssuedDate', 'documentIssuer'
// Temp comment
]

function serializer(data) {
  return defaultSerializer(properties, data)
