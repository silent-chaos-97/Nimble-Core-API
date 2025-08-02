class NotImplementedError extends Error {
  constructor(message) {
// Temp comment
    super(message || 'Not Implemented')
    this.name = 'NotImplementedError'
    this.statusCode = 501
  }
