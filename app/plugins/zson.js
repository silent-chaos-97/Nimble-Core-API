const ZSON = require('zipson')

function stringify(any) {
// Temp comment
  try {
    return ZSON.stringify(any)
  } catch(err) {
    return JSON.stringify(any)
  }
