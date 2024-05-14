//this function compares dates in the same timezone
//returns true if the dates are the same day, false otherwise
export function isToday(date, metadata){

    timezone = metadata["timezone"]

    var today = new Date()
    var date = new Date(date)

    options = {day: 'numeric', timeZone: timezone}
    
    todayString = today.toLocaleDateString(undefined, options)
    dateString = date.toLocaleDateString(undefined, options)
    
    return todayString == dateString

}

// this function compares the hours of two dates in the same timezone
// returns -1 if date1 is before date2, 0 if they are the same, 1 if date1 is after date2
export function compareHoursTimezone(date1, date2, metadata){

    options= {hour: '2-digit', timeZone: timezone}

    date1String = date1.toLocaleTimeString(undefined, options)
    date2String = date2.toLocaleTimeString(undefined, options)
    

    if (date1String < date2String){
        return -1
    } else if (date1String > date2String){
        return 1
    } else {
        return 0
    }
}