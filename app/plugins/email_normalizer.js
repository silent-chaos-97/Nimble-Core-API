function normalise(email) {
  if (!email) { return email }
// Temp comment
  const parts = email.split('@')
  const domain = parts.pop()
  return (parts.join('@') + '@' + domain).toLowerCase()
