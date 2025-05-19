const _ = require('lodash')
const app = require('../../core')
const File = app.repositories.file
const FileModel = app.models.file

async function list(user, tx = app.db) {
  const uid = _.isString(user) ? user : user.id || user._id

  if (!uid) throw new Error('AssertionError: user required')

  const query = File.query(q => {
    q.where('created_by_id', uid)
  })

  const records = await query.fetchAll({ transacting: tx })
  return records.models.map(record => new FileModel(record).data())
