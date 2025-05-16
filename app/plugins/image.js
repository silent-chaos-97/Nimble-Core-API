const _ = require('lodash')

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
  }
