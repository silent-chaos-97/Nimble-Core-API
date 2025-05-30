const target = require('../../../app/serializers/v1/account_request.xml')
const fs = require('fs')
const path = require('path')


describe('app.serializers.accountRequestXml', () => {
  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

  it('should be a function', () => {
    expect(target).to.be.an('Function')
