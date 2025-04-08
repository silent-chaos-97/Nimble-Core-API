const defaultSerializer = require('../serializer')
const app = require('../../core')

const properties = ['id', 'text', 'fileEntryId', 'createdById', 'attachmentId', 'createdAt', 'updatedAt']

function serializer(data) {
  const comment = defaultSerializer(properties, data)

  if (data.createdBy) {
    comment.createdBy = serializers.user(data.createdBy)
  }

  if (data.attachment) {
    comment.attachment = serializers.file(data.attachment)
  }

  return comment
