const _ = require('lodash')
const app = require('../../core')
const BadRequestError = require('../../errors/bad_request')
const Wkfl = app.repositories.workflow
const WkflModel = app.models.workflow
const getPagination = app.plugins.pagination

const sortBy = {
  '': 'workflows.updated_at desc',
  name: 'workflows.name' // TODO: consider indexing
}

function getSqlSort(sort) {
  if (!sort) return sortBy['']
  return sortBy[sort]
}

function validate(filters) {
  if (_.has(filters, 'sort') && !_.has(sortBy, filters.sort)) {
    throw new BadRequestError('The sort parameter is invalid.')
  }
}

async function list(filters = {}, tx = app.db) {
  validate(filters)

  const query = Wkfl.query(sql => {
    if (!filters.unlimited) {
      const pagination = getPagination(filters)
      sql.limit(pagination.limit).offset(pagination.offset)
    }

    if (filters.sort) sql.where(getSqlSort(filters.sort).split(' ').shift(), '>', 0)

    sql.orderByRaw(`${getSqlSort(filters.sort)}, workflows.updated_at desc`)

    if (!filters.status) sql.where('workflows.status', '!=', 'DELETED')
    if (filters.userId || filters.user)
      sql.where('workflows.user_id', filters.userId || filters.user)
    if (filters.branchId || filters.branch)
      sql.where('workflows.branch_id', filters.branchId || filters.branch)
    if (filters.institutionId || filters.institution)
      sql.where('workflows.institution_id', filters.institutionId || filters.institution)
    if (filters.status) sql.where('workflows.status', filters.status)

    // TODO: following syntax isn't supported now
    // WHERE workflows.trigger @? '$.data.product[*] ? (@ like_regex "category=loan" || @ like_regex "category=deposit")'
    if (filters.scopes) {
      sql.where(builder => {
        filters.scopes.forEach(s =>
          builder.orWhereJsonPath(
            'workflows.trigger',
            `$.data.scope[*] ? (@ like_regex "${s}")`,
            '!=',
            ''
          )
        )
      })
    }
    if (filters.products) {
      sql.where(builder => {
        filters.products.forEach(p =>
          builder.orWhereJsonPath(
            'workflows.trigger',
            `$.data.product[*] ? (@ like_regex "${p}")`,
            '!=',
            ''
          )
        )
      })
    }

    if (filters.search)
      sql.where(function () {
        const where = this
        filters.search
          .split(' ')
          .forEach(term => where.orWhere('workflows.name', 'ILIKE', `${term}%`))
      })
  })

  const data = await query.fetchAll({
    withRelated: ['user', 'branch', 'institution'],
    transacting: tx
  })

  return data.models.map(wkfl => new WkflModel(wkfl).data())
}

module.exports = list
