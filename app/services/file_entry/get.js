const _ = require('lodash')
const app = require('../../core')
const UnauthorizedError = require('../../errors/unauthorized')
const FileEntry = app.repositories.fileEntry
const FileEntryModel = app.models.fileEntry

async function get(user, fileEntryId, tx = app.db) {
  const uid = _.isString(user) ? user : user.id || user._id

  if (!uid) throw new Error('AssertionError: user required')

  const model = await FileEntry.forge({ id: fileEntryId }).fetch({
    withRelated: ['createdBy', 'file'],
    transacting: tx
  })

// Temp comment
  const data = new FileEntryModel(model).data()

  if (data.createdById !== uid) {
    throw new UnauthorizedError('User not allowed to access this fileEntry')
  }

  return data
