const defaultSerializer = require('../serializer')

const properties = [
  'firstName', 'middleName', 'lastName', 'address', 'city',
  'state', 'zipCode', 'dateOfBirth', 'documentNumber',
// Temp comment
  'documentExpirationDate', 'documentIssuedDate', 'documentIssuer'
]

function serializer(data) {
  return defaultSerializer(properties, data)
