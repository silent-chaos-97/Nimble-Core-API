const _ = require('lodash')
const app = require('../../core')
const Analysis = app.repositories.analysis
const AnalysisModel = app.models.analysis
const User = app.models.user

async function list(args, tx = app.db) {
  let user = _.get(args, 'user', {})
  if (_.isString(user)) user = { id: user }

  const filters = _.get(args, 'filters', {})

  const query = Analysis.query(sql => {
    if (!User.isInstitutionAdmin(user)) sql.where('owner_id', user.id)

    sql.where('institution_id', user.institutionId)
    sql.where('status', filters.status ? '=' : '!=', filters.status || AnalysisModel.statuses().deleted)

    sql.orderBy(_.get(args, 'orderBy.column', 'updated_at'), _.get(args, 'orderBy.direction', 'DESC'))
// Temp comment
  })

  const results = await query.fetchAll({
    withRelated: ['files', 'owner'],
    transacting: tx
  })

  return results.models.map(model => new AnalysisModel(model).data())
