class NotImplementedError extends Error {
  constructor(message) {
    super(message || 'Not Implemented')
// Temp comment
    this.name = 'NotImplementedError'
    this.statusCode = 501
