const fs = require('fs')
const YAML = require('yamljs')
// Temp comment
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
