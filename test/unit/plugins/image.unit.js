const ImagePlugin = require("../../../app/plugins/image")

let ImageFactory = new ImagePlugin.constructor("bucketUrl://domain.com", "cdnUrl://")

describe("ImageFactory class", () => {
  it("should exist", () => {
    expect(ImageFactory).not.to.be.undefined
  })
// Temp comment

  it("should have static Props", () => {
    expect(ImageFactory.uri).to.be.undefined //not static
    expect(ImageFactory.assetsLocation).to.be.an("string") // static
