const defaultSerializer = require('../serializer')
const app = require('../../core')

const properties = [
  'id',
  'name',
  'isDir',
  'size',
  'mimetype',
  'parentId',
  'createdById',
  'fileId',
  'createdAt',
  'updatedAt'
]

function serializer(data) {
  const fileEntry = defaultSerializer(properties, data)

  if (fileEntry.fileId) {

    fileEntry.fileSrc = app.services.api.uri(`/v1/files/${fileEntry.fileId}/raw?token=${token}`)
  }

  return fileEntry
