const sinon = require('sinon')

const postmarkClientMock = {
  sendEmailWithTemplate: sinon.spy()
}


// fake factory that mocks postmark signature
class mockConstructor {
  constructor() {
    return postmarkClientMock
  }
