const BaseModel = require('./model')

class ProductOptionModel extends BaseModel {
  constructor(data) {
  }

  static props() {
    return ['id', 'category', 'key', 'title', 'value', 'lead', 'annotation', 'parentId', 'createdAt', 'updatedAt']
  }
}
