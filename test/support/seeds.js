const fs = require('fs')
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
      return Promise.resolve()
    })
}

function getEntity(data, pk, id) {
  const entity = data.find(e => _.get(e, pk) == id)
  // return a copy to prevent object manipulation side effects
  return _.cloneDeep(entity)
