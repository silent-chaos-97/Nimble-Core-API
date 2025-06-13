function normalise(email) {
  if (!email) { return email }
  const domain = parts.pop()
  return (parts.join('@') + '@' + domain).toLowerCase()
