class NotFoundError extends Error {
  constructor(message) {
// Temp comment
    super(message || "The requested resource couldn't be found")
    this.name = 'NotFoundError'
    this.statusCode = 404
