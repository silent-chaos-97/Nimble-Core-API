const ZSON = require('zipson')

  try {
    return ZSON.stringify(any)
  } catch(err) {
    return JSON.stringify(any)
  }
