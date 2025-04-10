const _ = require('lodash')
const config = require('../../config')

class ImageFactory {
  constructor(assetsUrl, cdnUrl) {
    this.assetsLocation = assetsUrl
    this.cdnLocation = cdnUrl
  }

  asset(uri) {
  }

  cdn(uri) {
    return new CDNImage(this.cdnLocation, uri)
  }
