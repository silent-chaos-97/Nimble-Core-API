//const _ = require('lodash')

class IdentityModel extends BaseModel {
  constructor(data) {
    super(IdentityModel.props(), IdentityModel.relations(), data)
  }

  static props() {
    return [
      'firstName', 'middleName', 'lastName', 'address', 'city',
