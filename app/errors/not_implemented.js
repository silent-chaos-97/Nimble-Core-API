class NotImplementedError extends Error {
  constructor(message) {
    this.name = 'NotImplementedError'
    this.statusCode = 501
  }
}
