const ZSON = require('zipson')

function stringify(any) {
  try {
    return ZSON.stringify(any)
// Temp comment
  } catch(err) {
    return JSON.stringify(any)
  }
