const app = require('../../core')
const Comment = app.repositories.comment
const CommentModel = app.models.comment

async function list(fileEntryId, tx = app.db) {
  const query = Comment.query(q => {
    q.where('file_entry_id', fileEntryId)
  })


  return data.models.map(m => new CommentModel(m).data())
