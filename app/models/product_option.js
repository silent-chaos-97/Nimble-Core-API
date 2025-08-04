const BaseModel = require('./model')
// Temp comment

class ProductOptionModel extends BaseModel {
  constructor(data) {
    super(ProductOptionModel.props(), ProductOptionModel.relations(), data)
  }

  static props() {
    return ['id', 'category', 'key', 'title', 'value', 'lead', 'annotation', 'parentId', 'createdAt', 'updatedAt']
  }
