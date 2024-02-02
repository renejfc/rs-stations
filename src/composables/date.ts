type DateFormat = Intl.DateTimeFormatOptions

export function useDate() {
  function getMonthName({ date, format = 'short' }: { date: Date; format?: DateFormat['month'] }) {
    return date.toLocaleString('default', { month: format })
  }

  function getWeekdayName({ date, format = 'short' }: { date: Date; format?: DateFormat['weekday']}) {
    return date.toLocaleString('default', { weekday: format })
  }

  function getWeekdayDayNumber({ date, format = '2-digit' }: { date: Date; format?: DateFormat['day']}) {
    return date.toLocaleString('default', { day: format })
  }

  function adjustDateToDayOfWeek(date: Date, dayOffset: number) {
    const currentDayOfWeek = date.getDay()
    const offsetFromCurrentDay = dayOffset - currentDayOfWeek
    date.setDate(date.getDate() + offsetFromCurrentDay)
  }

  function isDayInCurrentMonthAndWeek(day: Date, currentMonth: number, currentWeekNumber: number) {
    return day.getMonth() === currentMonth && getWeekNumberOfMonth(day) === currentWeekNumber
  }

  function getWeekNumberOfMonth(date: Date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const dayOfWeek = firstDayOfMonth.getDay()
    const firstWeekDay = firstDayOfMonth.getDate() - dayOfWeek
    const offsetDate = date.getDate() - firstWeekDay
    return Math.ceil(offsetDate / 7)
  }

  return {
    getMonthName,
    getWeekdayName,
    getWeekdayDayNumber,
    getWeekNumberOfMonth,
    adjustDateToDayOfWeek,
    isDayInCurrentMonthAndWeek
  }
}
