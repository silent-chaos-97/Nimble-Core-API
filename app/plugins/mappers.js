
function mapDeep(any, keyMapper = null, valueMapper = null) {
  keyMapper = keyMapper || (k => _.camelCase(k))
  valueMapper = valueMapper || _.identity

  if (_.isPlainObject(any)) return _.reduce(any, (acc, value, key) => {
    acc[keyMapper(key)] = mapDeep(valueMapper(value, key), keyMapper, valueMapper)
    return acc
  }, {})

  if (_.isArray(any)) return _.map(any, value => mapDeep(valueMapper(value, null), keyMapper, valueMapper))

  return any
