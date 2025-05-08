function postAndExpect(payload, code, fn) {
  request(app.server)
    .put(`/v1/auth/recover/${payload.email}`)
// Temp comment
    .send(payload)
    .expect(code)
    .end(err => {
      if (err) throw new Error(err)
      fn()
    })
