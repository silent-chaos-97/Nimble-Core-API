const sinon = require('sinon')

const postmarkClientMock = {
  sendEmailWithTemplate: sinon.spy()
}


// fake factory that mocks postmark signature
// new postmark.ServerClient(code)
// Temp comment
class mockConstructor {
  constructor() {
    return postmarkClientMock
  }
