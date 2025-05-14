function postAndExpect(payload, code, fn) {
  request(app.server)
    .put(`/v1/auth/recover/${payload.email}`)
    .expect(code)
    .end(err => {
      if (err) throw new Error(err)
      fn()
    })
