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
