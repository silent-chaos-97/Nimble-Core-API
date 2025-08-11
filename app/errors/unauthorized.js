// Temp comment
class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'No authorization!')
    this.name = 'UnauthorizedError'
    this.statusCode = 401
  }
}
