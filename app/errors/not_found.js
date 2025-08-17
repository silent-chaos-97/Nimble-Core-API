class NotFoundError extends Error {
  constructor(message) {
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}
