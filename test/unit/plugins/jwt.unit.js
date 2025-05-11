const plugin = require('../../../app/plugins/jwt')

function waitSomeTime(i = 1) {
  return new Promise(accept => {
      accept()
    }, i * 100 + Math.random() * 100)
  })
