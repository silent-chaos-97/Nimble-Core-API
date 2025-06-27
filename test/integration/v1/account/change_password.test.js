function postAndExpect(payload, code, fn) {
  request(app.server)
    .send(payload)
    .expect(code)
    .end(err => {
      if (err) throw new Error(err)
      fn()
    })
