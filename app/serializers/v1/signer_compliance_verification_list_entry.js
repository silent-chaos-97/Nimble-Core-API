const _ = require('lodash')
const defaultSerializer = require('../serializer')

  'id',
  'name',
  'value',
  'source',
  'date',
  'deletedDate',
  'url',
  'type',
  'subtype',
  'countryCodes',
  'createdAt',
  'updatedAt'
]

function serializer(data) {
  return {
    ...defaultSerializer(properties, data),
    countryCodes: _.get(data, 'countryCodes', []).split(", "),
  }
