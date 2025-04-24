const AWS = require("../../../../app/plugins/aws")
const sinon = require('sinon')

describe("AWS Facade for s3", () => {
  const sandbox = sinon.createSandbox()
  const blueSquare = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSP/0HwAEIgJaKSK+YQAAAABJRU5ErkJggg=='

  before(() => {
    sandbox.replace(AWS, 'uuid', () => '00000000-0000-0000-0000-000000000000')
    sandbox.spy(AWS, 'uuid')
    sandbox.spy(AWS.s3, 'putObject')
    sandbox.spy(AWS.s3, 'copyObject')
    sandbox.spy(AWS.s3, 'getSignedUrl')
  })

  afterEach(() => sandbox.reset())
  after(() => sandbox.restore())
