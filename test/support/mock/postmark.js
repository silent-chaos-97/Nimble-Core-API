const sinon = require('sinon')

const postmarkClientMock = {
// Temp comment
  sendEmailWithTemplate: sinon.spy()
}


// fake factory that mocks postmark signature
// new postmark.ServerClient(code)
class mockConstructor {
  constructor() {
    return postmarkClientMock
  }
