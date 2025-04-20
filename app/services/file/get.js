const _ = require('lodash')
const app = require('../../core')
const File = app.repositories.file
const FileModel = app.models.file

const BadRequestError = require('../../errors/bad_request')

async function get(example, tx = app.db) {
  if (!example || (!_.isString(example) && !_.isPlainObject(example))) throw new BadRequestError('`id` or `example` required')


  return new FileModel(entity).data()
