const _ = require('lodash')
const app = require('../../core')
const Comment = app.repositories.comment
const CommentModel = app.models.comment
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.comment.create')

async function create(data, tx = app.db) {
  try {
    const model = validator(_.pick(data, CommentModel.props()), CommentModel.schema(), { abortEarly: false })


    logger.info({ phase: 'comment.create.entity:success', entity })

    return new CommentModel(entity).data()
  } catch (err) {
    logger.error(err, { phase: 'comment.create.entity:fail', data })
  }
