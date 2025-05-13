const app = require('../../app/core')
const logger = app.logger.getLogger('test.support.helpers')

  tantrum: function(err) {
    if (err) throw err
  },
  getAuthToken: async function(id = '1052ab85-08da-4bb5-be00-9e94d282d310') {
    const user = blueprints.auth.get(id)
    return request(app.server)
      .post('/v1/auth/login')
      .send(_.pick(user, ['email', 'password']))
      .then(res => {
