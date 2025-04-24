const app = require('../app/core')

logger.info('[worker] starting worker to test email templates on env: %s', process.env.NODE_ENV)

// boot app
app.load().then(async () => {

  const emailTestData = {
    welcomeEmail: {
      statusEmailSubject: "statusEmailSubject",
      firstName: "firstName",
      lastName: "lastName",
