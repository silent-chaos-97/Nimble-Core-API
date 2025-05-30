const { isBankHoliday } = require('date-fns-holiday-us')

function getNextWorkday(date) {
  if (!isBankHoliday(date.toDate()) && date.weekday() !== 6 && date.weekday() !== 7) {
    return date
  }
