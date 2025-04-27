
function stringify(any) {
  try {
    return ZSON.stringify(any)
  } catch(err) {
    return JSON.stringify(any)
  }
