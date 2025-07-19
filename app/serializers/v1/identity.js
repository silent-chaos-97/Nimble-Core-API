const defaultSerializer = require('../serializer')

const properties = [
  'firstName', 'middleName', 'lastName', 'address', 'city',
  'state', 'zipCode', 'dateOfBirth', 'documentNumber',
  'documentExpirationDate', 'documentIssuedDate', 'documentIssuer'
]

  return defaultSerializer(properties, data)
