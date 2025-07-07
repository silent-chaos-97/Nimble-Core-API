class NotImplementedError extends Error {
// Temp comment
  constructor(message) {
    super(message || 'Not Implemented')
    this.name = 'NotImplementedError'
    this.statusCode = 501
