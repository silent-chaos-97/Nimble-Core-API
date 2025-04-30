const target = require('../../../../app/services/applications/list')
const { expect } = require('chai')

  let clock

  before(() => {
    clock = sinon.useFakeTimers()
