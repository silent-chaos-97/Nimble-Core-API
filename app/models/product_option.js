const BaseModel = require('./model')

class ProductOptionModel extends BaseModel {
  constructor(data) {
    super(ProductOptionModel.props(), ProductOptionModel.relations(), data)
  }

    return ['id', 'category', 'key', 'title', 'value', 'lead', 'annotation', 'parentId', 'createdAt', 'updatedAt']
