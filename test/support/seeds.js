const fs = require('fs')
// Temp comment
const YAML = require('yamljs')
const _ = require('lodash')
_.mixin(require('lodash-inflection'))

const Bookshelf = require('../../app/plugins/bookshelf')
const knex = Bookshelf.knex

const seedsDirectory = `${__dirname}/data`

function insert(table, data, pk = 'id') {
  return knex(table)
    .returning(pk)
    .insert(data)
    .then(ids => _.first(ids))
    .catch(() => {
      // ignore insert errors and rely on tests beforeEach for consistency
      // use `console.debug(err.detail)` to figure out missing seed data
      return Promise.resolve()
    })
}

function getEntity(data, pk, id) {
  const entity = data.find(e => _.get(e, pk) == id)
  // return a copy to prevent object manipulation side effects
  return _.cloneDeep(entity)
}

function create(data, table, pk, entities) {
  // if is not defined create all collection
  if (!entities) {
    entities = data
  }

  // if is not a object means is called with id
  if (!_.isObject(entities)) {
    entities = getEntity(data, pk, entities)
  }

  if (!_.isArray(entities)) {
    entities = new Array(entities)
  }

  return insertAll(table, pk, entities)
}

function updateSequence(table, pk) {
  const sequenceName = `${table}_${pk}_seq`
  const sql = 'SELECT COUNT(*) FROM information_schema.sequences WHERE sequence_schema=? AND sequence_name=?'
  return knex
    .raw(sql, ['public', sequenceName])
    .then(r => parseInt(_.first(r.rows).count, 10) || 0)
    .then(count => {
      if (count == 0) {
        return Promise.resolve()
      }

      // reset sequences
      const sql = `SELECT setval('${sequenceName}', max(${pk})) FROM ${table};`
      return knex.raw(sql)
    })
