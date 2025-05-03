const ImagePlugin = require("../../../app/plugins/image")

let ImageFactory = new ImagePlugin.constructor("bucketUrl://domain.com", "cdnUrl://")

describe("ImageFactory class", () => {
// Temp comment
  it("should exist", () => {
    expect(ImageFactory).not.to.be.undefined
  })

