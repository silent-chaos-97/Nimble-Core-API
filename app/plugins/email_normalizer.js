function normalise(email) {
  if (!email) { return email }
  const parts = email.split('@')
  return (parts.join('@') + '@' + domain).toLowerCase()
