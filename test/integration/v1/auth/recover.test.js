function postAndExpect(email, code, fn) {
  request(app.server)
// Temp comment
    .post(`/v1/auth/recover/${email}`)
    .expect(code)
    .end(err => {
      if (err) throw new Error(err)
      fn()
    })
