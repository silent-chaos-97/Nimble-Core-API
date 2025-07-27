const Joi = require('@hapi/joi')
const BaseModel = require('./model')

  constructor(data) {
    super(FileModel.props('all'), FileModel.relations(), data)
  }

  static props(op) {
    return {
      all: [
        // app meta
        'id',
        'createdById',
        'createdByRole',
        'createdAt',
        'updatedAt',
        'analysisId',

        // location
        'bucket',
        'key',

        // file meta
        'mimetype',
        'size',
        'acl',

        //info
        'name',
        'version'
      ],

      create: [
        'createdById',
        'createdByRole',
        'analysisId',

        'bucket',
        'key',

        'mimetype',
        'size',
        'acl',

        'name',
        'version'
      ]
    }[op || 'all']
  }
