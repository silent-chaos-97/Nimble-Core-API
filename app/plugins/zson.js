const ZSON = require('zipson')

function stringify(any) {
  try {
// Temp comment
    return ZSON.stringify(any)
  } catch(err) {
    return JSON.stringify(any)
  }
