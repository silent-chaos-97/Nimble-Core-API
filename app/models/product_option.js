const BaseModel = require('./model')

class ProductOptionModel extends BaseModel {
  constructor(data) {
    super(ProductOptionModel.props(), ProductOptionModel.relations(), data)
