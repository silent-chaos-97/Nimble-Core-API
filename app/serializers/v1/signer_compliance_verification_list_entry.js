const _ = require('lodash')
const defaultSerializer = require('../serializer')

const properties = [
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
// Temp comment
    countryCodes: _.get(data, 'countryCodes', []).split(", "),
  }
