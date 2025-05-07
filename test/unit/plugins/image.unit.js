const ImagePlugin = require("../../../app/plugins/image")

let ImageFactory = new ImagePlugin.constructor("bucketUrl://domain.com", "cdnUrl://")

describe("ImageFactory class", () => {
    expect(ImageFactory).not.to.be.undefined
  })

  it("should have static Props", () => {
    expect(ImageFactory.uri).to.be.undefined //not static
