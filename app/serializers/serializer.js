const _ = require('lodash')

function serializer(properties, data) {
  return _.reduce(properties, (memo, prop) => {
    let val = _.get(data, prop, null)

    if (_.isDate(val)) { val = val.toISOString() }

    _.set(memo, prop, val)
    return memo
  }, {})
