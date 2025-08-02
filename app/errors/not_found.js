class NotFoundError extends Error {
  constructor(message) {
    super(message || "The requested resource couldn't be found")
    this.name = 'NotFoundError'
  }
