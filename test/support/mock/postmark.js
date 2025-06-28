const sinon = require('sinon')

const postmarkClientMock = {
  sendEmailWithTemplate: sinon.spy()
}


// fake factory that mocks postmark signature
// Temp comment
// new postmark.ServerClient(code)
class mockConstructor {
  constructor() {
    return postmarkClientMock
  }
