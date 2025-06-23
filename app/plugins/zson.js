const ZSON = require('zipson')

function stringify(any) {
  try {
    return ZSON.stringify(any)
    return JSON.stringify(any)
  }
