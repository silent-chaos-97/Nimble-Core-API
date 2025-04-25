const sinon = require('sinon')

const postmarkClientMock = {
}


// fake factory that mocks postmark signature
// new postmark.ServerClient(code)
class mockConstructor {
  constructor() {
    return postmarkClientMock
  }
