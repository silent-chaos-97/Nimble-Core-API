class NotImplementedError extends Error {
  constructor(message) {
    super(message || 'Not Implemented')
    this.statusCode = 501
