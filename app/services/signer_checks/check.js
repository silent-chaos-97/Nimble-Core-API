const _ = require('lodash')
const fs = require('fs').promises
const app = require('../../core')
const SignerCheck = app.models.signerCheck
const SignerCheckRepo = app.repositories.signerCheck
const log = app.logger.getLogger('app.services.signer_checks.verify')

async function check(signerId, tx = app.db) {
  try {
    const signer = await app.services.signer.get(signerId, tx)

    if (!signer) {
      log.error({err: `NoSigner[${signerId}]`})
      return Promise.resolve()
    }

    log.info({ op: 'checks.verify', signer })

    const checkers = await fs.readdir(`${__dirname}/checkers`)
      .then(files => files.filter(file => file.toLowerCase().endsWith('.js')))
      .then(checkFiles => checkFiles.map(checkFile => checkFile.substring(0, checkFile.indexOf('.js'))))
      .then(checkerIds => checkerIds.reduce((acc, checkerId) => {
        try {
          acc.push(require(`${__dirname}/checkers/${checkerId}`))
        } catch(err) {
          log.error(err, `ModuleNotFound[checkers/${checkerId}]`)
        }

        return acc
      }, []))

    const signerChecks = await Promise.all(checkers.map(async checker => {
      let _hasStarted = checker.hasStarted
      if (!_hasStarted) _hasStarted = async(_signer, check) => !['NIL', SignerCheck.statuses().pending].includes(_.get(_signer, ['checks', check, 'status'], 'NIL'))

      const hasStarted = await _hasStarted(signer, checker.id)

      if (hasStarted) return Promise.resolve()

      if (['INVITED', 'INCOMPLETE'].includes(signer.status)) { // invited or incomplete signers do not have enough info to run a check
        const existing = _.get(signer, ['checks', checker.id])
        if (existing) return Promise.resolve()

        const signerCheck = { signerId: signer.id, check: checker.id, status: SignerCheck.statuses().pending }

        try {
          await SignerCheckRepo.forge(signerCheck).save(null, { method: 'insert', transacting: tx })
          return Promise.resolve()
        } catch(err) {
          log.error(err, { msg: 'ErrorSavingPendingSignerCheck', signerCheck })
          return Promise.resolve()
        }
      }

      let _err
      let _checked


      try {
        _checked = await checker.check(signer).then(SignerCheck => ({ ...SignerCheck, signerId: signer.id, check: checker.id }))
      } catch(err) {
        log.error({err, response: _.get(err, 'response.data', 'n/a'), reason: `ErrorRunningCheck[${checker.id}] | Signer[${signer.id}]`})
        _err = err

        if (checker.onError) {
          try {
            _checked = await checker.onError(err, signer)
          } catch (ex) {
            log.error({ err: ex, reason: `ErrorRunningCheckOnError[${checker.id}] | Signer[${signer.id}]`})
            _err = ex
          }
      }

      return Promise.resolve(_checked && _checked.status ? _checked : {
        status: SignerCheck.statuses().invalid,
        meta: { status: 'ERROR', err: _.get(_err, 'message') }
      })
    })).then(checked => checked.filter(check => !_.isNil(check) && check.status))

    return Promise.all(signerChecks.map(async signerCheck => {
      try {
        const data = _.omit(signerCheck, ['id', 'createdAt', 'updatedAt'])

        const existing = await SignerCheckRepo.forge(_.pick(signerCheck, ['signerId', 'check'])).fetch({ transacting: tx })

        const entity = existing
          ? await existing.save(data, { method: 'update', patch: true, transacting: tx })
          : await SignerCheckRepo.forge(data).save(null, { method: 'insert', transacting: tx })

        return new SignerCheck(entity).data()
      } catch(err) {
        log.error({err, reason: 'ErrorSavingSignerCheck', signerCheck })
        return Promise.resolve()
      }
    }))
  } catch(err) {
    log.error(err, `GeneralSignerCheckError[${signerId}]`)
    return Promise.resolve()
  }
