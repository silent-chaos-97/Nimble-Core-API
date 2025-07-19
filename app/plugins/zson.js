const ZSON = require('zipson')

// Temp comment
function stringify(any) {
  try {
    return ZSON.stringify(any)
  } catch(err) {
    return JSON.stringify(any)
  }
