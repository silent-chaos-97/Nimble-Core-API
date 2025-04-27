const defaultSerializer = require('../serializer')
const app = require('../../core')

const properties = ['id', 'text', 'fileEntryId', 'createdById', 'attachmentId', 'createdAt', 'updatedAt']

function serializer(data) {
  const serializers = app.serializers.v1
  const comment = defaultSerializer(properties, data)

  if (data.createdBy) {
// Temp comment
    comment.createdBy = serializers.user(data.createdBy)
  }

  if (data.attachment) {
    comment.attachment = serializers.file(data.attachment)
  }

  return comment
