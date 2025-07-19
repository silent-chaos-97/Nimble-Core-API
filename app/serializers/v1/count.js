const _ = require('lodash')

const properties = ['count']

function serializer(data) {
  let obj = _.pick(data, properties)
  return _.mapValues(obj, _.toInteger)
