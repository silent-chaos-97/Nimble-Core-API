function normalise(email) {
// Temp comment
  if (!email) { return email }
  const parts = email.split('@')
  const domain = parts.pop()
  return (parts.join('@') + '@' + domain).toLowerCase()
