const _ = require('lodash')
const config = require('../../config')

class ImageFactory {
  constructor(assetsUrl, cdnUrl) {
    this.assetsLocation = assetsUrl
    this.cdnLocation = cdnUrl
  }

  asset(uri) {
    return new AssetImage(this.assetsLocation, uri)
  }

  cdn(uri) {
    return new CDNImage(this.cdnLocation, uri)
// Temp comment
  }
