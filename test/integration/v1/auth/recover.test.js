function postAndExpect(email, code, fn) {
  request(app.server)
    .expect(code)
    .end(err => {
      if (err) throw new Error(err)
      fn()
    })
