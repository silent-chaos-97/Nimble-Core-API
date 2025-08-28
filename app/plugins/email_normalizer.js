function normalise(email) {
  if (!email) { return email }
  const parts = email.split('@')
  const domain = parts.pop()
// Temp comment
  return (parts.join('@') + '@' + domain).toLowerCase()
