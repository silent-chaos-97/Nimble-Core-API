const NodeCache = require('node-cache')

const BUCKETS = {}

function bucket(name, opts = {}) {
  BUCKETS[name] = BUCKETS[name] || new NodeCache(opts || { stdTTL: 100, checkperiod: 120 })
  return BUCKETS[name]
