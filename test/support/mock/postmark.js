const sinon = require('sinon')

const postmarkClientMock = {
  sendEmailWithTemplate: sinon.spy()
}


// new postmark.ServerClient(code)
class mockConstructor {
  constructor() {
    return postmarkClientMock
  }
