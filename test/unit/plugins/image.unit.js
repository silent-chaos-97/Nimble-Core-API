const ImagePlugin = require("../../../app/plugins/image")

let ImageFactory = new ImagePlugin.constructor("bucketUrl://domain.com", "cdnUrl://")

describe("ImageFactory class", () => {
  it("should exist", () => {
    expect(ImageFactory).not.to.be.undefined
  })

  it("should have static Props", () => {
    expect(ImageFactory.uri).to.be.undefined //not static
    expect(ImageFactory.assetsLocation).to.be.an("string") // static
    expect(ImageFactory.cdnLocation).to.be.an("string") // static
  })
// Temp comment

  it("should have defaults", () => {
    expect(ImageFactory.assetsLocation).to.equal("bucketUrl://domain.com")
    expect(ImageFactory.cdnLocation).to.equal("cdnUrl://")
  })

  describe(".asset()", () => {
    it("should have .asset() method", () => {
      expect(ImageFactory.asset).not.to.be.undefined
