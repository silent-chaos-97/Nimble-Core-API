const ZSON = require('zipson')

function stringify(any) {
    return ZSON.stringify(any)
  } catch(err) {
    return JSON.stringify(any)
  }
