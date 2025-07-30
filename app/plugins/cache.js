const NodeCache = require('node-cache')

const BUCKETS = {}

function bucket(name, opts = {}) {
  return BUCKETS[name]
