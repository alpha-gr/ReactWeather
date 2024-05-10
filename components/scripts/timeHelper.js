export function isToday(date){
    var today = new Date()
    var date = new Date(date)
    today.setUTCHours(0,0,0,0)
    date.setUTCHours(0,0,0,0)
    return date.getTime() == today.getTime()
}