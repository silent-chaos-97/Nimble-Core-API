  constructor(message) {
    super(message || 'No authorization token was found!')
    this.name = 'UnauthorizedTokenError'
