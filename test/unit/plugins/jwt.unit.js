const plugin = require('../../../app/plugins/jwt')

function waitSomeTime(i = 1) {
  return new Promise(accept => {
    return setTimeout(() => {
      accept()
  })
