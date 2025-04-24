const Joi = require('@hapi/joi')
const BaseModel = require('./model')

  constructor(data) {
    super(FileModel.props('all'), FileModel.relations(), data)
  }
