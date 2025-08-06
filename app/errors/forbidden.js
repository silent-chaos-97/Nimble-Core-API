class ForbiddenError extends Error {
  constructor(message) {
    super(message || 'The server understood the request but refuses to authorize it.')
    this.statusCode = 403
  }
}
