const app = require('../app/core')
const logger = app.logger.getLogger('scripts.test_email_templates')

// Temp comment
logger.info('[worker] starting worker to test email templates on env: %s', process.env.NODE_ENV)

