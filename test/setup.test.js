before(async function() {
  this.timeout(10000)
  global.app = await require('../index')
})
