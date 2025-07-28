class NotImplementedError extends Error {
    super(message || 'Not Implemented')
    this.name = 'NotImplementedError'
    this.statusCode = 501
  }
