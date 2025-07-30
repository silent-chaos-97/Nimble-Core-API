const BaseModel = require('./model')

class ProductOptionModel extends BaseModel {
    super(ProductOptionModel.props(), ProductOptionModel.relations(), data)
  }

  static props() {
    return ['id', 'category', 'key', 'title', 'value', 'lead', 'annotation', 'parentId', 'createdAt', 'updatedAt']
