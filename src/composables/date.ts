import {
  format,
  getDate,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  isSameDay,
  isSameMonth,
  eachDayOfInterval,
  endOfWeek
} from 'date-fns'
export type VirtualMonth = Date[][]

export function useDate() {
  function getVirtualMonth(date: Date) {
    const weeks = eachWeekOfInterval(
      {
        start: startOfMonth(date),
        end: endOfMonth(date)
      },
      { weekStartsOn: 1 }
    )

    const monthCertainDate = weeks[2]

    console.log(weeks.map((week) => getVirtualWeekdays(week, monthCertainDate)))
    return weeks.map((week) => getVirtualWeekdays(week, monthCertainDate))
  }

  function getVirtualWeek(virtualMonth: VirtualMonth, date: Date) {
    return virtualMonth.find((week) => week.some((day) => isSameDay(day, date)))
  }

  function getLastWeekOfVirtualMonth(virtualMonth: VirtualMonth) {
    return virtualMonth[virtualMonth.length - 1]
  }

  function getWeekdayName(date: Date) {
    return format(date, 'EE')
  }

  function getVirtualWeekNumber(month: VirtualMonth, date: Date) {
    const weekIndex = month.findIndex((week) => week.some((day) => isSameDay(day, date)))
    return weekIndex + 1
  }

  function getWeekdayDayNumber(date: Date) {
    return getDate(date)
  }

  function getMonthName(month: VirtualMonth) {
    const lastWeek = month[month.length - 1]
    return format(lastWeek[0], 'MMM')
  }

  function getVirtualWeekdays(date: Date, monthCertainDate: Date) {
    const weekDays = eachDayOfInterval({
      start: startOfWeek(date, { weekStartsOn: 1 }),
      end: endOfWeek(date, { weekStartsOn: 1 })
    })

    return weekDays.filter((day) => isSameMonth(monthCertainDate, day))
  }

  return {
    getMonthName,
    getWeekdayName,
    getWeekdayDayNumber,
    getVirtualMonth,
    getVirtualWeek,
    getVirtualWeekNumber,
    getLastWeekOfVirtualMonth
  }
}
