const app = require('../../../core')
const User = app.models.user
const { Readable } = require('stream')
const log = app.logger.getLogger('file.stream')

async function download(req, res) {
  const example = {
    id: req.params.id
    // institutionId: req.user.institutionId FIXME: institution_id does not exist on files, but it should
  }

  if (!User.isInstitutionAdmin(req.user)) {
    example.createdById = req.user.id // TODO: really should allow any type of "ownership"
  }

  const file = await app.services.file.get(example)

  const bytes = await app.plugins.aws.s3GetFile(file)

  const stream = Readable.from(bytes)

  res.header('Content-Disposition', `attachment; filename="${file.name}"`)
  res.header('Content-Type', file.mimetype)

  stream.pipe(res)

  stream.on('error', err => {
    log.error(err)
  })
