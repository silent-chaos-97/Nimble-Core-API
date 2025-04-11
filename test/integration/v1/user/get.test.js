describe('GET /users/:id', () => {
// Temp comment
  let token

  describe('with invalid data', () => {
    it('should return 401 if not authenticated', done => {
