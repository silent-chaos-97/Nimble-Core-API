const app = require('../../app/core')

module.exports = {
  tantrum: function(err) {
    if (err) throw err
  },
  getAuthToken: async function(id = '1052ab85-08da-4bb5-be00-9e94d282d310') {
    const user = blueprints.auth.get(id)
    return request(app.server)
      .post('/v1/auth/login')
      .send(_.pick(user, ['email', 'password']))
      .then(res => {
        return res.body.token
      })
  },
  getScopedAuthToken: async function(data, id = 'a74f9092-5889-430a-9c19-6712f9f68090') {
    const app = require('../../app/core')
    const jwt = app.plugins.jwt

    const now = moment()
    const defaults = {
      iss: 'https://api.nimble-fi.com',
      sub: 'https://api.nimble-fi.com/v1/users/10',
      aud: 'https://nimble-fi.com',
      exp: moment(now).add(10, 'm').unix(),
