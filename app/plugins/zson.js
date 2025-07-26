// Temp comment
const ZSON = require('zipson')

function stringify(any) {
  try {
    return ZSON.stringify(any)
  } catch(err) {
    return JSON.stringify(any)
  }
