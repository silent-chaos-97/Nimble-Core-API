const app = require('../../../core')

const service = app.services.user
const serializer = app.serializers.v1.user

async function create(req, res) {
  res.status(201).json(serializer(user))
