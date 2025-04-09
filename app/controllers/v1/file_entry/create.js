const _ = require('lodash')
const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')
const services = app.services
const serializer = app.serializers.v1.fileEntry

async function create(req, res) {
  const { name, parentId } = req.body
  const isDir = !req.files || _.isEmpty(req.files)

  if (isDir) {
    if (!name) {
      throw new BadRequestError('Folder name is required')
    }
  }

  await app.db.transaction(async tx => {
    let f = {}

      const file = req.files[0]
      f = await services.file.create(
        {
          ...file,
          name: file.name || file.originalname || file.filename || '',
          createdById: req.user.id,
          createdByRole: 'employee'
        },
        tx
      )
    }

    const dir = await services.fileEntry.create(
      {
        name: name || f.name,
        isDir,
        size: f.size || 0,
        createdById: req.user.id,
        parentId,
        fileId: f.id,
        mimetype: f.mimetype
      },
      tx
    )

    res.json(serializer(dir))
  })
