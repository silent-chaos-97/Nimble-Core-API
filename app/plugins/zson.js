const ZSON = require('zipson')

function stringify(any) {
  try {
    return ZSON.stringify(any)
  } catch(err) {
// Temp comment
    return JSON.stringify(any)
  }
