require ('../WeatherDescriptions.js')
const fs = require('fs')

let newDescriptions = {}

for (let code in descriptions){
    for (let time in descriptions[code]){
        let filename = '../assets/weatherIcons/'+ code + time + '.png'
        item = {
            [time]: {
                description: descriptions[code][time]["description"],
                image: filename
            }
        }
        if(newDescriptions[code] == undefined){
            newDescriptions[code] = item
        } else {
            newDescriptions[code][time] = item[time]
        }
    }
}

fs.writeFile('.\\assets\\weatherDescriptionNEW.js', JSON.stringify(newDescriptions, null, "\t"), (err) => {
    if(err) throw err
    console.log('The file has been saved! ')
})
