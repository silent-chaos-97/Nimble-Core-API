const app = require('../../core')
const Roles = app.models.user.roles()
const admins = [Roles.SuperAdmin, Roles.InstitutionAdmin, Roles.BranchAdmin]
const auth = app.middlewares.auth
const multer = require('multer')
const upload = multer()
const logger = app.logger.getLogger('app.controllers.v1.routes')

function asyncWrapper(cb) {
  return (req, res, next) => {
    try {
      cb(req, res, next).catch(next)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = function routerDecorator(router) {
  router.get('/', app.controllers.v1.health.get) // alias for v1/health
  router.get('/v1/health', app.controllers.v1.health.get)
  router.get('/v1/admin', auth('apiKey'), asyncWrapper(app.controllers.v1.admin.get))
  router.post('/v1/admin/:command', auth('apiKey'), asyncWrapper(app.controllers.v1.admin.command))

  //AUTH
  router.post('/v1/auth/login', app.controllers.v1.auth.login)
  router.post('/v1/auth/recover/:email', app.controllers.v1.auth.recover)
  router.put('/v1/auth/recover/:email', app.controllers.v1.auth.changePassword)
  router.post('/v1/auth/magic-link', app.controllers.v1.auth.magicLink)
  router.post('/v1/auth/login/:email', app.controllers.v1.auth.loginOneTimeToken)
  router.post('/v1/auth/verify-code', app.controllers.v1.auth.verifyCode)

  // router.post('/v1/auth/send-verify-code', app.controllers.v1.auth.sendVerifyCode)
  // router.post('/v1/auth/verify-user-code', app.controllers.v1.auth.verifyUserCode)

  router.post('/v1/auth/auth-tokens', app.controllers.v1.applicantAuthToken.create)

  //DOCUMENTS
  router.post('/v1/documents', asyncWrapper(app.controllers.v1.document.create))
  router.get(
    '/v1/documents/:id',
    app.middlewares.auth('token', ['documents']),
    asyncWrapper(app.controllers.v1.document.get)
  )

  //ME
  router.get('/v1/me', app.middlewares.auth(), app.controllers.v1.me.get)
  router.put('/v1/me', app.middlewares.auth(), app.controllers.v1.me.update)
  router.get(
    '/v1/me/application/current-step',
    app.middlewares.auth(),
    app.controllers.v1.applicantCurrentStep.get
  )
  router.patch(
    '/v1/me/application/current-step',
    app.middlewares.auth(),
    app.controllers.v1.applicantCurrentStep.set
  ) // TODO: Remove this endpoint once all the steps can be set in the corresponding application endpoints directly

  //USER[types]
  // app-tier specialization of `GET /users` for those users who can referrer other account/product/feature types
  router.get('/v1/referrers', app.middlewares.auth(), app.controllers.v1.referrers.list)
  router.get(
    '/v1/user-accounts',
    app.middlewares.auth(),
    app.middlewares.auth('roles', admins),
    app.controllers.v1.userAccount.list
  )
  router.get(
    '/v1/user-accounts/count',
    app.middlewares.auth(),
    app.middlewares.auth('roles', admins),
    app.controllers.v1.userAccount.count
  )
  router.get(
    '/v1/user-accounts/:id',
    app.middlewares.auth(),
    app.middlewares.auth('roles', admins),
    app.controllers.v1.userAccount.get
  )
  router.patch(
    '/v1/user-accounts/:id',
    app.middlewares.auth(),
    app.middlewares.auth('roles', admins),
    app.controllers.v1.userAccount.update
  )
  router.post(
    '/v1/user-accounts',
    app.middlewares.auth(),
    app.middlewares.auth('roles', admins),
    asyncWrapper(app.controllers.v1.userAccount.create)
  )

  //USERS
  router.get('/v1/users/:id', app.middlewares.auth('apiKey'), app.controllers.v1.user.get)
  router.get('/v1/users', app.middlewares.auth('apiKeyOrJwt'), app.controllers.v1.user.list)
  router.post(
    '/v1/users',
    app.middlewares.auth('apiKey'),
    asyncWrapper(app.controllers.v1.user.create)
  )

  //INSTITUTION
  router.get(
    '/v1/institutions/count',
    app.middlewares.auth(),
    app.middlewares.auth('roles', [Roles.SuperAdmin]),
    app.controllers.v1.institution.count
  )
  router.get('/v1/institutions/:domain', app.controllers.v1.institution.get)
  router.get('/v1/institutions/:id/branches', app.controllers.v1.institutionBranch.list)
  router.post(
    '/v1/institutions/:id/branches',
    auth('apiKeyOrJwt'),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    auth('memberships', { institution: 'id' }),
    app.controllers.v1.institutionBranch.create
  )
  router.post(
    '/v1/institutions',
    app.middlewares.auth('apiKey'),
    asyncWrapper(app.controllers.v1.institution.create)
  )
  router.get(
    '/v1/institutions',
    app.middlewares.auth(),
    app.middlewares.auth('roles', [Roles.SuperAdmin]),
    app.controllers.v1.institution.list
  )
  router.put(
    '/v1/institutions/:id',
    auth('jwt'),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    auth('memberships', { institution: 'id' }),
    app.controllers.v1.institution.update
  )
  router.patch(
    '/v1/institutions/:id',
    auth('jwt'),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    auth('memberships', { institution: 'id' }),
    app.controllers.v1.institution.update
  )

  //INSTITUTION SETTINGS
  router.get(
    '/v1/institutions/:id/settings',
    auth('jwt'),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    auth('memberships', { institution: 'id' }),
    app.controllers.v1.settings.list
  )
  router.get('/v1/institutions/:domain/free-settings', app.controllers.v1.settings.listFree)
  router.get(
    '/v1/institutions/:id/settings/:key',
    auth('jwt'),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    auth('memberships', { institution: 'id' }),
    app.controllers.v1.settings.get
  )
  router.patch(
    '/v1/institutions/:id/settings/:key',
    auth('jwt'),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    auth('memberships', { institution: 'id' }),
    app.controllers.v1.settings.update
  )

  //SETTINGS
  router.get(
    '/v1/settings',
    auth(),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    app.controllers.v1.settings.list
  )
  router.get(
    '/v1/settings/:key',
    auth(),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    app.controllers.v1.settings.get
  )

  // (INSTITUTION) BRANCHES
  router.get(
    '/v1/branches/count',
    app.middlewares.auth(),
    app.middlewares.auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    app.controllers.v1.branch.count
  )
  router.get(
    '/v1/branches',
    app.middlewares.auth(),
    app.middlewares.auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    app.controllers.v1.branch.list
  )
  router.patch(
    '/v1/branches/:id',
    app.middlewares.auth(),
    app.middlewares.auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    app.controllers.v1.branch.update
  )

  //PRODUCTS
  router.get('/v1/institutions/:id/products', app.controllers.v1.product.list)
  router.post(
    '/v1/institutions/:id/products',
    app.middlewares.auth('apiKey'),
    asyncWrapper(app.controllers.v1.product.create)
  )

  //PRODUCT FORMS
  router.get(
    '/v1/product_forms/:productName/prefill_form',
    app.controllers.v1.productForms.prefillForm
  )

  //SIGNERS
  router.get(
    '/v1/signers/:id',
    app.middlewares.auth('tokenOrJwt', ['signers']),
    app.middlewares.acl('signer', 'id'),
    asyncWrapper(app.controllers.v1.signer.get)
  )
  router.post(
    '/v1/signers',
    app.middlewares.auth('tokenOrJwt', ['account_requests']),
    asyncWrapper(app.controllers.v1.signer.create)
  )
  router.post('/v1/signers/:id/validate', asyncWrapper(app.controllers.v1.signer.validate))
  router.put(
    '/v1/signers/:id',
    app.middlewares.auth('token', ['signers']),
    app.middlewares.acl('signer', 'id'),
    asyncWrapper(app.controllers.v1.signer.update)
  )
  router.get(
    '/v1/signers/:id/contract',
    app.middlewares.auth('token', ['signers']),
    asyncWrapper(app.controllers.v1.signerContract.get)
  )
  router.post(
    '/v1/signers/:id/invites',
    app.middlewares.auth(),
    app.middlewares.acl('signer', 'id'),
    asyncWrapper(app.controllers.v1.signer.invite)
  )

  //SIGNER VERIFICATIONS
  router.get(
    '/v1/signers/:id/identity-verifications',
    app.middlewares.auth(),
    app.middlewares.acl('signer', 'id'),
    asyncWrapper(app.controllers.v1.signerIdentityVerifications.get)
  )
  router.get(
    '/v1/signers/:id/compliance-verifications',
    app.middlewares.auth(),
    app.middlewares.acl('signer', 'id'),
    asyncWrapper(app.controllers.v1.signerComplianceVerifications.get)
  )
  router.get(
    '/v1/signers/:id/credit-reports',
    app.middlewares.auth(),
    app.middlewares.acl('signer', 'id'),
    asyncWrapper(app.controllers.v1.signerCreditReport.list)
  )

  router.post(
    '/v1/signers/:id/email-verifications',
    app.middlewares.auth('tokenOrJwt', ['signers.email_verifications']),
    app.middlewares.acl('signer', 'id'),
    asyncWrapper(app.controllers.v1.signerEmailVerifications.post)
  )
  router.put(
    '/v1/signers/:id/email-verifications/:emailVerificationId',
    app.middlewares.auth('token', ['signers.email_verifications']),
    asyncWrapper(app.controllers.v1.signerEmailVerifications.update)
  )

  //REFERRALS
  router.post(
    '/v1/referrals/invite',
    auth(),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin, Roles.BranchAdmin, Roles.Employee]),
    app.controllers.v1.referrals.invite
  )

  //ACCOUNT REQUEST
  router.get(
    '/v1/account-requests/count',
    app.middlewares.auth(),
    app.controllers.v1.accountRequest.count
  )
  router.get(
    '/v1/account-requests/:id',
    app.middlewares.auth('tokenOrJwt', ['account_requests']),
    app.middlewares.acl('account_request', 'id'),
    app.controllers.v1.accountRequest.get
  )
  router.put(
    '/v1/account-requests/:id',
    app.middlewares.auth('tokenOrJwt', ['account_requests']),
    app.middlewares.acl('account_request', 'id'),
    app.controllers.v1.accountRequest.update
  )
  router.patch(
    '/v1/account-requests/:id',
    app.middlewares.auth('tokenOrJwt', ['account_requests']),
    app.middlewares.acl('account_request', 'id'),
    app.controllers.v1.accountRequest.patch
  )
  router.post('/v1/account-requests', asyncWrapper(app.controllers.v1.accountRequest.create))
  router.get('/v1/account-requests', app.middlewares.auth(), app.controllers.v1.accountRequest.list)
  router.get(
    '/v1/account-requests/:id/bsa-risk-results',
    auth(),
    app.middlewares.acl('account_request', 'id'),
    asyncWrapper(app.controllers.v1.accountRequestBsaRiskResult.get)
  )
  router.post(
    '/v1/account-requests/:id/bsa-risk-results',
    auth('token', ['account_requests']),
    asyncWrapper(app.controllers.v1.accountRequestBsaRiskResult.create)
  )

  //APPLICATION REQUEST
  router.get('/v1/applications', app.middlewares.auth(), app.controllers.v1.application.list)

  // WEBHOOKS
  router.post(
    '/v1/webhooks/docusign/connect/:id/contract/:token',
    app.controllers.v1.accountRequest.webhook
  )
  router.post(
    '/v1/webhooks/shufti/identity-verification',
    asyncWrapper(app.controllers.v1.signerIdentityVerifications.webhook)
  )

  // IDENTITY
  router.get(
    '/v1/prospects/identities/:frontDocId/:backDocId',
    asyncWrapper(app.controllers.v1.identity.get)
  )

  // NOTIFICATIONS
  router.post('/v1/notifications', auth(), app.controllers.v1.notification.create)

  // OFFERINGS
  router.get('/v1/products', auth(), app.controllers.v1.products.list)
  router.get('/v1/products/:id', auth(), app.controllers.v1.products.get)

  // CALCULATORS
  router.post(
    '/v1/calculators/affordability',
    auth('none'),
    app.controllers.v1.calculator.affordability
  )

  // APPRAISALS
  router.get('/v1/appraisals/vin/:vin', auth(), app.controllers.v1.appraisal.vin)

  // FILES
  router.get('/v1/files', auth('apiKeyOrJwt'), asyncWrapper(app.controllers.v1.file.list))
  router.get('/v1/files/download/:id', auth(), asyncWrapper(app.controllers.v1.file.download))
  router.get('/v1/files/:id', auth('apiKeyOrJwt'), asyncWrapper(app.controllers.v1.file.get))
  router.get(
    '/v1/files/:id/raw',
    auth('token', ['files']),
    asyncWrapper(app.controllers.v1.file.serve)
  )
  router.get('/v1/files/:id/ocr', auth('apiKeyOrJwt'), asyncWrapper(app.controllers.v1.file.ocr))
  router.get(
    '/v1/files/:id/identification',
    auth('apiKeyOrJwt'),
    asyncWrapper(app.controllers.v1.file.identification)
  )
  router.post(
    '/v1/file',
    auth('apiKeyOrJwt'),
    upload.single('file'),
    asyncWrapper(app.controllers.v1.file.create)
  )
  router.post(
    '/v1/files',
    auth('apiKeyOrJwt'),
    upload.array('files'),
    asyncWrapper(app.controllers.v1.file.create)
  )
  router.get(
    '/v1/files/:id/analysis',
    auth('apiKeyOrJwt'),
    asyncWrapper(app.controllers.v1.file.analysis)
  )

  // Taxonomy
  router.get('/v1/taxonomy', auth('apiKeyOrJwt'), asyncWrapper(app.controllers.v1.terms.accounting))
  router.get(
    '/v1/taxonomy/:category',
    auth('apiKeyOrJwt'),
    asyncWrapper(app.controllers.v1.terms.accounting)
  )
  router.put(
    '/v1/terms/:category',
    auth('apiKeyOrJwt'),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    asyncWrapper(app.controllers.v1.terms.categorize)
  )
  // alias of /taxonomy
  router.get(
    '/v1/accounting-terms',
    auth('apiKeyOrJwt'),
    asyncWrapper(app.controllers.v1.terms.accounting)
  )
  // alias of /taxonomy/:category
  router.get(
    '/v1/accounting-terms/:term',
    auth('apiKeyOrJwt'),
    asyncWrapper(app.controllers.v1.terms.accounting)
  )

  // Financial Analysis
  router.get('/v1/analyses', auth(), asyncWrapper(app.controllers.v1.analysis.list))
  router.get('/v1/analyses/:id', auth(), asyncWrapper(app.controllers.v1.analysis.get))
  router.post(
    '/v1/analyses/:id/computations/:op',
    auth('none'),
    asyncWrapper(app.controllers.v1.analysis.compute)
  )
  router.post('/v1/analyses', auth(), asyncWrapper(app.controllers.v1.analysis.save))
  router.patch('/v1/analyses/:id', auth(), asyncWrapper(app.controllers.v1.analysis.save))
  router.delete('/v1/analyses/:id', auth(), asyncWrapper(app.controllers.v1.analysis.remove))

  // Tasks
  router.get('/v1/tasks', auth(), asyncWrapper(app.controllers.v1.task.list))
  router.get('/v1/tasks/:id', auth(), asyncWrapper(app.controllers.v1.task.get))
  router.post('/v1/tasks', auth(), asyncWrapper(app.controllers.v1.task.save))
  router.patch('/v1/tasks/:id', auth(), asyncWrapper(app.controllers.v1.task.save))
  router.delete('/v1/tasks/:id', auth(), asyncWrapper(app.controllers.v1.task.remove))

  // WORKFLOW
  router.get(
    '/v1/workflows',
    auth(),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    app.controllers.v1.workflow.list
  )
  router.get(
    '/v1/workflows/:id',
    auth(),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    app.controllers.v1.workflow.get
  )
  router.patch(
    '/v1/workflows/:id',
    auth(),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    asyncWrapper(app.controllers.v1.workflow.patch)
  )
  router.post(
    '/v1/workflows/execute',
    auth(),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    asyncWrapper(app.controllers.v1.workflow.execute)
  )
  router.post(
    '/v1/workflows/:id/publish',
    auth(),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    asyncWrapper(app.controllers.v1.workflow.publish)
  )
  router.post(
    '/v1/workflows',
    auth(),
    auth('roles', [Roles.SuperAdmin, Roles.InstitutionAdmin]),
    app.controllers.v1.workflow.create
  )
  router.get('/v1/trigger-descriptors', asyncWrapper(app.controllers.v1.triggerDescriptor.list))
  router.get('/v1/trigger-descriptors/:id', asyncWrapper(app.controllers.v1.triggerDescriptor.get))
  router.get(
    '/v1/action-descriptors',
    auth(),
    asyncWrapper(app.controllers.v1.actionDescriptor.list)
  )
  router.get(
    '/v1/action-descriptors/:id',
    auth(),
    asyncWrapper(app.controllers.v1.actionDescriptor.get)
  )

  // DATA
  router.get('/v1/data/people/schema', auth(), asyncWrapper(app.controllers.v1.data.peopleSchema))
  router.post('/v1/data/people/search', asyncWrapper(app.controllers.v1.data.peopleSearch))

  router.get('/v1/data/searches', auth(), asyncWrapper(app.controllers.v1.data.searchList))
  router.get('/v1/data/searches/:id', auth(), asyncWrapper(app.controllers.v1.data.searchGet))
  router.delete('/v1/data/searches/:id', auth(), asyncWrapper(app.controllers.v1.data.searchDelete))
  router.post('/v1/data/searches', auth(), asyncWrapper(app.controllers.v1.data.searchCreate))
  router.patch('/v1/data/searches/:id', auth(), asyncWrapper(app.controllers.v1.data.searchUpdate))

  router.get('/v1/data/api', auth('apiKeyOrJwt'), asyncWrapper(app.controllers.v1.data.api))
  router.post('/v1/data/api', auth('apiKeyOrJwt'), asyncWrapper(app.controllers.v1.data.api))
  router.get('/v1/data/profile', auth('apiKeyOrJwt'), asyncWrapper(app.controllers.v1.data.profile))
  router.get('/v1/data/autocomplete', auth(), asyncWrapper(app.controllers.v1.data.autocomplete))

  // KEY VALUE STORE
  router.get('/v1/key-value-store/:id', auth(), asyncWrapper(app.controllers.v1.keyValue.get))
  router.put('/v1/key-value-store/:id', auth(), asyncWrapper(app.controllers.v1.keyValue.update))
  router.delete('/v1/key-value-store/:id', auth(), asyncWrapper(app.controllers.v1.keyValue.delete))

  // Directories (File Manager)
  router.get(
    '/v1/file-entries',
    auth('apiKeyOrJwt'),
    asyncWrapper(app.controllers.v1.fileEntry.list)
  )
  router.get(
    '/v1/file-entries/:id',
    auth('apiKeyOrJwt'),
    asyncWrapper(app.controllers.v1.fileEntry.get)
  )
  router.post(
    '/v1/file-entries',
    auth('apiKeyOrJwt'),
    upload.array('files'),
    asyncWrapper(app.controllers.v1.fileEntry.create)
  )

  router.get(
    '/v1/file-entries/:fileEntryId/comments',
    auth('apiKeyOrJwt'),
    asyncWrapper(app.controllers.v1.comment.list)
  )
  router.post(
    '/v1/file-entries/:fileEntryId/comments',
    auth('apiKeyOrJwt'),
    upload.array('files'),
    asyncWrapper(app.controllers.v1.comment.create)
  )

  // RATES
  router.get('/v1/interest-rates', auth('jwt'), asyncWrapper(app.controllers.v1.interestRates.list))

  // wkfl: FIXME: factor into application-tier pattern
  const _ = require('lodash')
  const axios = require('axios')

  const TINES_API = 'https://quiet-glitter-1118.tines.com/api/v1'
  const TINES_WEBHOOK = 'https://quiet-glitter-1118.tines.com/webhook'
  const TINES_USER_EMAIL = 'erin@nimblefi.com'
  const TINES_USER_TOKEN = 'H9xExi3fxfvZgdsLEz5Z'
  const TINES_WEBHOOK_SECRET = '0f871e8c0d2083e995f11d531a822679'

  router.post('/v1/workflows/:name', auth(), (req, res, next) => {
    const auto = req.params.name
    const url = `${TINES_WEBHOOK}/${auto}/${TINES_WEBHOOK_SECRET}`

    logger.info({ url, body: req.body })

    axios
      .post(url, req.body)
      .catch(next)
      .then(_res => {
        res.json(_.get(_res, ['data'], { err: '?' }))
      })
  })

  router.get('/v1/workflow-runs/:id', auth(), (req, res, next) => {
    const runId = req.params.id
    const url = `${TINES_API}/events`

    logger.info({ url })

    axios
      .get(url, { headers: { 'x-user-email': TINES_USER_EMAIL, 'x-user-token': TINES_USER_TOKEN } })
      .catch(next)
      .then(_res => {
        const actions = _.map(
          _.get(
            _.find(
              _.get(_res, ['data', 'events'], []),
              _event => runId === _.get(_event, 'story_run_guid')
            ),
            'payload',
            {}
          ),
          (v, action) => {
            return { key: action, status: _.isNil(v) || _.isEmpty(v) ? 'WAITING' : 'COMPLETED' }
          }
        )

        logger.info({ actions })

        res.json({ id: runId, actions })
      })
  })
}
