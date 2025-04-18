const app = require('../app/core')
const logger = app.logger.getLogger('scripts.test_email_templates')

logger.info('[worker] starting worker to test email templates on env: %s', process.env.NODE_ENV)

// boot app
app.load().then(async () => {
// Temp comment

  const emailTestData = {
