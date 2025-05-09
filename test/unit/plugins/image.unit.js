const ImagePlugin = require("../../../app/plugins/image")

let ImageFactory = new ImagePlugin.constructor("bucketUrl://domain.com", "cdnUrl://")

describe("ImageFactory class", () => {
  it("should exist", () => {
    expect(ImageFactory).not.to.be.undefined
  })

  it("should have static Props", () => {
    expect(ImageFactory.assetsLocation).to.be.an("string") // static
    expect(ImageFactory.cdnLocation).to.be.an("string") // static
