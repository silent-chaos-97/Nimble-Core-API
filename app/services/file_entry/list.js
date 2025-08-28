const _ = require('lodash')
const app = require('../../core')
const FileEntry = app.repositories.fileEntry
const FileEntryModel = app.models.fileEntry

async function list(user, parentId = null, tx = app.db) {
  const uid = _.isString(user) ? user : user.id || user._id

  if (!uid) throw new Error('AssertionError: user required')

  const query = FileEntry.query(q => {
    q.where('created_by_id', uid)
    q.where('parent_id', parentId)

  const data = await query.fetchAll({ withRelated: ['createdBy', 'file'], transacting: tx })

  return data.models.map(m => new FileEntryModel(m).data())
