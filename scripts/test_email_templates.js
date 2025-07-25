const app = require('../app/core')
const logger = app.logger.getLogger('scripts.test_email_templates')

logger.info('[worker] starting worker to test email templates on env: %s', process.env.NODE_ENV)

// boot app
app.load().then(async () => {

  const emailTestData = {
    welcomeEmail: {
      statusEmailSubject: "statusEmailSubject",
      firstName: "firstName",
      lastName: "lastName",
      uri: "uri",
      institution: 'institution',
      institutionUrl: 'institutionUrl',
    },

    AccountRequestApproved: {
      statusEmailSubject: "statusEmailSubject",
      statusEmailBody: "statusEmailBody"
    },

    AccountRequestDeclined: {
      statusEmailSubject: "statusEmailSubject",
      statusEmailBody: "statusEmailBody"
    },

    inviteeSignupEmail: {
      inviteeName: 'inviteeName',
      invitedByFirstName: 'invitedByFirstName',
      invitedByFullName: 'invitedByFullName',
      accountType: 'accountType',
      inviteeRole: 'inviteeRole',
      institution: 'institution',
      institutionUrl: 'institutionUrl',
      url: 'url',
      statusEmailSubject: 'statusEmailSubject'
    },

    inviteeSignupReminderEmail: {
      inviteeName: 'inviteeName',
      invitedByFirstName: 'invitedByFirstName',
      invitedByFullName: 'invitedByFullName',
      accountType: 'accountType',
      inviteeRole: 'inviteeRole',
      institution: 'institution',
      institutionUrl: 'institutionUrl',
      url: 'url',
      statusEmailSubject: 'statusEmailSubject'

    passwordResetEmail: {
      statusEmailSubject: 'statusEmailSubject',
      firstName: 'firstName',
      lastName: 'lastName',
      uri: 'uri',
      institution: 'institution',
      institutionUrl: 'institutionUrl',
    },

    magicLinkEmail: {
      statusEmailSubject: 'statusEmailSubject',
      firstName: 'firstName',
      lastName: 'lastName',
      uri: 'uri',
      institution: 'institution',
      institutionUrl: 'institutionUrl'
    },

    prospectPendingSignersEmail: {
      prospectFirstName: 'prospectFirstName',
      accountType: 'accountType',
      statusEmailSubject: 'statusEmailSubject',
      institution: 'institution',
      institutionUrl: 'institutionUrl',
    },

