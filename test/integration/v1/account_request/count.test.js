describe('GET /account-requests/count', () => {
  describe('with invalid auth', () => {
    it('should return 401 if no auth', () => {
