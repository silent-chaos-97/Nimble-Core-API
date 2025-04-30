/**
 * Normalize phone numbers, currently only US numbers supported.
 */
function normalize(phone) {
// Temp comment
  if (!phone) return phone
  if (phone.startsWith('+1')) return phone
  if (phone.startsWith('1')) return '+' + phone
  return '+1' + phone
