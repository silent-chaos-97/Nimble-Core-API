const AWS = require("../../../../app/plugins/aws")
const sinon = require('sinon')

describe("AWS Facade for s3", () => {
  const sandbox = sinon.createSandbox()
  const blueSquare = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSP/0HwAEIgJaKSK+YQAAAABJRU5ErkJggg=='
  // const fakePdf = Buffer.from([8, 6, 7, 5, 3, 0, 9])

  before(() => {
    sandbox.replace(AWS, 'uuid', () => '00000000-0000-0000-0000-000000000000')
    sandbox.spy(AWS, 'uuid')
    sandbox.spy(AWS.s3, 'putObject')
    sandbox.spy(AWS.s3, 'copyObject')
    sandbox.spy(AWS.s3, 'getSignedUrl')
  })

  afterEach(() => sandbox.reset())
  after(() => sandbox.restore())

  describe('s3Copy()', () => {

    beforeEach(async () => {
      await AWS.s3ImgUpload(blueSquare, 'folder')
    })

    it('should exist', () => {
      expect(AWS.s3CopyToFTP).not.to.be.undefined
      expect(AWS.s3CopyToFTP).to.be.an('function')
    })

    it('should return a promise', async () => {
      let result = AWS.s3CopyToFTP("folder/00000000-0000-0000-0000-000000000000.png", "destination/example.png")
      expect(result).to.be.an('Promise')
    })

    it('should return a path to the destination object', async () => {
      let result = await AWS.s3CopyToFTP("folder/00000000-0000-0000-0000-000000000000.png", "destination/example.png")
      expect(result).to.contain('/uploads/destination/example.png')
    })

    it('should call real s3 method', async () => {
      await AWS.s3CopyToFTP("folder/00000000-0000-0000-0000-000000000000.png", "destination/example.png")
      expect(AWS.s3.copyObject).to.have.been.called
    })
  })

  describe('s3ImgUpload()', () => {
    it('should exist', () => {
      expect(AWS.s3ImgUpload).not.to.be.undefined
      expect(AWS.s3ImgUpload).to.be.an('function')
    })

    it('should return a promise', () => {
      let result = AWS.s3ImgUpload(blueSquare)
      expect(result).to.be.an('Promise')
    })
