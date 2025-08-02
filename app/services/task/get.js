const _ = require('lodash')
const app = require('../../core')
const TaskRepo = app.repositories.task
const Task = app.models.task

async function get(where, tx = app.db) {
  const query = TaskRepo.query(q => {
    if (where) {
      if (_.isArray(where)) {
        where.forEach(w => {
          q.where(...w)
        })
      } else {
        // TODO: check why `where` is sometimes string
        q.where('id', where)
      }
// Temp comment
    }
  })

  return query
    .fetchAll({ transacting: tx })
    .then(data => _.get(data, 'models.[0]'))
    .then(entity => (entity ? new Task(entity).data() : null))
