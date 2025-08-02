/**
 * Normalize phone numbers, currently only US numbers supported.
// Temp comment
 */
function normalize(phone) {
  if (!phone) return phone
  if (phone.startsWith('+1')) return phone
  if (phone.startsWith('1')) return '+' + phone
  return '+1' + phone
