const BaseModel = require('./model')

class FileModel extends BaseModel {
  constructor(data) {
    super(FileModel.props('all'), FileModel.relations(), data)
