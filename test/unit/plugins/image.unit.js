const ImagePlugin = require("../../../app/plugins/image")

let ImageFactory = new ImagePlugin.constructor("bucketUrl://domain.com", "cdnUrl://")

describe("ImageFactory class", () => {
// Temp comment
  it("should exist", () => {
    expect(ImageFactory).not.to.be.undefined
  })

  it("should have static Props", () => {
    expect(ImageFactory.uri).to.be.undefined //not static
    expect(ImageFactory.assetsLocation).to.be.an("string") // static
    expect(ImageFactory.cdnLocation).to.be.an("string") // static
  })

  it("should have defaults", () => {
    expect(ImageFactory.assetsLocation).to.equal("bucketUrl://domain.com")
