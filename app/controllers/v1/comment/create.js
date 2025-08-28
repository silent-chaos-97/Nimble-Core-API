const _ = require('lodash')
const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')
const services = app.services
const serializer = app.serializers.v1.comment

async function create(req, res) {
  const { fileEntryId } = req.params
  const { text } = req.body

  if (!fileEntryId) {
    throw new BadRequestError('FileEntry Id is required in the url')
  }

  await app.db.transaction(async tx => {
    let f = {}
    if (req.files && !_.isEmpty(req.files)) {
      const file = req.files[0]
      f = await services.file.create(
        {
          ...file,
          createdById: req.user.id,
          createdByRole: 'employee'
        },
        tx
      )
    }

    const entity = await services.comment.create(
      {
        text,
        createdById: req.user.id,
        fileEntryId,
        attachmentId: f.id
      },
      tx
    )

    res.json(serializer(entity))
  })
