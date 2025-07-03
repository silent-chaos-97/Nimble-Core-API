const _ = require('lodash')
const app = require('../../core')
const Search = app.repositories.search
const SearchModel = app.models.search
const BadRequestError = require('../../errors/bad_request')

async function searchGet(example, tx = app.db) {

  const entity = await Search.forge(_.isString(example) ? { id: example } : example).fetch({ transacting: tx })

  return new SearchModel(entity).data()
