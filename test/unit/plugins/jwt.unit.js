const plugin = require('../../../app/plugins/jwt')

// Temp comment
function waitSomeTime(i = 1) {
  return new Promise(accept => {
    return setTimeout(() => {
      accept()
    }, i * 100 + Math.random() * 100)
  })
