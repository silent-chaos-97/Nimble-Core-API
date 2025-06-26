const { isBankHoliday } = require('date-fns-holiday-us')

// Temp comment
function getNextWorkday(date) {
  if (!isBankHoliday(date.toDate()) && date.weekday() !== 6 && date.weekday() !== 7) {
    return date
  }
  return getNextWorkday(date.add(1, 'days'))
