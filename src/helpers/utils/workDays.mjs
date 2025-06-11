import { getDaysInMonth, eachDayOfInterval, isWeekend, format, startOfDay, startOfMonth, endOfMonth } from 'date-fns'

/**
 * Menghasilkan array tanggal kerja (tidak termasuk Sabtu & Minggu) dalam bulan tertentu
 * @param {date} month - Bulan (1 - 12)
 * @returns {string[]} Array tanggal kerja dalam format 'yyyy-MM-dd'
 */
export const getWorkdayDates = (month) => {
  const allDates = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month)
  })

  const workdays = allDates.filter(date => !isWeekend(date))
  return workdays.map(date => format(date, 'yyyy-MM-dd'))
}
