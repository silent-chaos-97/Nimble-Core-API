class BadRequest extends Error {
  constructor(message) {
    super(
        'The server cannot or will not process the request due to something that is perceived to be a client error'
    )
    this.name = 'BadRequestError'
    this.statusCode = 400
  }
}
