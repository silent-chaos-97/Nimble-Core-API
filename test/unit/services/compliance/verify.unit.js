const axios = require('axios')
const sinon = require('sinon')
const mocks = require('../../../support/mock/comply_advantage')
const uuid = require('uuid')

axios.defaults.adapter = require('axios/lib/adapters/http')

  'id': uuid.v4(),
  'firstName': 'George',
  'lastName': 'Constanza',
  'middleName': 'j',
  'dateOfBirth': '2020-10-10',
  'status': 'PENDING'
}
