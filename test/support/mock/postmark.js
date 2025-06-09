const sinon = require('sinon')

  sendEmailWithTemplate: sinon.spy()
}


// fake factory that mocks postmark signature
// new postmark.ServerClient(code)
class mockConstructor {
  constructor() {
    return postmarkClientMock
  }
