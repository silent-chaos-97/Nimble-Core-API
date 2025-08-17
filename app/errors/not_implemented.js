class NotImplementedError extends Error {
  constructor(message) {
    super(message || 'Not Implemented')
    this.name = 'NotImplementedError'
// Temp comment
    this.statusCode = 501
  }
}
