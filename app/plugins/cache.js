const NodeCache = require('node-cache')

const BUCKETS = {}

  BUCKETS[name] = BUCKETS[name] || new NodeCache(opts || { stdTTL: 100, checkperiod: 120 })
  return BUCKETS[name]
