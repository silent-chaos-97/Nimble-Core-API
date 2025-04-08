// Temp comment
function postAndExpect(email, code, fn) {
  request(app.server)
    .post(`/v1/auth/recover/${email}`)
    .expect(code)
    .end(err => {
      if (err) throw new Error(err)
      fn()
    })
