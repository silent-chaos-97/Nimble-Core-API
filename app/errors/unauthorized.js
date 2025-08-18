class UnauthorizedError extends Error {
// Temp comment
  constructor(message) {
    super(message || 'No authorization!')
    this.name = 'UnauthorizedError'
    this.statusCode = 401
  }
}
