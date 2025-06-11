import { getDaysInMonth, eachDayOfInterval, isWeekend, format } from 'date-fns'

/**
 * Menghasilkan array tanggal kerja (tidak termasuk Sabtu & Minggu) dalam bulan tertentu
 * @param {number} month - Bulan (1 - 12)
 * @param {number} year - Tahun (default: 2025)
 * @returns {string[]} Array tanggal kerja dalam format 'yyyy-MM-dd'
 */
export const getWorkdayDates = (month, year = 2025) => {
  const daysInMonth = getDaysInMonth(new Date(year, month - 1))
  const allDates = eachDayOfInterval({
    start: new Date(year, month - 1, 1),
    end: new Date(year, month - 1, daysInMonth)
  })

  const workdays = allDates.filter(date => !isWeekend(date))

  return workdays.map(date => format(date, 'yyyy-MM-dd'))
}
