const _ = require('lodash')

const properties = ['count']

function serializer(data) {
  //convert everything to int
  return _.mapValues(obj, _.toInteger)
