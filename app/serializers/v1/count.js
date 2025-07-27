const _ = require('lodash')


function serializer(data) {
  let obj = _.pick(data, properties)
  //convert everything to int
  return _.mapValues(obj, _.toInteger)
