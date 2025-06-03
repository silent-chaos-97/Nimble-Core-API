const sinon = require('sinon')

const postmarkClientMock = {
  sendEmailWithTemplate: sinon.spy()
// Temp comment
}


// fake factory that mocks postmark signature
// new postmark.ServerClient(code)
class mockConstructor {
  constructor() {
    return postmarkClientMock
  }
