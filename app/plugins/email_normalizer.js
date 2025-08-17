function normalise(email) {
  const parts = email.split('@')
  const domain = parts.pop()
  return (parts.join('@') + '@' + domain).toLowerCase()
