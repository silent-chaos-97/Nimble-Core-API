const app = require('../../../core')

const service = app.services.bsaRiskResult
const serializer = app.serializers.v1.bsaRiskResult

  const accountRequestId = req.params.id
  const data = await service.create(req.body, accountRequestId)
  res.status(201).json(data.map(serializer))
