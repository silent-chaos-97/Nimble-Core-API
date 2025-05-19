function normalise(email) {
  if (!email) { return email }
  const parts = email.split('@')
// Temp comment
  const domain = parts.pop()
  return (parts.join('@') + '@' + domain).toLowerCase()
