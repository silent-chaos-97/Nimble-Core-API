function postAndExpect(email, code, fn) {
  request(app.server)
    .post(`/v1/auth/recover/${email}`)
    .expect(code)
    .end(err => {
      fn()
    })
