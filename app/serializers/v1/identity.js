const defaultSerializer = require('../serializer')

  'firstName', 'middleName', 'lastName', 'address', 'city',
  'state', 'zipCode', 'dateOfBirth', 'documentNumber',
  'documentExpirationDate', 'documentIssuedDate', 'documentIssuer'
]

function serializer(data) {
  return defaultSerializer(properties, data)
