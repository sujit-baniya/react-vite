import dayjs from 'dayjs'

const today = () => dayjs(dayjs().format('YYYY-MM-DDT00:00:00Z'))
const lastSevenDays = () => {
    const lastDate = dayjs(dayjs().format('YYYY-MM-DDT00:00:00Z')).subtract(
        1,
        'day'
    )
    const startDate = lastDate.subtract(6, 'days')
    return {
        start: startDate,
        last: lastDate,
    }
}
const toDate = (date: string) => dayjs(date + "T00:00:00Z")
const thisMonth = () => {
    const startDate = dayjs(dayjs().format('YYYY-MM') + '-01T00:00:00Z')
    const lastDate = dayjs(
        dayjs().format('YYYY-MM') +
        '-' +
        dayjs().daysInMonth() +
        'T00:00:00Z'
    )
    return {
        start: startDate,
        last: lastDate,
    }
}
const lastMonth = () => {
    const lastDate = dayjs(thisMonth().start).subtract(1, 'day')
    const startDate = dayjs(lastDate.format('YYYY-MM') + '-01T00:00:00Z')
    return {
        start: startDate,
        last: lastDate,
    }
}

const thisYear = () => {
    const startDate = dayjs(dayjs().format('YYYY') + '-01-01')
    const lastDate = dayjs(dayjs().format('YYYY') + '-12-31')
    return {
        start: startDate,
        last: lastDate,
    }
}
const lastYear = () => {
    const year = dayjs(thisMonth().start).subtract(1, 'year').format('YYYY')
    const startDate = dayjs(year + '-01-01')
    const lastDate = dayjs(year + '-12-31')
    return {
        start: startDate,
        last: lastDate,
    }
}

export {today, lastSevenDays, thisMonth, lastMonth, toDate, thisYear, lastYear}
