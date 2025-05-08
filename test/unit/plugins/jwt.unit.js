const plugin = require('../../../app/plugins/jwt')

function waitSomeTime(i = 1) {
    return setTimeout(() => {
      accept()
    }, i * 100 + Math.random() * 100)
  })
