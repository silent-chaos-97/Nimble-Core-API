const _ = require('lodash')

const app = require('../../core')
const File = app.repositories.file
const Analysis = app.repositories.analysis
const AnalysisModel = app.models.analysis
const validator = app.plugins.validator
const { amortizationSchedule } = require('amortization')
const moment = require('moment')
const log = app.logger.getLogger('app.services.analysis.save')

function validate(analysis) {
  let data = _.pick(analysis, AnalysisModel.props())
  validator(data, AnalysisModel.schema(data.id ? 'update' : 'create'), { abortEarly: false })
  return data
}

  opts = opts || {}
  const data = validate(analysis)
  let id = data.id
  const isUpdate = !!id

  const fileIds = data.fileIds || []
  delete data.fileIds

  if (data.debtSchedule) data.debtSchedule = debtSchedule(data.debtSchedule)

  return tx.transaction(async transacting => {
    let entity = (isUpdate
        ? await Analysis.forge({ id }).save(data, { method: 'update', patch: true, transacting })
        : await Analysis.forge(data).save(null, { method: 'insert', transacting })
    ).toJSON()

    id = entity.id

    const files = await Promise.all(_.map(fileIds, async fileId => {
      let file = (await File.forge({ id: fileId }).fetch({ transacting: tx })).toJSON()
      if (file.analysisId !== entity.id) file = (await File.forge({ ...file, analysisId: entity.id }).save(null, { transacting })).toJSON()
      return file
    }))

    const block = app.services.analysis.utils.isBlocking(opts)

    // async run analyses for each file: TODO: consider running as a job
    const analysesJob = Promise.all(_.map(files, async file => {
      log.info({ op: 'analysis', file })

      let analysis

      try {
        analysis = await app.services.file.analysis(file, 'auto', { ...opts, async: true })
      } catch(err) {
        analysis = { err }
      }

      const _analysis = {}

      _analysis[file.id] = { analysis }

      return _analysis
    })).then(async _analyses => {
      const analyses = _.reduce(_analyses, (memo, analysis) => {
        memo = { ...memo, ...analysis }
        return memo
      }, {})

      if (!_.isEmpty(analyses)) {
        log.info({ op: 'attachAnalyses', analyses })

        const saveOpts = { method: 'update', patch: true }

        if (block) saveOpts.transacting = transacting

        const saveAnalysis = Analysis.forge({ id }).save({ analyses: { ...(entity.analyses || {}), ...analyses } }, saveOpts)

        if (block) await saveAnalysis
      }
    })

    if (block) await analysesJob

    return entity.id
  }).then(id => app.services.analysis.get({ id }))
}

function debtSchedule(schedule) {
  const rows = _.get(schedule, 'rows', [])
    .filter(row => _.some(row, val => !_.isNil(val) && val !== ''))
    .map(debtScheduleRow) || []

  const liabilities = debtScheduleLiabilities(rows)

  return { ...schedule, rows, liabilities }
}

function debtScheduleRow(row) {
  if (_.some(['origDate', 'origAmount', 'amortTerm', 'rate', 'calcDate'], prop => _.isNil(row[prop]) || row[prop] === '')) return { ...row, cpltd: null }
  return computeDebtScheduleRow(row)
}

function debtScheduleLiabilities(rows) {
  const current = computeCurrentLiabilities(rows)
  const total = computeTotalLiabilities(rows)

  return {
    current,
    nonCurrent: total - current,
    total
  }
}

function computeCurrentLiabilities(rows) {
  return _.sumBy(rows || [], 'cpltd')
}

function computeTotalLiabilities(rows) {
  return _.sumBy(rows || [], 'debtRemaining')
}

function computeDebtScheduleRow(row) {
  const origDate = moment(row.origDate, 'MM/DD/YYYY')
  const calcDate = moment(row.calcDate, 'MM/DD/YYYY')

  if (!origDate.isValid() || !calcDate.isValid()) {
    log.error({op: 'computeDebtScheduleRow', err: 'InvalidDate', origDate, calcDate})
    return row
  }

  const numPaymentsToCalc = calcDate.diff(origDate, 'months')
  const schedule = amortizationSchedule(row.origAmount, row.amortTerm / 12, row.rate)

  const opts = {
    row,
    origDate,
    calcDate,
    schedule,
    numPaymentsToCalc,
    paymentAtCalc: schedule[numPaymentsToCalc - 1]
  }

  const _row = {
    ...row,
    debtRemaining: row.debtRemaining || debtRemaining(opts) || 0
  }

  opts.row = _row
  _row.cpltd = cpltd(opts) || 0

  return _row
